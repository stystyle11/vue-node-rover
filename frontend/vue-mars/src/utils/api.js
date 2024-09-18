async function apiCall(url, method = 'GET', body = null, headers = {}) {
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

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

// GET request
export const get = (url, headers = {}) => apiCall(url, 'GET', null, headers);

// POST request
export const post = (url, body, headers = {}) => apiCall(url, 'POST', body, headers);
