# Pages

Two layouts:
- `(site)` — marketing chrome (floating white `Navbar` + `Footer`): `/` only.
- `(app)` — full-screen app shell (`components/shell`: sidebar, search top bar, token chip): `/browse`, `/series/[slug]`, `/settings`.
- `(auth)` — split card with the animated poster panel (`views/auth/AuthLayout`): `/login`, `/forgot-password`, `/verify`, `/reset-password`.

| Route | View | Notes |
|---|---|---|
| `/` | `views/home` | Hero · Genres bento `#genres` · Trending rail · Get the app `#app` (store badges + web install) |
| `/browse` | `views/browse` | One sticky toolbar: genre chips + Filters menu + Sort. All state in the URL (`category`, `sort`, `filters`, `q`, `list`). Infinite scroll grid of `VideoCard` |
| `/series/[slug]` | `views/series` | YouTube-style: player (theater / full screen / locked overlay → ad, token, VIP), title + stats, studio + My List, like/comments/share, description, episodes, Up next |
| `/settings` | `views/settings` | Account (guest device ID) · Membership · Playback · App + device reset |
| `/login` → `/verify` | `views/auth` | Optional sign-in; sign-up verifies the email with a 6-digit code. Guests can always watch |
| `/forgot-password` → `/verify?flow=reset` → `/reset-password` | `views/auth` | Code by email, then new password with strength checklist |

- Copy: `data/{site,app,home,browse,watch,auth,settings,install}.json`; series in `data/catalog.json` through `lib/catalog.ts`.
- Viewer state: `lib/viewer-store.ts` + `useViewer()` (guest ID, VIP, tokens, unlocks, My List, likes, prefs).
- Motion: Lenis runs site-wide via `ReactLenis` (`SmoothScroll` in providers, resets on route change); page-enter transition in each group's `template.tsx`; `SplitText` word reveals; pinned horizontal Trending; scroll-velocity `GenreMarquee`.
- Video only through `ProtectedVideo` (no context menu, download, PiP) — deterrent only; real protection is signed URLs/DRM.
- PWA (ported from hubcommerce): install-event capture script in `app/layout.tsx`, `ServiceWorker` (prod only), `public/sw.js` + `public/offline.html`, `InstallPrompt` toast with per-platform steps, `AppDownloadModal` (App Store / Google Play + web install) opened via `useAppDownload().show()`.
