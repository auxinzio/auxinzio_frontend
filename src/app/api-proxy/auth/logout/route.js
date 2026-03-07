import { NextResponse } from 'next/server';
import { API_URL } from "@/lib/constants";

export async function POST(req) {
  const apiUrl = API_URL || process.env.NEXT_PUBLIC_API_URL;
  const token = req.cookies.get('auth_token')?.value;

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const res = await fetch(`${apiUrl}/api/auth/logout`, {
      method: 'POST',
      headers: headers,
    });
  } catch (error) {
    console.error('[Logout Proxy Error]:', error);
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

  // Clear both auth cookies
  response.cookies.set({
    name: 'auth_token',
    value: '',
    path: '/',
    expires: new Date(0),
  });

  response.cookies.set({
    name: 'user_info',
    value: '',
    path: '/',
    expires: new Date(0),
  });

  return response;
}
