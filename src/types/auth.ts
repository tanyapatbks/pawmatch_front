import type { DefaultSession, DefaultUser } from "next-auth";

// Base user without auth-specific fields
export interface BaseUser {
  id: string;
  email: string;
  name: string;
  surname: string;
  displayName: string;
  telephoneNumber: string;
  lineId: string;
  profileImage?: string;
}

// Auth-specific types
export interface AuthResult {
  userId: string;
  token: string;
}

// Extended user with auth token
export interface AuthUser extends BaseUser {
  accessToken: string;
}

// Sessions
export interface ExtendedSession extends DefaultSession {
  user: AuthUser;
  accessToken: string;
}

// JWT contents
export interface ExtendedToken {
  accessToken: string;
  userId: string;
  email: string;
  name: string;
  surname: string;
  displayName: string;
  telephoneNumber: string;
  lineId: string;
  profileImage?: string;
}