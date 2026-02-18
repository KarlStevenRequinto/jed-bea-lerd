/**
 * POST /api/auth/register/address-info
 *
 * Persists step-3 address information for the authenticated user.
 */

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { streetAddress, city, province, zipCode, country } = body;

        if (!streetAddress || !city || !province || !zipCode || !country) {
            return NextResponse.json({ error: "Missing required address fields" }, { status: 400 });
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
        const { error: profileError } = await adminClient
            .from("profiles")
            .upsert(
                {
                    id: user.id,
                    email: user.email,
                    street_address: streetAddress,
                    city,
                    province,
                    zip_code: zipCode,
                    country,
                },
                { onConflict: "id" }
            );

        if (profileError) {
            return NextResponse.json(
                {
                    error: "Failed to save address information",
                    details: profileError.message,
                    code: profileError.code,
                    hint: profileError.hint,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: "Address information saved successfully" });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
