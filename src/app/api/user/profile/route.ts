// src/app/api/user/profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { authClient } from '@/app/libs/grpc/auth-client';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session in API route:", session);

    if (!session?.userId) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const userId = session.userId;
    const profile = await authClient.getProfile(userId);
    console.log("Profile from gRPC:", profile);

    return new NextResponse(
      JSON.stringify(profile),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch profile' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}