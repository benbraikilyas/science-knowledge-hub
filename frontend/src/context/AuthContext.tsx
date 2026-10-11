'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Empty string = relative URL → requests go through the Next.js /api proxy (next.config.ts rewrites).
// This avoids cross-origin fetch errors caused by browser extensions intercepting window.fetch.
const API_BASE = '';

/**
 * Extracts a human-readable error message from a DRF error response.
 * Handles: { detail }, { error }, field-level { field: ["msg"] }, and fallbacks.
 */
function extractError(data: Record<string, unknown>, fallback: string): string {
  if (typeof data.detail === 'string') return data.detail;
  if (typeof data.error === 'string') return data.error;
  // Field-level errors: { username: ["already exists"], email: [...] }
  const fieldErrors = Object.entries(data)
    .filter(([, v]) => Array.isArray(v) || typeof v === 'string')
    .map(([field, msgs]) => {
      const msg = Array.isArray(msgs) ? msgs[0] : msgs;
      return `${field}: ${msg}`;
    });
  if (fieldErrors.length > 0) return fieldErrors.join(' | ');
  return fallback;
}

interface User {
  id: number | string;
  username: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const storeAuth = useCallback((accessToken: string, refreshTokenVal: string, userData: User) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshTokenVal);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(accessToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  const refreshToken = useCallback(async () => {
    const storedRefresh = localStorage.getItem('refresh_token');
    if (!storedRefresh) {
      logout();
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: storedRefresh }),
      });
      if (!res.ok) {
        logout();
        return;
      }
      const data = await res.json();
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      storeAuth(data.access, storedRefresh, storedUser);
    } catch {
      logout();
    }
  }, [storeAuth, logout]);

  const login = useCallback(async (identifier: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/v1/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: identifier, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(extractError(data, 'Login failed'));
    }
    const data = await res.json();
    storeAuth(data.access, data.refresh, data.user);
  }, [storeAuth]);

  const register = useCallback(async (username: string, email: string, password: string, displayName?: string) => {
    const body: Record<string, string> = { username, email, password };
    if (displayName) body.display_name = displayName;
    const res = await fetch(`${API_BASE}/api/v1/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(extractError(data, 'Registration failed'));
    }
    const data = await res.json();
    storeAuth(data.access, data.refresh, data.user);
  }, [storeAuth]);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      const storedToken = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        refreshToken();
      }
    });
    return () => {
      active = false;
    };
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token && !!user, login, register, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
