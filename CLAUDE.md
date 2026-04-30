# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page portfolio for Laura Cerveaux (BTS Communication student). React 19 + Vite 8 + TypeScript 6 + Tailwind CSS 4. Package manager is **pnpm**.

## Commands

- `pnpm dev` — Vite dev server (default `http://localhost:5173`). The `image-watch` plugin auto-generates AVIF/WebP/fallback variants when an image is dropped into `src/assets/`.
- `pnpm build` — runs `pnpm images` first (regenerates any stale variants), then `tsc -b` and `vite build`. The TypeScript step is the only typecheck/lint gate (no ESLint, no test runner configured), so always run `pnpm tsc --noEmit` after substantive edits to verify.
- `pnpm preview` — preview the built bundle.
- `pnpm images` — incrementally generate image variants (skips unchanged sources via `.image-cache.json`).
- `pnpm images:force` — same but ignores the cache and regenerates everything.

Production deploy is the multi-stage `Dockerfile` (build → nginx serving `dist/`). `nginx.conf` ships with the image.

## Architecture

### Composition

- `src/main.tsx` mounts `<App />` inside `<BrowserRouter>` and calls `registerGSAP()` once.
- `src/App.tsx` renders `<Navigation />` plus a single `/` route → `src/routes/Home.tsx`.
- `Home.tsx` is the **section composition root**: it stacks `Cursor`, `SunflowerThread`, `WelcomeIntro`, then the page sections in order (`Hero` → `About` → `Journey` → `Projects` → `Music` → gradient bridge → `Contact` → `Footer`). Reordering sections happens here, not via routing.

### Folder roles

- `src/sections/` — full-page sections, each owns its own background, padding, and scroll animations. Section IDs (`#accueil`, `#apropos`, `#parcours`, `#projets`, `#musique`, `#contact`) are referenced by `Navigation` and by smooth-scroll handlers in `Hero` / `Contact`.
- `src/components/` — cross-section UI: `Navigation`, `ProjectModal`, `Carousel`/`CarouselSlide` (Embla wrapper with optional autoplay), `SlideViewer`/`FlipbookViewer`/`CatalogueViewer` (PDF/page viewers), `TrackList` (custom SoundCloud player), and DA elements `Cursor`, `SunflowerThread`, `WelcomeIntro`.
- `src/data/` — content (no DB). `projects.ts` exports `featuredProjects` (carousel) and `otherProjects` (split by `category` `'École' | 'Entreprise'` in `Projects.tsx`). `music.ts`, `milestones.ts`, `contact.ts` follow the same pattern. All shapes are typed in `src/types/index.ts`.
- `src/styles/` — `index.css` is the Tailwind 4 entry; it imports `tokens.css` and `fonts.css`, declares the design palette via `@theme inline { --color-* ... }` (so Tailwind utilities like `bg-night`, `text-accent` resolve), and includes the `prefers-reduced-motion` reset and `cursor-none-mode` global rule used by `Cursor.tsx`.
- `src/hooks/useInView.ts` — IntersectionObserver-based hook used by older sections; newer code uses `motion`'s `whileInView` directly.
- `src/lib/gsapConfig.ts` — GSAP plugin registration. Animation primary stack is `motion/react` (Framer Motion 12); GSAP is available but not the default.
- `src/imports/` — exists, inspect before adding new imports there.

### Path alias

`@/*` resolves to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`). Always import via `@/` for cross-folder refs.

### Vite chunking

`vite.config.ts` defines `manualChunks`: React/router → `react-vendor`, `motion`/`gsap` → `animation-vendor`. Adding heavy deps may warrant a new chunk entry there.

## Key system patterns

### Design tokens are reused, not renamed

The palette has been migrated from a blue DA to a sunflower yellow DA, but the CSS variable **names** (`--color-night`, `--color-accent`, `--color-accent-blue`, `--color-ivory`, `--color-sky-light`, etc.) were kept and only their values changed. Don't take names literally — `accent-blue` is currently a deep amber, `night` is a warm coffee. When extending the palette, add new tokens; don't rename existing ones.

### Image pipeline (responsive AVIF / WebP / fallback)

Every image under `src/assets/` is processed by [scripts/build-images.mjs](scripts/build-images.mjs) (using `sharp`, with a `@napi-rs/canvas` fallback for AVIF inputs that libheif can't decode). For each source, the script generates **9 variants** as siblings: 3 widths (`640w` / `1280w` / `1920w`) × 3 formats (`avif` / `webp` / fallback `jpg` or `png`). Variant filenames follow the convention `<basename>.<width>w.<ext>` (e.g. `poster.1280w.avif`).

The originals are kept (max compatibility) and the **variants are committed** — `.image-cache.json` (gitignored) stores per-source content hashes so the script is no-op when nothing changed.

**Adding a new image — the only correct workflow:**

1. Drop the source file (`.jpg` / `.jpeg` / `.png` / `.webp` / `.avif`) somewhere under `src/assets/`. Use a meaningful sub-folder per project. Don't include `640w` / `1280w` / `1920w` in the source's own filename — the script reserves those suffixes for generated variants.
2. If `pnpm dev` is running, the variants are generated automatically (the [scripts/vite-image-watch.ts](scripts/vite-image-watch.ts) plugin calls the same conversion function on `add` / `change` events and triggers HMR). Otherwise run `pnpm images` once.
3. Import the **original** in code (the variants are resolved at build-time, not imported by hand): `import myImage from '@/assets/foo/bar.jpg'`.
4. Render via the `<Picture>` component, never a raw `<img>` for asset images:

   ```tsx
   import { Picture } from '@/components/Picture'
   <Picture src={myImage} alt="…" sizes="(max-width: 768px) 100vw, 50vw" />
   ```

   The `sizes` attribute drives which width the browser picks — set it tight (the rendered width per breakpoint) to avoid downloading 1920w when the image only displays at 360px.

[src/components/Picture.tsx](src/components/Picture.tsx) reads two `import.meta.glob` maps (sources + variants) at module load, derives variant URLs by string manipulation, and emits `<picture><source type="image/avif"><source type="image/webp"><source type="image/jpeg"><img></picture>`. If a source has no generated variants (e.g. a base64 data URL from PDF rendering, or the script hasn't run yet), `<Picture>` falls back gracefully to a plain `<img>` — never throws.

`<Picture>` accepts `imgClassName` / `imgStyle` (applied to the inner `<img>`) and `pictureClassName` / `pictureStyle` (applied to the wrapping `<picture>`). The plain `className` / `style` props default to the inner `<img>` for drop-in replacement of existing `<img>` tags.

**Don't** add a raw `<img>` for any asset image — the variants exist precisely to be served, and skipping `<Picture>` defeats the pipeline. Raw `<img>` is fine only for non-asset sources (data URLs from PDF.js, generated SVGs, etc.).

### PDF rendering

`SlideViewer` and `FlipbookViewer` use `pdfjs-dist`. The worker is loaded via Vite's `?url` import: `import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'`, then `pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker`. Reproduce this pattern if adding another PDF surface — do not point at a CDN. PDFs themselves live in `public/documents/` and are referenced as absolute paths (e.g. `/documents/vice-versa.pdf`).

### SoundCloud track list

`src/components/TrackList.tsx` renders **hidden 1×1 iframes** off-screen and controls them via the SoundCloud Widget API (`SC.Widget`). The script `https://w.soundcloud.com/player/api.js` is injected lazily on first mount. The visible UI (play/pause, equalizer, progress bar, duration) is custom — do not replace it with a raw iframe embed. Track URLs in `src/data/music.ts` must keep `secret_token` for private tracks.

### Project modal + theming

`ProjectModal.tsx` reads from a `Project` (see `src/types/index.ts` for the full shape — `target` can be string or `TargetAudience` object, plus optional `tabletMockup`/`laptopMockup`/`phoneMockup`/`bookletMockup` flags that switch device frames in cards). All projects share a unified premium cream/gold style; there is no per-project theming layer (a previous `projectThemes.tsx` was removed — don't reintroduce it).

### Custom cursor

`Cursor.tsx` toggles `document.documentElement.classList.add('cursor-none-mode')`, which the `index.css` `@layer base` rule turns into `cursor: none !important` for the whole tree on `(hover: hover) and (pointer: fine)`. Touch devices skip the component entirely. Hover detection scans for `a, button, [role="button"], [data-cursor="hover"], input, label, summary, .group` — set `data-cursor="hover"` to opt arbitrary elements in.

### Welcome intro gating

`WelcomeIntro.tsx` is gated by `sessionStorage` key `portfolio-welcome-seen-v2`. **Bump the version suffix** when you change the intro, otherwise returning users won't see the new version.

### Italic gradient titles

Section headlines use `WebkitBackgroundClip: text` with an italic span — the trailing letter clips without padding. The repo convention is `className="italic inline-block"` + `style={{ paddingRight: '0.12em', ... }}`. Match this when adding new gradient italic headings.

## Conventions

- Always use `pnpm` (the lockfile and Dockerfile assume it via corepack).
- Section files own their layout, animations, and entry transitions. Cross-section visuals (cursor, thread, intro) live in `components/` and are mounted once in `Home.tsx`.
- New rich content (a project, a track, a milestone) goes in `src/data/*` against the existing types in `src/types/index.ts` — sections re-render automatically.
- New images go in `src/assets/<project>/`, are imported as ES modules, and are rendered via `<Picture>` — see the **Image pipeline** section above for the full workflow.
