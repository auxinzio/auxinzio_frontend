import { NextResponse } from 'next/server';
import { API_URL } from "@/lib/constants";

async function handler(req, { params }) {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const path = slug.join('/'); // e.g. "users" or "services/123"
  const apiUrl = API_URL || process.env.NEXT_PUBLIC_API_URL;
  const targetUrl = `${apiUrl}/api/${path}`; // Append query params


  try {
    // Forward headers
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);

    const contentType = req.headers.get('content-type');
    if (contentType) {
      headers.set('Content-Type', contentType);
    }

    // Use the raw body stream instead of reading it as text.
    // This is much more efficient for file uploads (images) and avoids
    // the 413 error if it was triggered by buffering large strings in memory.
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : req.body;

    const res = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: body,
      // @ts-ignore - 'duplex' is required for streaming bodies in undici/fetch (used by Next.js)
      duplex: 'half',
    });

    // Handle responses
    const responseText = await res.text();
    
    if (res.status === 413) {
      console.error(`[CMS Proxy] 413 Payload Too Large from backend for ${req.method} ${path}`);
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      if (res.status >= 400) {
        console.error(`[CMS Proxy] Error ${res.status} from backend for ${req.method} ${path}:`, responseText.slice(0, 1000));
      }
      responseData = {
        success: false,
        message: `Backend error (${res.status}): ${res.statusText || 'Internal Server Error'}`,
        rawResponse: responseText.slice(0, 1000)
      };
    }

    return NextResponse.json(responseData, { status: res.status });

  } catch (error) {
    console.error(`[CMS Proxy] Error for ${path}:`, error);
    return NextResponse.json({ 
      success: false, 
      message: 'Proxy Error', 
      details: error.message 
    }, { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
