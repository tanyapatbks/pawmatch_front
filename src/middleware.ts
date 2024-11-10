import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';

// รายการ paths ที่ไม่ต้อง authenticate
const publicPaths = [
  '/',               // หน้าแรก
  '/auth/login',     // หน้า login
  '/auth/register',  // หน้าลงทะเบียน
  '/api/register',   // API สำหรับการลงทะเบียน
  '/api/auth',       // NextAuth routes
  '/_next',          // Next.js static files
  '/favicon.ico',    // Favicon
  '/images',         // รูปภาพ public
  '/pets/:pid*/reviews',  // review ()
];

// ฟังก์ชันตรวจสอบว่าเป็น public path หรือไม่
function isPublicPath(pathname: string): boolean {
  return publicPaths.some(path => pathname.startsWith(path));
}

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (isPublicPath(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    // สำหรับ paths ที่ต้องการ auth
    const protectedPaths = [
      '/profile',  // หน้าโปรไฟล์ส่วนตัว
      '/api/user', // API ที่เกี่ยวกับข้อมูลผู้ใช้
    ];

    // ตรวจสอบว่าเป็น protected path หรือไม่
    const isProtectedPath = protectedPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );

    // ถ้าเป็น protected path และไม่มี token ให้ redirect ไปหน้า login
    if (isProtectedPath && !request.nextauth.token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // ถ้าเป็น public path ให้ผ่านได้เลย
        if (isPublicPath(req.nextUrl.pathname)) {
          return true;
        }

        // สำหรับ paths ที่ต้องการ auth จะต้องมี token
        return !!token;
      },
    },
  }
);

// กำหนด paths ที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: [
    // Protect specific paths
    '/profile/:path*',
    '/api/user/:path*',
    
    // Exclude public paths
    '/((?!auth|_next/static|_next/image|favicon.ico|images).*)',
  ],
};