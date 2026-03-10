export interface CreateTenantRequest {
  name: string;
  ownerEmail: string;
  ownerPassword: string;
  customDomain: string | null;
}

export interface TenantResponseDto {
  id: string;
  name: string;
  customDomain?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TenantBrandingResponseDto {
  name: string;
  themeColors?: Record<string, string> | null;
  logoUrl?: string | null;
}

interface ResultResponse<T> {
  success: boolean;
  message?: string | null;
  traceId?: string | null;
  data?: T;
}

export type CreateTenantOutcome =
  | { kind: 'success'; payload: ResultResponse<TenantResponseDto> }
  | { kind: 'conflict'; payload: ResultResponse<TenantResponseDto> };

export type BrandingOutcome =
  | { kind: 'found'; payload: ResultResponse<TenantBrandingResponseDto> }
  | { kind: 'not_found' };

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://api.test.campero.ru/api/v1').replace(/\/$/, '');
const TENANT_CONTEXT_STORAGE_KEY = 'tenantContextId';

const getTenantIdFromStorage = (): string | null => {
  try {
    return window.localStorage.getItem(TENANT_CONTEXT_STORAGE_KEY);
  } catch {
    return null;
  }
};

const getTenantIdFromQuery = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get('tenantId');
};

export const getKnownTenantId = (): string | null => {
  return getTenantIdFromQuery() || getTenantIdFromStorage();
};

export const saveTenantContextId = (tenantId: string): void => {
  try {
    window.localStorage.setItem(TENANT_CONTEXT_STORAGE_KEY, tenantId);
  } catch (error) {
    console.warn('Failed to persist tenant context id', error);
  }
};

const buildTenantHeaders = (withJsonContentType = false): HeadersInit => {
  const headers: Record<string, string> = {};
  const tenantId = getKnownTenantId();

  if (withJsonContentType) {
    headers['Content-Type'] = 'application/json';
  }

  if (tenantId) {
    headers['X-Tenant-ID'] = tenantId;
  }

  return headers;
};

export const createTenant = async (payload: CreateTenantRequest): Promise<CreateTenantOutcome> => {
  const response = await fetch(`${API_BASE_URL}/tenants`, {
    method: 'POST',
    headers: buildTenantHeaders(true),
    body: JSON.stringify(payload),
  });

  let responsePayload: ResultResponse<TenantResponseDto> = { success: false };

  try {
    responsePayload = await response.json();
  } catch {
    responsePayload = { success: false, message: 'Unexpected empty response body' };
  }

  if (response.status === 201) {
    return { kind: 'success', payload: responsePayload };
  }

  if (response.status === 409) {
    return { kind: 'conflict', payload: responsePayload };
  }

  throw new Error(`Failed to create tenant. Status: ${response.status}`);
};

export const getTenantBranding = async (): Promise<BrandingOutcome> => {
  const response = await fetch(`${API_BASE_URL}/tenants/branding`, {
    method: 'GET',
    headers: buildTenantHeaders(),
  });

  // Some environments may return 400/401/403 instead of 404
  // when tenant context cannot be resolved. Treat all of them as fallback.
  if ([400, 401, 403, 404].includes(response.status)) {
    return { kind: 'not_found' };
  }

  if (response.status !== 200) {
    throw new Error(`Failed to fetch branding. Status: ${response.status}`);
  }

  const payload = (await response.json()) as ResultResponse<TenantBrandingResponseDto>;
  return { kind: 'found', payload };
};
