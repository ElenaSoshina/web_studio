import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getTenantBranding, type TenantBrandingResponseDto } from '../services/tenantApi';

type BrandingStatus = 'loading' | 'ready' | 'fallback' | 'error';

interface TenantBrandingContextValue {
  status: BrandingStatus;
  branding: TenantBrandingResponseDto | null;
  reloadBranding: () => Promise<void>;
}

const TenantBrandingContext = createContext<TenantBrandingContextValue | null>(null);

const DEFAULT_PRIMARY = '#00ffff';
const DEFAULT_SECONDARY = '#0080ff';
const DEFAULT_TEXT = '#ffffff';

const applyBrandingToDocument = (branding: TenantBrandingResponseDto | null): void => {
  const root = document.documentElement;

  root.style.setProperty('--tenant-primary', branding?.themeColors?.primary || DEFAULT_PRIMARY);
  root.style.setProperty('--tenant-secondary', branding?.themeColors?.secondary || DEFAULT_SECONDARY);
  root.style.setProperty('--tenant-text', branding?.themeColors?.text || DEFAULT_TEXT);

  if (branding?.name) {
    document.title = branding.name;
  } else {
    document.title = 'WebAp.dev';
  }
};

export const TenantBrandingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [status, setStatus] = useState<BrandingStatus>('loading');
  const [branding, setBranding] = useState<TenantBrandingResponseDto | null>(null);

  const reloadBranding = useCallback(async () => {
    setStatus('loading');

    try {
      const result = await getTenantBranding();

      if (result.kind === 'found' && result.payload.data) {
        setBranding(result.payload.data);
        setStatus('ready');
        applyBrandingToDocument(result.payload.data);
        return;
      }

      setBranding(null);
      setStatus('fallback');
      applyBrandingToDocument(null);
    } catch (error) {
      console.error('Failed to load tenant branding', error);
      setBranding(null);
      setStatus('error');
      applyBrandingToDocument(null);
    }
  }, []);

  useEffect(() => {
    void reloadBranding();
  }, [reloadBranding]);

  const value = useMemo(
    () => ({
      status,
      branding,
      reloadBranding,
    }),
    [branding, reloadBranding, status],
  );

  return <TenantBrandingContext.Provider value={value}>{children}</TenantBrandingContext.Provider>;
};

export const useTenantBranding = (): TenantBrandingContextValue => {
  const context = useContext(TenantBrandingContext);

  if (!context) {
    throw new Error('useTenantBranding must be used inside TenantBrandingProvider');
  }

  return context;
};
