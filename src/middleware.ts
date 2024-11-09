// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const publicPaths = [
        "/",
        "/pet/:pid*",
        "/api/auth/register",
        "/api/image/compress",
        "/auth/register",
        "/pets/:pid*/reviews"
      ];
      const isPublicPath = publicPaths.some((path) =>
        req.nextUrl.pathname.startsWith(path)
      );
      if (isPublicPath) {
        return true;
      }
      return !!token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/api/auth/register",
    "/api/image/compress",
    "/auth/register",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
