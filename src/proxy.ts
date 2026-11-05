import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        return NextResponse.redirect(
            new URL("/signin?error=auth_required", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/product/:path*", "/profile", "/profile/update-profile"],
};