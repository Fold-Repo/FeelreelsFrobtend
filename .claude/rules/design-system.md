# Design system

Calm, warm, product-led streaming site. Light page, dark player and bands.

- Font: Plus Jakarta Sans (`lib/fonts.ts`). Headings `font-semibold tracking-[-0.03em]`; second line muted (`accent`).
- Tokens (`app/globals.css`, on top of HeroUI v3 vars): `background` warm off-white, `surface` white, `ink`, `muted`, `line`, `primary` (black pills), `accent` coral (progress, live dots, active episode), `gold` (VIP, tokens), `night`/`night-soft` (player stage, plans band, footer), tints `mint/blush/butter/sky` for floating chips only.
- Shapes: pills for buttons/chips/tabs; big panels `rounded-[2rem] lg:rounded-[2.5rem]` inset `px-2 sm:px-4`; cards `rounded-3xl`/`rounded-[1.75rem]`.
- Navbar: white bar `rounded-[1.25rem]` with a soft `ring-[6px] ring-surface/45`.
- Motion: Lenis (`SmoothScroll`, add `data-lenis-prevent` to inner scrollers), `FadeUp`, `RollingNumber`, framer `layoutId` pills, `animate-float` chips, `animate-marquee`. Ease `EASE` from `lib/motion.ts`. Respect reduced motion.

## Avoid
Italic serif accents · mono labels · uppercase tracking labels · neon glow · grid backgrounds · identical icon-card grids · fake logos · buzzwords.

## Logo
- Mark "Episode stack": three fanned vertical cards (gold, peach, coral) with a white play on the front card, on an ink tile. Wordmark `feel` bold + `reels` regular at 55% opacity, `tracking-[-0.055em]`.
- Geometry lives in two places that must match: `components/layout/LogoMark` (in-app) and `lib/brand.ts` (`logoSvg` for generated images).
- Generated from `lib/brand.ts`: `app/icons/[size]` (192, 512, maskable), `app/apple-icon.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`. Static: `app/icon.svg`, `app/favicon.ico` (regenerate from `/icons/512` after changing the mark), `public/offline.html`.
