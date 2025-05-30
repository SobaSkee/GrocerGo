// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/sign-up", request.url));
    }

    const pathname = request.nextUrl.pathname;
    
    // Check if the path matches /order/[store] but not /order/[store]/storefront
    if (pathname.match(/^\/order\/[^/]+$/) && !pathname.endsWith('/storefront')) {
        const storeSlug = pathname.split('/').pop();
        return NextResponse.redirect(new URL(`/order/${storeSlug}/storefront`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/order/:path*']
};