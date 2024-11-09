import type { AuthUser, ExtendedSession, ExtendedToken } from "./auth";

declare module "next-auth" {
  interface User extends AuthUser {}
  interface Session extends ExtendedSession {
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends ExtendedToken {}
}