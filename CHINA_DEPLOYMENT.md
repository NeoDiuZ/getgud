# Neural Drive — China deployment branch

This branch is prepared for a Hong Kong-hosted China-facing deployment of `neuraldrive.tech`.

## Local assets

The browser-facing China build intentionally avoids runtime dependencies on Google Mail, YouTube, Fontshare, and nonessential remote image hosts.

The required local assets for this branch are:

- `public/fonts/CabinetGrotesk-Regular.otf`
- `public/fonts/CabinetGrotesk-Bold.otf`
- `public/fonts/Satoshi-Regular.otf`
- `public/fonts/Satoshi-Bold.otf`
- `public/videos/neural-drive-demo-video.mp4`

The demo video is served directly from the site rather than YouTube.

## Contact details

- Email: `mo@neuraldrive.tech`
- Phone: `+65 8113 3532`

## China-specific behavior

- Gmail composer URLs are converted to standard `mailto:` URLs so visitors can use their own mail provider.
- YouTube embeds are replaced by the local `/videos/neural-drive-demo-video.mp4` file.
- Third-party iframes are blocked by the China layout.
- Cabinet Grotesk and Satoshi Regular/Bold fonts are loaded locally from `/public/fonts`.
- Nonessential remote image hosts are removed from the Next.js image allowlist.
- The HSA projected submission timeline is stated as 2027.

## Build and run

```bash
npm ci
npm run build
npm start
```

By default Next.js listens on port 3000. In production, place an HTTPS reverse proxy/load balancer in front of the Node process.

## Recommended rollout

1. Deploy this branch to Alibaba Cloud Hong Kong under a temporary hostname such as `cn.neuraldrive.tech`.
2. Test `/`, `/team`, `/app`, `/privacy`, `/terms`, and `/medical-disclaimer`.
3. Test the self-hosted demo video, local fonts, contact links, audio tiles, and Web Bluetooth on target browsers.
4. Test reachability using mainland China networks (ideally China Telecom, China Unicom, and China Mobile).
5. Only after validation, configure geo-aware DNS so mainland-China traffic for `neuraldrive.tech` goes to Alibaba while the default route continues to Vercel.

Do not point production mainland traffic at this branch until a production build succeeds and the temporary China deployment passes the route/media/network checks above.
