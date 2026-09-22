import { api, getStoredUser, getToken, setStoredUser, clearAuth, TOKEN_KEY } from './api';
import { AuthUser } from '../types';

interface TokenPayload {
  sub?: string;
  email?: string;
  role?: string;
  exp?: number;
}

export function decodeJwt(token: string): TokenPayload {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return {};
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json) as TokenPayload;
  } catch {
    return {};
  }
}

export function isTokenExpired(token: string): boolean {
  const { exp } = decodeJwt(token);
  if (!exp) return false;
  return exp * 1000 <= Date.now();
}

export function getCurrentUser(): AuthUser | null {
  const user = getStoredUser<AuthUser>();
  const token = getToken();
  if (user && token && !isTokenExpired(token)) return user;
  return null;
}

export function hasValidSession(): boolean {
  const token = getToken();
  if (!token) return false;
  if (isTokenExpired(token)) {
    clearAuth();
    return false;
  }
  return !!getStoredUser<AuthUser>();
}

export function isAdminUser(user: AuthUser | null): boolean {
  return !!user && (user.role === 'admin' || user.role === 'super_admin');
}

export async function login(
  email: string,
  password: string
): Promise<AuthUser> {
  const response = await api.post<{ access_token: string }>(
    '/auth/login',
    { email, password },
    undefined,
    true
  );

  const token = response.access_token;
  localStorage.setItem(TOKEN_KEY, token);

  const decoded = decodeJwt(token);
  const user: AuthUser = {
    id: decoded.sub || '',
    email: decoded.email || email,
    role: decoded.role || '',
    firstName: '',
    lastName: '',
    permissions: [],
  };

  setStoredUser(user);
  return user;
}

export function logout(): void {
  clearAuth();
}
