/**
 * GET /api/captcha/generate
 *
 * Generates a random CAPTCHA code and stores it in a session.
 * Returns the code ID to be used for validation.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Generate random alphanumeric code with mixed case
function generateCaptchaCode(length: number = 6): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

export async function GET() {
    try {
        const code = generateCaptchaCode();
        const captchaId = crypto.randomUUID();
        const cookieStore = await cookies();

        // Store captcha code in httpOnly cookie with 5 minute expiry
        // In production, consider using Redis or database for better scalability
        cookieStore.set(`captcha_${captchaId}`, code, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 300, // 5 minutes
            path: "/",
        });

        return NextResponse.json({
            captchaId,
            code, // In production, you might want to send this as an image instead
        });
    } catch (error) {
        console.error("CAPTCHA generation error:", error);
        return NextResponse.json({ error: "Failed to generate CAPTCHA" }, { status: 500 });
    }
}
