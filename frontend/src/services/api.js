import axios from 'axios';

const DEFAULT_API_URL = 'http://localhost:5000';
const rawApiUrl = import.meta.env.VITE_API_URL || DEFAULT_API_URL;
const normalizedApiUrl = rawApiUrl.replace(/\/$/, '');

export const API_BASE_URL = `${normalizedApiUrl}/api`;

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

const loadingListeners = new Set();
let activeRequests = 0;

function emitLoadingState() {
  const isLoading = activeRequests > 0;
  loadingListeners.forEach((listener) => {
    try {
      listener(isLoading);
    } catch {
      // Ignore listener failures so request handling stays resilient.
    }
  });
}

export function subscribeApiLoading(listener) {
  if (typeof listener !== 'function') {
    return () => {};
  }

  loadingListeners.add(listener);
  listener(activeRequests > 0);

  return () => {
    loadingListeners.delete(listener);
  };
}

API.interceptors.request.use(
  (config) => {
    activeRequests += 1;
    emitLoadingState();
    return config;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);
    emitLoadingState();
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    activeRequests = Math.max(0, activeRequests - 1);
    emitLoadingState();
    return response;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);
    emitLoadingState();

    const payload = error?.response?.data || {};
    const status = error?.response?.status;
    const message = payload?.message || payload?.error || error.message || 'Request failed';
    const normalizedError = new Error(message);
    normalizedError.status = status;
    normalizedError.payload = payload;
    normalizedError.cause = error;
    return Promise.reject(normalizedError);
  },
);

const pendingRequests = new Map();

function buildRequestKey(path, options) {
  const method = (options.method || 'GET').toUpperCase();
  const body = typeof options.data === 'string' ? options.data : '';
  return `${method}:${path}:${body}`;
}

export async function requestJson(path, options = {}) {
  const requestOptions = {
    method: 'GET',
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  };
  const requestKey = buildRequestKey(path, requestOptions);

  if (requestOptions.method.toUpperCase() === 'GET' && pendingRequests.has(requestKey)) {
    return pendingRequests.get(requestKey);
  }

  const requestPromise = API.request({
    url: path,
    method: requestOptions.method,
    params: requestOptions.params,
    data: requestOptions.data,
    headers: requestOptions.headers,
  }).then((response) => response.data);

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
