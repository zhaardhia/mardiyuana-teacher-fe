import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'
// This function can be marked `async` if using `await` inside

interface JwtPayload {
  username: string;
  iat: number;
  exp: number;
}

export const protectedRoutes = ["/", "/student", "/teacher", "/course"];
export const authRoutes = ["/sign-in"];
export const publicRoutes = ["/about", "/"];

export default async function middleware(request: NextRequest) {
  console.log("wkwkwk", {route: request.nextUrl.pathname})
  const currentUser = request.cookies.get("teacherToken")?.value;
  console.log({currentUser})

  if (currentUser) {
    const decoded: JwtPayload = jwtDecode(currentUser)
    console.log({decoded, exp: Date.now() > decoded.exp, date: Date.now()})
    if (
      // protectedRoutes.includes(request.nextUrl.pathname) &&
      (Date.now() > decoded.exp * 1000)
    ) {
      request.cookies.delete("teacherToken");
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      response.cookies.delete("teacherToken");

      return response;
    }

    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
  // matcher: ['/', '/course', '/reminder', '/score'],
  matcher: [
    '/',
    '/class',
    '/class/note/:classId*',
    '/course',
    '/course/detail/:enrollmentId*',
    '/profile',
    '/profile/:profileId',
    '/reminder/:reminderId',
    '/score',
    '/scoring/:scoreCourseId'
  ],
}
