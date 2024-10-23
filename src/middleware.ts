// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ดึง token จาก cookies
  const token = request.cookies.get('token');
  
  // ถ้าเป็น path ที่ต้องการ protect และไม่มี token
  if (request.nextUrl.pathname.startsWith('/profile') && !token) {
    // redirect ไปหน้า login พร้อมส่ง return_url
    return NextResponse.redirect(
      new URL(`/auth/login?return_url=${encodeURIComponent(request.nextUrl.pathname)}`, request.url)
    );
  }

  return NextResponse.next();
}

// กำหนด path ที่จะใช้ middleware
export const config = {
  matcher: [
    '/profile/:path*',
    '/api/profile/:path*'
  ]
};