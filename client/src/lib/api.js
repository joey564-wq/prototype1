// Simple API utility for making fetch calls to the local backend
const API_BASE = '/api';

export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Listings API
export const listingsAPI = {
  getAll: () => fetchAPI('/listings'),
  getById: (id) => fetchAPI(`/listings/${id}`),
  getByUser: (userId) => fetchAPI(`/users/${userId}/listings`),
  create: (data) => fetchAPI('/listings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/listings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/listings/${id}`, {
    method: 'DELETE',
  }),
};
