// src/app/api/auth/login/route.ts (ไม่ใช่ในโฟลเดอร์ (user Service))
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// เพิ่ม GET method
export async function GET() {
  return NextResponse.json(
    { message: "Please use POST method for login" },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // ตรวจสอบ credentials (ในที่นี้เป็นตัวอย่าง)
    if (email === "test@example.com" && password === "password123") {
      // สร้าง token (ในที่นี้เป็นตัวอย่างอย่างง่าย)
      const token = "example-token";

      // สร้าง response with cookie
      const response = NextResponse.json(
        { success: true, token },
        { status: 200 }
      );

      // Set HTTP-only cookie
      response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}