import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatListings } from "@/lib/utils/formatters";
import { Listing } from "@/lib/types/listing";

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

    const { data, error } = await admin
        .from("listings")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(4);

    if (error) {
        return NextResponse.json({ error: "Failed to fetch listings." }, { status: 500 });
    }

    const listings = formatListings((data ?? []) as Listing[]);

    return NextResponse.json({ listings });
}
