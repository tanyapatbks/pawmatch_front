import { NextRequest, NextResponse } from "next/server";
import { authClient } from "@/libs/userService/grpc/auth-client";

export async function GET(request: NextRequest) {
  try {
    // Get userId from query parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Call gRPC service to get user profile
    const userProfile = await authClient.getProfile(userId);

    // Return only the user profile
    return NextResponse.json({
      profile: userProfile
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}