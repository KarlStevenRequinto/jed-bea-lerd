import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: targetUserId } = await params;

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(targetUserId)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Current user is optional — needed only for isFollowing / isOwnProfile
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    const admin = createAdminClient();

    const [profileResult, followersResult, isFollowingResult] = await Promise.all([
        admin
            .from("profiles")
            .select("id, first_name, last_name, bio, verified, profile_photo_url, city, province")
            .eq("id", targetUserId)
            .single(),

        admin
            .from("user_follows")
            .select("*", { count: "exact", head: true })
            .eq("following_id", targetUserId),

        currentUser
            ? admin
                  .from("user_follows")
                  .select("id")
                  .eq("follower_id", currentUser.id)
                  .eq("following_id", targetUserId)
                  .maybeSingle()
            : Promise.resolve({ data: null }),
    ]);

    if (!profileResult.data) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const profile = profileResult.data;
    const name = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "Unknown User";
    const initials = `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase() || "U";
    const location = [profile.city, profile.province].filter(Boolean).join(", ") || null;

    return NextResponse.json({
        id: targetUserId,
        name,
        initials,
        photoUrl: profile.profile_photo_url ?? null,
        bio: profile.bio ?? null,
        verified: profile.verified ?? false,
        location,
        followersCount: followersResult.count ?? 0,
        isFollowing: !!isFollowingResult.data,
        isOwnProfile: currentUser?.id === targetUserId,
    });
}
