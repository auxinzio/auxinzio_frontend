
/**
 * Validates the API response and handles common errors.
 */
/**
 * Validates the API response and handles common errors.
 */
async function handleResponse(response, options = {}) {
  if (response.status === 401 && !options.skipRedirect) {
    // Session expired or invalid token
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    throw new Error('Unauthorized');
  }

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    console.error('Failed to parse response as JSON:', text);
    if (!response.ok) {
      throw new Error(`Server returned an error (${response.status}): ${text.slice(0, 100) || response.statusText}`);
    }
    throw new Error(`Invalid JSON response from server: ${text.slice(0, 100)}`);
  }

  if (!response.ok) {
    // If it's a 401 and we skipped redirect, we still want to return the error data
    const error = (data && data.message) || response.statusText || `Error ${response.status}`;
    // If we skip redirect, we might want to return the data even if not ok, 
    // but the current pattern is to throw. Let's return data if it's a skipped redirect 401
    // to allow the component to handle specific error messages from the backend.
    if (response.status === 401 && options.skipRedirect) {
        return { ...data, statuscode: 401, status: "error" };
    }
    throw new Error(error);
  }

  return data;
}

/**
 * Central API wrapper for CMS authenticated requests.
 * Usage: api.get('/users'), api.post('/services', data)
 */
export const cmsApi = {
  get: async (endpoint, options = {}) => {
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const response = await fetch(`/api-proxy/cms/${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response, options);
  },

  post: async (endpoint, body, options = {}) => {
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const isFormData = body instanceof FormData;
    const response = await fetch(`/api-proxy/cms/${path}`, {
      method: 'POST',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? body : JSON.stringify(body),
    });
    return handleResponse(response, options);
  },

  request: async (endpoint, fetchOptions = {}, apiOptions = {}) => {
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const response = await fetch(`/api-proxy/cms/${path}`, fetchOptions);
    return handleResponse(response, apiOptions);
  },
};
