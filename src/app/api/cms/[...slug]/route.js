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
  const targetUrl = `${apiUrl}/api/${path}${req.nextUrl.search}`; // Append query params

  try {
    // Forward headers (except host/cookie/content-length/etc provided by browser automatically?)
    // Actually just create new headers with Authorization
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);
    
    const contentType = req.headers.get('content-type');
    if (contentType) {
      headers.set('Content-Type', contentType);
    }
    
    // Read body if method has body
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await req.text();

    const res = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: body,
    });

    // Stream the response back? Or await json?
    // Safer to just proxy the text/json.
    // However, some endpoints return blobs/files.
    // For CMS usually JSON.
    
    const responseData = await res.json().catch(() => ({})); 

    if (res.status === 401) {
      // Token expired? Clear cookie?
      // const response = NextResponse.json(responseData, { status: 401 });
      // response.cookies.delete('auth_token');
      // return response;
    }

    return NextResponse.json(responseData, { status: res.status });

  } catch (error) {
    console.error(`Proxy Error for ${path}:`, error);
    return NextResponse.json({ success: false, message: 'Proxy Error' }, { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
