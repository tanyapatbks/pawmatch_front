import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authClient } from "@/libs/userService/grpc/auth-client";
import type { AuthUser, AuthResult } from "@/types/auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isRegistering: { type: "boolean", optional: true },
        name: { type: "text", optional: true },
        surname: { type: "text", optional: true },
        displayName: { type: "text", optional: true },
        telephoneNumber: { type: "text", optional: true },
        lineId: { type: "text", optional: true },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          let authResult: AuthResult;

          if (credentials.isRegistering === "true") {
            if (
              !credentials.name ||
              !credentials.surname ||
              !credentials.displayName
            ) {
              return null;
            }

            // Register and then login
            await authClient.register({
              email: credentials.email,
              password: credentials.password,
              name: credentials.name,
              surname: credentials.surname,
              displayName: credentials.displayName,
              telephoneNumber: credentials.telephoneNumber || "",
              lineId: credentials.lineId || "",
            });

            authResult = await authClient.login(
              credentials.email,
              credentials.password
            );
          } else {
            authResult = await authClient.login(
              credentials.email,
              credentials.password
            );
          }

          if (!authResult?.userId) return null;

          const profile = await authClient.getProfile(authResult.userId);

          const user: AuthUser = {
            id: authResult.userId,
            email: credentials.email,
            accessToken: authResult.token,
            name: profile.name,
            surname: profile.surname,
            displayName: profile.displayName,
            telephoneNumber: profile.telephoneNumber,
            lineId: profile.lineId,
            profileImage: profile.profileImage,
          };

          return user;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // console.log("User in JWT callback:", user);
        token.accessToken = user.accessToken;
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name;
        token.surname = user.surname;
        token.displayName = user.displayName;
        token.telephoneNumber = user.telephoneNumber;
        token.lineId = user.lineId;
        token.profileImage = user.profileImage;
      }
      // console.log("token in JWT callback:", token);
      return token;
    },
    async session({ session, token }) {
      // console.log("Token in session callback:", token); // Debugging line
      session.accessToken = token.accessToken;
      session.user = {
        id: token.userId,
        email: token.email || "",
        name: token.name || "",
        accessToken: token.accessToken,
        surname: token.surname || "",
        displayName: token.displayName || "",
        telephoneNumber: token.telephoneNumber || "",
        lineId: token.lineId || "",
        profileImage: token.profileImage,
      };
      // console.log("Session after session callback:", session); // Debugging line
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
