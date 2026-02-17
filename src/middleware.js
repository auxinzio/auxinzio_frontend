import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Define routes
  const loginUrl = new URL('/admin/login', request.url)
  const dashboardUrl = new URL('/admin/dashboard', request.url)
  const isLoginPage = pathname === '/admin/login'
  const isPublicFile = pathname.includes('.') // skip static files like images, css, js

  // Only run on /admin routes
  if (!pathname.startsWith('/admin') || isPublicFile) {
    return NextResponse.next()
  }

  const token = request.cookies.get('auth_token')?.value

  // Redirect logic
  if (isLoginPage) {
    if (token) {
      return NextResponse.redirect(dashboardUrl)
    }
    return NextResponse.next()
  }

  if (!token) {
    // If no token is present, redirect to login
    return NextResponse.redirect(loginUrl)
  }

  // Allow access if token exists
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
