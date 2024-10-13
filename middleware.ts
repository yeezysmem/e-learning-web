// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const pathname = req.nextUrl.pathname;

//   // Define protected paths and roles
//   if (pathname.startsWith('/teacher')) {
//     // Check if the user has a valid token and role
//     if (!token || token.role !== 'teacher') {
//       return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }
//   }

//   return NextResponse.next();
}

// export const config = {
//   matcher: ['/teacher/:path*'],
// };
