export const API_BASE_URL: string =
  import.meta.env.VITE_API_URL || 'https://ecommerse.lumina360.tech';

export const TOKEN_KEY = 'access_token';
export const USER_KEY = 'user';
export const TENANT_ID = 'default-tenant';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser<T>(): T | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: unknown): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; headers?: Record<string, string>; withTenant?: boolean } = {}
): Promise<T> {
  const { method = 'GET', body, headers = {}, withTenant = false } = options;

  const finalHeaders: Record<string, string> = { ...headers };
  if (body !== undefined) {
    finalHeaders['Content-Type'] = 'application/json';
  }
  const token = getToken();
  if (token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }
  if (withTenant) {
    finalHeaders['x-tenant-id'] = TENANT_ID;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let message: string;
    try {
      const data = await response.json();
      if (data && typeof data.message === 'string') {
        message = data.message;
      } else if (typeof data === 'string' && data) {
        message = data;
      } else {
        message =
          response.status === 401
            ? 'Invalid email or password'
            : response.status === 403
              ? 'You are not authorized to perform this action'
              : `Request failed (${response.status})`;
      }
    } catch {
      message =
        response.status === 401
          ? 'Invalid email or password'
          : `Request failed (${response.status})`;
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

export const api = {
  get: <T>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { headers }),
  post: <T>(path: string, body?: unknown, headers?: Record<string, string>, withTenant = false) =>
    request<T>(path, { method: 'POST', body, headers, withTenant }),
  put: <T>(path: string, body?: unknown, headers?: Record<string, string>, withTenant = false) =>
    request<T>(path, { method: 'PUT', body, headers, withTenant }),
  patch: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: 'PATCH', body, headers }),
  delete: <T>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: 'DELETE', headers }),
};
