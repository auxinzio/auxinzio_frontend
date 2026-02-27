import { NextResponse } from 'next/server'
import { API_URL } from "@/lib/constants";

export async function POST(request) {
  try {
    const body = await request.json();

    // Call external backend
    // Assuming API_URL is valid, otherwise use logic to set base URL
    const apiUrl = API_URL || process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    // Look for token in common places
    const token = data.data?.token;

    if (res.ok && token) {
      const response = NextResponse.json({
        success: true,
        message: 'Logged in successfully',
        status: 200,
        data: data.data || data.user
      });

      // Set token in cookie
      response.cookies.set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        path: '/',
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
      });

      // Set user info in cookie (so we can retrieve it without calling backend)
      // Extract user info, excluding the token itself if it's inside
      const userInfo = { ...data.data };
      delete userInfo.token; // Ensure we don't duplicate token storage

      response.cookies.set({
        name: 'user_info',
        value: JSON.stringify(userInfo),
        httpOnly: true,
        path: '/',
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    // If not successful or token missing, return error status
    // Use 401 if original status was 200 but token missing
    const errorStatus = (res.ok && !token) ? 401 : res.status;

    return NextResponse.json(
      {
        success: false,
        message: data.message || 'Invalid credentials or Token missing',
        status: errorStatus,
        data: data
      },
      { status: errorStatus }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
