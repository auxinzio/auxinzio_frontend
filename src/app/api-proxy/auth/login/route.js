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
    const token = data.data?.token || data.token || (data.user && data.user.token);
    const isMfaEnabled =
      data.data?.is_mfa_enabled === true ||
      data.data?.is_mfa_enabled === 1 ||
      data.data?.mfa_required === true ||
      data.data?.mfa_required === 1;

    if (res.ok) {
      const responseData = {
        success: true,
        message: isMfaEnabled ? 'OTP sent successfully' : 'Logged in successfully',
        status: 200,
        data: data.data || data.user,
        is_mfa_enabled: isMfaEnabled
      };

      const response = NextResponse.json(responseData);

      if (!isMfaEnabled && token) {
        // Set token in cookie for direct login
        response.cookies.set({
          name: 'auth_token',
          value: token,
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
          secure: request.nextUrl.protocol === 'https:',
          maxAge: 60 * 60 * 24, // 1 day
        });

        // Set user info in cookie
        const userInfo = { ...data.data };
        delete userInfo.token;

        response.cookies.set({
          name: 'user_info',
          value: JSON.stringify(userInfo),
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
          secure: request.nextUrl.protocol === 'https:',
          maxAge: 60 * 60 * 24, // 1 day
        });
      }

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
