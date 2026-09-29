import {
  api,
  getStoredUser,
  getToken,
  setStoredUser,
  clearAuth,
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  setTenantId,
  clearTenantId,
  getTenantId,
  DEFAULT_TENANT_ID,
} from './api';
import { AuthUser } from '../types';

interface TokenPayload {
  sub?: string;
  email?: string;
  role?: string;
  tenantId?: string;
  tenant_id?: string;
  tenant?: string;
  exp?: number;
}

interface LoginApiResponse {
  access_token: string;
  refresh_token?: string;
  user?: {
    _id?: string;
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    role?: string;
    tenantId?: string;
    tenant_id?: string;
    permissions?: string[];
  };
  tenantId?: string;
  tenant_id?: string;
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
  // Restrict login request specifically to the Moo & More Dairy tenant
  const response = await api.post<LoginApiResponse>(
    '/auth/login',
    { email, password },
    { 'x-tenant-id': DEFAULT_TENANT_ID }
  );

  const token = response.access_token;
  localStorage.setItem(TOKEN_KEY, token);

  if (response.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh_token);
  }

  const decoded = decodeJwt(token);

  // Hardcode tenant strictly to Moo & More Dairy ('moomore-dairy')
  const tenantId = DEFAULT_TENANT_ID;
  setTenantId(tenantId);

  const user: AuthUser = {
    id: response.user?._id || response.user?.id || decoded.sub || '',
    email: response.user?.email || decoded.email || email,
    role: response.user?.role || decoded.role || '',
    firstName: response.user?.firstName || '',
    lastName: response.user?.lastName || '',
    phoneNumber: response.user?.phoneNumber || '',
    permissions: response.user?.permissions || [],
    tenantId,
  };

  setStoredUser(user);

  // Notify listeners that tenant context has been updated
  window.dispatchEvent(new CustomEvent('tenant-change', { detail: { tenantId } }));

  return user;
}

export function logout(): void {
  clearAuth();
  // Reset back to default tenant and notify listeners
  window.dispatchEvent(new CustomEvent('tenant-change', { detail: { tenantId: DEFAULT_TENANT_ID } }));
}
