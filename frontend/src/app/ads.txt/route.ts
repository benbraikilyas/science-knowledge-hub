const ADSENSE_RELATIONSHIP_ID = 'f08c47fec0942fa0';

export async function GET() {
  const publisherId = process.env.GOOGLE_ADSENSE_PUBLISHER_ID?.trim();

  if (!publisherId || !/^pub-\d+$/.test(publisherId)) {
    return new Response('', { status: 404 });
  }

  return new Response(`google.com, ${publisherId}, DIRECT, ${ADSENSE_RELATIONSHIP_ID}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
