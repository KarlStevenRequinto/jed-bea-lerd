/**
 * POST /api/auth/forgot-password
 *
 * Sends a password-reset email for the provided address.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const supabase = await createClient();
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
        const callbackUrl = `${siteUrl}/auth/callback?next=${encodeURIComponent("/reset-password")}`;

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: callbackUrl,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "If an account exists for this email, a password reset link has been sent.",
        });
    } catch (error) {
        console.error("Forgot-password error:", error);
        return NextResponse.json({ error: "Failed to send reset link" }, { status: 500 });
    }
}
