import { NextResponse } from 'next/server';

export async function POST() {
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
