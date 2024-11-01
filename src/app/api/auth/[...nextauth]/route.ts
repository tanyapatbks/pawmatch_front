import NextAuth, { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "../../../libs/userLogIn";
import getUserProfile from "../../../libs/getUserProfile";

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          try {
            if (!credentials?.email || !credentials?.password) {
              throw new Error("Please enter your email and password");
            }
  
            const result = await userLogin(credentials.email, credentials.password);
            if (!result) {
              throw new Error("Invalid credentials");
            }
            const profile = await getUserProfile(result.userId);
            
            return {
              id: result.userId,
              email: credentials.email,
              accessToken: result.token,
              userId: result.userId,
              name: profile.name,
              surname: profile.surname,
              displayName: profile.displayName,
              telephoneNumber: profile.telephoneNumber,
              lineId: profile.lineId,
              profileImage: profile.profileImage,
            };
          } catch (error) {
            console.error('Login error:', error);
            throw new Error(error instanceof Error ? error.message : "Login failed");
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.accessToken = user.accessToken;
          token.userId = user.userId;
          token.name = user.name;
          token.surname = user.surname;
          token.displayName = user.displayName;
          token.telephoneNumber = user.telephoneNumber;
          token.lineId = user.lineId;
          token.profileImage = user.profileImage;
        }
        return token;
      },
      async session({ session, token }) {
        return {
          ...session,
          accessToken: token.accessToken,
          userId: token.userId,
          user: {
            ...(session.user || {}),
            userId: token.userId,
            email: session.user?.email,
            name: token.name,
            surname: token.surname,
            displayName: token.displayName,
            telephoneNumber: token.telephoneNumber,
            lineId: token.lineId,
            profileImage: token.profileImage,
          },
        };
      },
    },

  pages: {
    signIn: '/auth/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };