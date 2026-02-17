
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

  const data = await response.json();
  
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
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
    const response = await fetch(`/api/${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },

  post: async (endpoint, body) => {
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const response = await fetch(`/api/cms/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  put: async (endpoint, body) => {
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const response = await fetch(`/api/cms/${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const response = await fetch(`/api/cms/${path}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
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
