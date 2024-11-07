import { DefaultSession, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
    userId?: string;
    user: {
      userId?: string;
      email?: string;
      name?: string;
      surname?: string;
      displayName?: string;
      telephoneNumber?: string;
      lineId?: string;
      profileImage?: string;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    email: string;
    accessToken: string;
    userId: string;
    name?: string;
    surname?: string;
    displayName?: string;
    telephoneNumber?: string;
    lineId?: string;
    profileImage?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    userId?: string;
    name?: string;
    surname?: string;
    displayName?: string;
    telephoneNumber?: string;
    lineId?: string;
    profileImage?: string;
  }
}