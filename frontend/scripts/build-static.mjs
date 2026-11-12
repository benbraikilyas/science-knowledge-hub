// Builds the site as plain static files in out/ (for Cloudflare) and writes Cloudflare's
// _redirects file from the same list next.config.ts uses on Vercel.
// Usage: npm run build:static
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const nextBin = path.join('node_modules', 'next', 'dist', 'bin', 'next');
const build = spawnSync(process.execPath, [nextBin, 'build'], {
  stdio: 'inherit',
  env: { ...process.env, STATIC_EXPORT: '1' },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const redirects = JSON.parse(readFileSync('redirects.json', 'utf8'));
writeFileSync(
  path.join('out', '_redirects'),
  redirects.map(({ source, destination }) => `${source} ${destination} 301`).join('\n') + '\n',
);
console.log(`Wrote out/_redirects with ${redirects.length} redirects.`);
