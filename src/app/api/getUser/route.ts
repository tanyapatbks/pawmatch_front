import { NextRequest, NextResponse } from "next/server";
import { authClient } from "@/libs/userService/grpc/auth-client";

export async function GET(request: NextRequest) {
  try {
    // Get userId from query parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      console.error(`[${new Date()}] getUser: User ID is required`);
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    console.log(`[${new Date()}] getUser: userId = ${userId}`);

    // Call gRPC service to get user profile
    const userProfile = await authClient.getProfile(userId);

    // Return only the user profile
    return NextResponse.json({
      profile: userProfile
    });

  } catch (error) {
    console.error("Error fetching user:", String(error));
    if (error.code == 5) return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}