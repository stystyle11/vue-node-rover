const API_BASE_URL = 'http://localhost:3000';

// Base API call
async function apiCall(endpoint, method = 'GET', body = null, headers = {}) {
  try {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

// POST request
export const post = (endpoint, body, headers = {}) => apiCall(endpoint, 'POST', body, headers);
