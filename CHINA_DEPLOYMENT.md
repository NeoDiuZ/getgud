# Neural Drive — China deployment branch

This branch is prepared for a Hong Kong-hosted China-facing deployment of `neuraldrive.tech`.

## Required local assets

The browser-facing China build intentionally avoids runtime dependencies on Google Mail, YouTube, Fontshare, and nonessential remote image hosts.

Before deploying, add these exact binary files to this branch:

| Repository path | Source file | SHA-256 |
| --- | --- | --- |
| `public/fonts/CabinetGrotesk-Regular.otf` | Cabinet Grotesk Regular | `893258bc136d7ec7487333fa4511f7c5794f6ad7c77eee2437881c6df985c0b1` |
| `public/fonts/Satoshi-Regular.otf` | Satoshi Regular | `711c6243cdc5431f9cc966e4de18bfb940365bad81acffd1e7948dbe3f254386` |
| `public/videos/neural-drive-demo.mp4` | Neural Drive Demo | `25a2ed141494e37ebaacc9f33bc29ed0c0a4be019afdb64b41330ccd603045c2` |

The demo video supplied for this branch is H.264 + AAC, 1280×720, approximately 84 seconds and 13 MB.

## Contact details

- Email: `mo@neuraldrive.tech`
- Phone: `+65 8113 3532`

## China-specific behavior

- Gmail composer URLs are converted to standard `mailto:` URLs so visitors can use their own mail provider.
- YouTube embeds are replaced by `/videos/neural-drive-demo.mp4`.
- Third-party iframes are blocked by the China layout.
- Cabinet Grotesk and Satoshi are loaded locally from `/public/fonts`.
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

Do not point production mainland traffic at this branch until all three required binary assets are present and a production build succeeds.
