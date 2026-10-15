# Code style — written like a senior dev

**Prettier formats, ESLint checks.** Never hand-format; never fight the tools.

- `npm run format` — `scripts/format-classes.mjs` + `scripts/format-jsx-spacing.mjs` + Prettier.
- `npm run lint:fix` — ESLint autofix, then Prettier.
- `npm run check` — Prettier check + ESLint + `tsc`. Must pass before finishing any task (run `next build` or `next dev` once first so `LayoutProps` types exist).
- VS Code / Cursor format on save and show thin rainbow indent lines (indent-rainbow, `light` style)
  (`.vscode/settings.json`); install the recommended extensions.

## What the tools enforce
- **Prettier**: 4-space indent, single quotes, no semicolons, trailing commas, 160-char lines (tags stay on one line; scroll sideways).
  JSX attributes stay on one line when they fit; otherwise one per line, with the closing `>`
  on the last attribute line (`bracketSameLine`) — never alone on its own line.
- **prettier-plugin-tailwindcss**: sorts Tailwind classes (also inside `cn()`/`clsx()`).
- **scripts/format-classes.mjs**: one class string per element. Static `cn('a', 'b')` becomes
  `className="a b"`; in conditional `cn()` calls the static strings are merged into one.
  Long class strings stay on one line (word wrap is off) — never split them by hand.
- **ESLint**: Next/React/hooks rules, `import/order` (react/next → packages → `@/` → relative, A–Z),
  blank line before `return` and after `const` blocks, self-closing empty JSX tags,
  Tailwind correctness (unknown / conflicting / duplicate classes) via `better-tailwindcss`.

## What's on you
- Blank line between sibling JSX elements (enforced by `scripts/format-jsx-spacing.mjs`)
  and between hooks, handlers and return.
- Conditional classes: `cn()` with the base string first, then one condition per line.
- One component per file, ≤ ~120 lines. Bigger → split into `components/` next to it.
- Order in a file: imports → types → constants → component → helpers.
- Destructure props/data at the top, then render.
- Named exports for components; views `export default` and re-export from `views/index.ts`.
- `'use client'` only on the smallest leaf that needs state, effects or browser APIs.
- Server-only modules (anything using `next/headers`) are imported directly, never via a barrel
  that client components also import.
- No comments in code at all — names and structure should explain it.
  Never mention design references or other sites in code.

## Naming
- Components `PascalCase.tsx`, hooks `useThing.ts`, data `kebab-case.json`, types `<page>.type.ts`.
- Data constants are `UPPER_SNAKE` (`HOME`, `PROJECTS`).
