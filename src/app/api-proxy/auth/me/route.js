import { NextResponse } from 'next/server';


export async function POST(request) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  const userInfoCookie = request.cookies.get('user_info')?.value;

  if (!userInfoCookie) {
    // If we have a token but no user info, we can't really verify much without a backend.
    // For now, let's treat it as unauthorized to force a re-login.
    return NextResponse.json({ success: false, message: 'Session expired or invalid' }, { status: 401 });
  }

  try {
    const user = JSON.parse(userInfoCookie);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Auth Check Error:', error);
    return NextResponse.json({ success: false, message: 'Invalid session data' }, { status: 500 });
  }
}
// Remove the unused API_URL import if it's no longer needed
// But keep it if other parts of the file use it (none do in the visible part).
// Actually, I should probably remove the import if I'm removing the usage.
// Let's just focus on the function body first.
