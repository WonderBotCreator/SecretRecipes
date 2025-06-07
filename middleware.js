import { getToken } from "@node_modules/next-auth/jwt";
import { NextResponse } from "@node_modules/next/server";

export async function middleware(request){
    const user = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: true
    })

    console.log('get sesseion '+user)

    const {pathname} = request.nextUrl

    if(pathname.startsWith('/protected') && (!user)){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    

    return NextResponse.next()
}

export const config = {
  matcher: ['/protected/:path*', '/api/:path*'], // Apply middleware only to protected routes
};