import { NextRequest, NextResponse } from 'next/server'
import jwtDecode from 'jwt-decode'
import { IJwtDecode } from './types/api'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname.startsWith("/auth")) {
        const token = request.cookies.get('token')?.value
        if (token !== undefined) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    try {
        const token = request.cookies.get('token')?.value
        const refresh = request.cookies.get('refresh_token')?.value

        if (token !== undefined) {
            const decode: IJwtDecode = await jwtDecode(token)

            const now = Math.floor(Date.now() / 1000);
            if (decode.exp - now <= 0) {
                // todo refresh
            }

            return NextResponse.next()
        } else if (refresh === undefined) {
            throw new Error('No refresh token')
        }

    } catch (e) {
        console.log(e)
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/orders/:path*',
        '/products/:path*',
        '/offers/:path*',
        '/collections/:path*',
        '/users/:path*',
        '/shipping/:path*',
        '/settings/:path*',
        '/auth/:path*',
    ]
}