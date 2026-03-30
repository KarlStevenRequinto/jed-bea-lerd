import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getAuthUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user: error ? null : user };
}

export async function POST(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: targetUserId } = await params;

    if (!uuidRegex.test(targetUserId)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const { user } = await getAuthUser();
    if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (user.id === targetUserId) {
        return NextResponse.json({ error: "Cannot follow yourself" }, { status: 422 });
    }

    const admin = createAdminClient();
    const { error } = await admin
        .from("user_follows")
        .insert({ follower_id: user.id, following_id: targetUserId });

    if (error) {
        // 23505 = unique violation — already following, treat as success
        if (error.code === "23505") {
            return NextResponse.json({ success: true });
        }
        console.error("[follow] Insert error:", error);
        return NextResponse.json({ error: "Failed to follow user" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: targetUserId } = await params;

    if (!uuidRegex.test(targetUserId)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const { user } = await getAuthUser();
    if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const admin = createAdminClient();
    const { error } = await admin
        .from("user_follows")
        .delete()
        .eq("follower_id", user.id)
        .eq("following_id", targetUserId);

    if (error) {
        console.error("[unfollow] Delete error:", error);
        return NextResponse.json({ error: "Failed to unfollow user" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
