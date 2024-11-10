import { NextResponse } from "next/server";
import userRegister from "@/libs/userService/userRegister";

export async function POST(request: Request) {
  try {
    console.log('Processing registration request');
    const formData = await request.formData();

    // Extract and validate fields
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    const surname = formData.get("surname")?.toString();
    const displayName = formData.get("displayName")?.toString();
    const telephoneNumber = formData.get("telephoneNumber")?.toString();
    const lineId = formData.get("lineId")?.toString();
    const profileImage = formData.get("profileImage") as File | null;

    // Log received data (excluding sensitive info)
    console.log('Received registration data:', {
      email,
      name,
      surname,
      displayName,
      telephoneNumber,
      lineId,
      hasProfileImage: !!profileImage
    });

    // Validate required fields
    const requiredFields = {
      email,
      password,
      name,
      surname,
      displayName,
      telephoneNumber
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([field]) => field);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Process profile image
    let processedImageBuffer: Buffer | undefined;
    if (profileImage) {
      try {
        const arrayBuffer = await profileImage.arrayBuffer();
        processedImageBuffer = Buffer.from(arrayBuffer);
        console.log('Profile image processed:', {
          size: processedImageBuffer.length
        });
      } catch (error) {
        console.error('Error processing profile image:', error);
        return NextResponse.json(
          { error: 'Failed to process profile image' },
          { status: 400 }
        );
      }
    }

    // Call registration service
    const result = await userRegister({
      email: email!,
      password: password!,
      name: name!,
      surname: surname!,
      displayName: displayName!,
      telephoneNumber: telephoneNumber!,
      lineId: lineId || "",
      profileImage: processedImageBuffer,
    });

    console.log('Registration successful:', {
      userId: result.userId
    });

    return NextResponse.json({
      success: true,
      userId: result.userId,
      message: "Registration successful"
    }, {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Registration failed';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}