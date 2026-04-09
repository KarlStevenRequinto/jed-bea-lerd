import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
    const supabase = await createClient();
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const admin = createAdminClient();

    const [listingsResult, networkResult] = await Promise.all([
        admin
            .from("listings")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
            .eq("status", "active"),

        admin
            .from("user_follows")
            .select("*", { count: "exact", head: true })
            .eq("follower_id", user.id),
    ]);

    return NextResponse.json({
        listingsCount: listingsResult.count ?? 0,
        networkCount: networkResult.count ?? 0,
    });
}
