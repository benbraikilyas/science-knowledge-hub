# AdSense launch checklist

The codebase is prepared so advertising stays disabled until real AdSense
account values are supplied. Do not use placeholder publisher IDs.

Before requesting review:

1. Finish and human-review the article bodies. Draft articles without a
   `content` value are automatically marked `noindex` and omitted from the XML
   sitemap.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
3. Set `NEXT_PUBLIC_CONTACT_EMAIL` to an inbox the project actively monitors,
   or keep the working contact form as the primary channel.
4. Confirm the About, Editorial Policy, Sources, Contact, Privacy, Cookie Policy,
   and Terms pages match the real operating practices.
5. Create the site in AdSense. When Google provides them, set:
   - `NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT=ca-pub-...`
   - `GOOGLE_ADSENSE_PUBLISHER_ID=pub-...`
6. In AdSense Privacy & Messaging, activate a Google-certified CMP for the EEA,
   United Kingdom, and Switzerland before serving personalized ads there. The
   site's preference panel controls local choices but is not a replacement for
   Google's certified TCF consent flow.
7. If Auto ads are enabled, exclude `/login`, `/register`, `/search`,
   `/unsubscribe`, error pages, and any draft or no-content route. Prefer manual
   placements on substantial article or profile pages.
8. Verify `/robots.txt`, `/sitemap.xml`, and `/ads.txt` on the production domain.
   `/ads.txt` intentionally returns 404 until a valid publisher ID is set.

Google makes the final approval decision; these controls reduce preventable
policy and trust issues but cannot guarantee acceptance.
