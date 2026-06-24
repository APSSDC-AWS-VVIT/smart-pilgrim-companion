const DEFAULT_API_BASE_URL = 'http://localhost:8000/api';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

const pendingRequests = new Map();

function buildRequestKey(path, options) {
  const method = (options.method || 'GET').toUpperCase();
  const body = typeof options.body === 'string' ? options.body : '';
  return `${method}:${path}:${body}`;
}

export async function requestJson(path, options = {}) {
  const requestOptions = {
    method: 'GET',
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  };
  const requestKey = buildRequestKey(path, requestOptions);
  const requestUrl = `${API_BASE_URL}${path}`;

  if (requestOptions.method.toUpperCase() === 'GET' && pendingRequests.has(requestKey)) {
    return pendingRequests.get(requestKey);
  }

  const requestPromise = (async () => {
    const response = await fetch(requestUrl, requestOptions);
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = payload?.message || payload?.error || `Request failed with status ${response.status}`;
      const error = new Error(message);
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return payload;
  })();

  if (requestOptions.method.toUpperCase() === 'GET') {
    pendingRequests.set(requestKey, requestPromise);
    try {
      return await requestPromise;
    } finally {
      pendingRequests.delete(requestKey);
    }
  }

  return requestPromise;
}

export function buildQueryString(params = {}) {
  const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '');
  if (!entries.length) {
    return '';
  }
  return `?${new URLSearchParams(entries).toString()}`;
}
