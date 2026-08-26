'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, Settings2, X } from 'lucide-react';

const STORAGE_KEY = 'sciencehub-cookie-consent-v1';
export const OPEN_COOKIE_SETTINGS_EVENT = 'sciencehub:open-cookie-settings';

interface ConsentPreferences {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  savedAt: string;
}

function updateGoogleConsent(preferences: ConsentPreferences) {
  const browserWindow = window as Window & { dataLayer?: unknown[][] };
  browserWindow.dataLayer = browserWindow.dataLayer || [];
  browserWindow.dataLayer.push([
    'consent',
    'update',
    {
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.advertising ? 'granted' : 'denied',
      ad_user_data: preferences.advertising ? 'granted' : 'denied',
      ad_personalization: preferences.advertising ? 'granted' : 'denied',
    },
  ]);
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    let active = true;
    const openSettings = () => {
      setCustomizing(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);

    queueMicrotask(() => {
      if (!active) return;
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setOpen(true);
        return;
      }

      try {
        const preferences = JSON.parse(saved) as ConsentPreferences;
        setAnalytics(Boolean(preferences.analytics));
        setAdvertising(Boolean(preferences.advertising));
        updateGoogleConsent(preferences);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
        setOpen(true);
      }
    });

    return () => {
      active = false;
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    };
  }, []);

  const save = (nextAnalytics: boolean, nextAdvertising: boolean) => {
    const preferences: ConsentPreferences = {
      necessary: true,
      analytics: nextAnalytics,
      advertising: nextAdvertising,
      savedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    updateGoogleConsent(preferences);
    window.dispatchEvent(new CustomEvent('sciencehub:consent-change', { detail: preferences }));
    setOpen(false);
    setCustomizing(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-5" role="dialog" aria-modal="true" aria-labelledby="cookie-consent-title">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gold-500/30 bg-[var(--bg-secondary)]/98 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300 sm:flex">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="cookie-consent-title" className="text-base font-bold text-[var(--text-primary)]">
                  Your privacy choices
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  We use necessary storage to remember your preferences. Analytics and advertising storage remain off unless you choose to allow them.
                  {' '}Read our <Link href="/cookies" className="text-gold-300 underline-offset-4 hover:underline">Cookie Policy</Link>.
                </p>
              </div>
              {customizing && (
                <button type="button" onClick={() => setCustomizing(false)} aria-label="Close cookie settings" className="rounded-lg p-1 text-[var(--text-secondary)] hover:bg-white/[0.06] hover:text-[var(--text-primary)]">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {customizing && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[var(--border-color)] bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Necessary</span>
                    <span className="text-xs font-semibold text-emerald-300">Always on</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">Required for security and saved preferences.</p>
                </div>
                <label className="cursor-pointer rounded-xl border border-[var(--border-color)] bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Analytics</span>
                    <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="h-4 w-4 accent-[#ffc300]" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">Helps us understand site usage.</p>
                </label>
                <label className="cursor-pointer rounded-xl border border-[var(--border-color)] bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Advertising</span>
                    <input type="checkbox" checked={advertising} onChange={(event) => setAdvertising(event.target.checked)} className="h-4 w-4 accent-[#ffc300]" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">Allows ad measurement and personalization where available.</p>
                </label>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2.5">
              {customizing ? (
                <button type="button" onClick={() => save(analytics, advertising)} className="rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">
                  Save choices
                </button>
              ) : (
                <button type="button" onClick={() => setCustomizing(true)} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:border-gold-500/40">
                  <Settings2 className="h-4 w-4" /> Customize
                </button>
              )}
              <button type="button" onClick={() => save(false, false)} className="rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:border-gold-500/40">
                Necessary only
              </button>
              <button type="button" onClick={() => save(true, true)} className="rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">
                Allow all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
