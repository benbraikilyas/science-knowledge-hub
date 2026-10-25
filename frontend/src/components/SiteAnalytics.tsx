'use client';

import { Analytics, type BeforeSendEvent } from '@vercel/analytics/react';

const EXCLUDE_KEY = 'skh-exclude-analytics';

// Open any page with ?exclude-me=1 to stop counting this browser, ?exclude-me=0 to count it again.
function isExcluded() {
  try {
    const flag = new URLSearchParams(window.location.search).get('exclude-me');
    if (flag === '1') window.localStorage.setItem(EXCLUDE_KEY, '1');
    else if (flag === '0') window.localStorage.removeItem(EXCLUDE_KEY);
    return window.localStorage.getItem(EXCLUDE_KEY) === '1';
  } catch {
    return false;
  }
}

const beforeSend = (event: BeforeSendEvent) => (isExcluded() ? null : event);

export default function SiteAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
