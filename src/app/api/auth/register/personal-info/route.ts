/**
 * POST /api/auth/register/personal-info
 *
 * Persists step-2 personal information for the authenticated user.
 * Uses upsert so this can create or update the profile row safely.
 */

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

const isValidDateOfBirth = (dateText: string): boolean => {
    const digits = dateText.replace(/\D/g, "");
    if (digits.length !== 8) return false;

    const month = Number(digits.slice(0, 2));
    const day = Number(digits.slice(2, 4));
    const year = Number(digits.slice(4, 8));

    if (!month || !day || !year || month > 12 || day > 31 || year < 1900) return false;

    const date = new Date(year, month - 1, day);
    if (Number.isNaN(date.getTime())) return false;

    const isExactDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    const isNotFuture = date <= new Date();

    return isExactDate && isNotFuture;
};

const isValidPhilippinesNumber = (phoneText: string): boolean => {
    const digits = phoneText.replace(/\D/g, "");
    return digits.length === 10 && digits.startsWith("9");
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, dateOfBirth, phoneNumber, profilePhotoUrl } = body;

        if (!firstName || !lastName || !dateOfBirth || !phoneNumber) {
            return NextResponse.json({ error: "Missing required personal information fields" }, { status: 400 });
        }

        if (!isValidDateOfBirth(dateOfBirth)) {
            return NextResponse.json({ error: "Invalid date of birth format" }, { status: 400 });
        }

        if (!isValidPhilippinesNumber(phoneNumber)) {
            return NextResponse.json({ error: "Invalid Philippines phone number" }, { status: 400 });
        }

        const supabase = await createClient();
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({ error: "Not authenticated. Please verify your email first." }, { status: 401 });
        }

        const adminClient = createAdminClient();
        const { error: profileError } = await adminClient.from("profiles").upsert(
            {
                id: user.id,
                email: user.email,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                phone_number: phoneNumber,
                profile_photo_url: profilePhotoUrl ?? null,
            },
            { onConflict: "id" }
        );

        if (profileError) {
            return NextResponse.json(
                {
                    error: "Failed to save personal information",
                    details: profileError.message,
                    code: profileError.code,
                    hint: profileError.hint,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: "Personal information saved successfully" });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
