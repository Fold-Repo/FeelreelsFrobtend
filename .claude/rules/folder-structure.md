# Folder structure

```
app/layout.tsx                 → metadata (generateMetadata), JSON-LD, GA, <Providers>
app/(site)/layout.tsx          → <main> for public pages
app/(site)/page.tsx            → thin: `return <HomeView />`
app/robots.ts, sitemap.ts, manifest.ts
views/<page>/index.tsx         → composes the page from sections
views/<page>/sections/*.tsx    → one file per section, exported from sections/index.ts
views/<page>/components/*      → pieces used only by this page
views/index.ts                 → re-exports every view
data/*.json                    → all copy (site.json = name, nav, socials, labels)
types/*.type.ts                → types, re-exported from types/index.ts (`Paginated<T>`, `Link`)
constants/                     → SITE, NAV_LINKS, LABELS, SEO constants
components/ui/                 → Button, ButtonLink, Container, Spinner, PopupModal, FadeUp, SmoothScroll,
                                 FilterTabs, SectionHeader, Toggle, RollingNumber
components/ui/form/            → Input (password toggle), TextArea, Select, CheckBox, Label, ErrorMessage, FormField
components/reusable/           → InfiniteScrollFooter, InstallButton
components/layout/             → Navbar, ViewerBadge, MobileMenu, Footer, Logo
components/series/             → SeriesCard, SeriesRail
components/player/             → ProtectedVideo
components/seo/                → GoogleAnalytics, JsonLd, StructuredData (server-only, import directly)
providers/                     → React Query, MotionConfig, HeroUI Toast
hooks/                         → useInfiniteScroll, usePaginatedQuery, useQueryParams, useDebounce,
                                 useClickOutside, useToast
lib/                           → cn, fonts; lib/seo → getOrigin, schema builders
scripts/                       → format-classes, format-jsx-spacing
```

Rules:
- Import from barrels: `@/components`, `@/views`, `@/data`, `@/types`, `@/constants`, `@/lib`, `@/hooks`.
- Server-only modules (`next/headers`) are imported directly: `@/lib/seo`, `@/components/seo/StructuredData`.
- No hard-coded copy in components — put it in `data/*.json`.
- UI kit is **HeroUI v3** (`@heroui/react` compound API: `Modal.Dialog`, `Toast.Provider`, `onPress`).
- Lists: `usePaginatedQuery` (React Query infinite) + `<InfiniteScrollFooter>` for infinite feeds.
- Need a pattern twice → make it a component in `components/ui` first.
