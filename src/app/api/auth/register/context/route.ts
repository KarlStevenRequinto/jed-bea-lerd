import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const email = cookieStore.get("registration_email")?.value ?? "";

    if (!email) {
        return NextResponse.json({ error: "Registration context not found" }, { status: 404 });
    }

    return NextResponse.json({ email });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete("registration_email");

    return NextResponse.json({ success: true });
}
