
/**
 * Validates the API response and handles common errors.
 */
async function handleResponse(response) {
  if (response.status === 401) {
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
    const error = (data && data.message) || response.statusText || `Error ${response.status}`;
    throw new Error(error);
  }

  return data;
}

/**
 * Central API wrapper for CMS authenticated requests.
 * Usage: api.get('/users'), api.post('/services', data)
 */
export const cmsApi = {
  get: async (endpoint) => {
    // Strip leading slash if present to avoid double slash
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const response = await fetch(`/api/cms/${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },

  post: async (endpoint, body) => {
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const isFormData = body instanceof FormData;

    const response = await fetch(`/api/cms/${path}`, {
      method: 'POST',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? body : JSON.stringify(body),
    });
    return handleResponse(response);
  },

  // Custom fetch wrapper for file uploads or special headers
  request: async (endpoint, options = {}) => {
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const response = await fetch(`/api/cms/${path}`, options);
    return handleResponse(response);
  },
};
