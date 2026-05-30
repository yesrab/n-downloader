# n-downloader Project Architecture

Reference document for agents continuing work on this codebase. Captures architectural decisions and the reasoning behind them. Pair this with `stylePhilosophy.md` (visual / UX rules) and `CLAUDE.md` (entry point).

## Product Shape

One codebase ships two surfaces:

- **Landing page** — public marketing + install command. Deployed to Vercel.
- **Downloader app** — local control room (dashboard / queue / torrents / settings). Distributed as a Docker image for consumers to self-host.

The two surfaces are selected at **build time** via the `APP_MODE` environment variable so consumer Docker images stay lean (no landing-page code shipped to the device, and vice versa).

## Stack

- TanStack Start (Vite + React 19 + TanStack Router) — currently 1.168.17.
- TanStack Start is **no longer on Nitro**. It uses Vite environments + `srvx` and exposes a Web Fetch handler as the default export from `dist/server/server.js` (`{ fetch }`).
- shadcn/ui with CSS variables enabled. Theme tokens live in `src/styles.css`.
- JetBrains Mono variable font (`@fontsource-variable/jetbrains-mono`).
- Tailwind v4 via `@tailwindcss/vite`.

## Route Layout

Routes are **directory-based**, not flat dot-notation. Migrated from flat → directory via `git mv` to preserve history. URLs did not change because `createFileRoute` IDs already used `/` separators.

Pathless route groups split the two app surfaces:

```
src/routes/
├── __root.tsx
├── (home)/              # landing page surface
│   └── index.tsx        # "/"
└── (app)/               # downloader surface
    ├── index.tsx        # "/" — redirects to /queue
    ├── downloads/
    │   ├── route.tsx
    │   ├── extraction.tsx
    │   ├── host-accounts.tsx
    │   └── link-grabber.tsx
    ├── queue/
    │   └── ...
    ├── torrents/
    │   └── ...
    ├── settings/
    │   └── ...
    └── history.tsx
```

`routeTree.gen.ts` is **gitignored** because it differs per `APP_MODE` build. The file's size (~510 lines) is intrinsic to per-route codegen — not a flat-vs-directory artifact.

## Build-Time Split Mechanism

`vite.config.ts` reads `APP_MODE` and tells the TanStack Router plugin to ignore the inactive group via `routeFileIgnorePattern`:

```ts
const APP_MODE = (process.env.APP_MODE ?? "downloader") as AppMode
const routeFileIgnorePattern =
  APP_MODE === "landing" ? "\\(app\\)" : "\\(home\\)"

tanstackStart({ router: { routeFileIgnorePattern } })
```

`APP_MODE` is also exposed to client code as `import.meta.env.APP_MODE` via `define`. Inactive group files exist on disk but are excluded from codegen and tree-shaken out of the bundle.

## Dev / Build Scripts

```jsonc
{
  "dev": "APP_MODE=downloader vite dev --port 3000",       // default
  "dev:landing":    "APP_MODE=landing vite dev --port 3000",
  "dev:downloader": "APP_MODE=downloader vite dev --port 3000",
  "build":           "APP_MODE=downloader vite build",     // default
  "build:landing":   "APP_MODE=landing vite build",
  "build:downloader":"APP_MODE=downloader vite build",
  "typecheck":            "pnpm typecheck:landing && pnpm typecheck:downloader",
  "typecheck:landing":    "APP_MODE=landing vite build && tsc --noEmit -p tsconfig.landing.json",
  "typecheck:downloader": "APP_MODE=downloader vite build && tsc --noEmit -p tsconfig.downloader.json"
}
```

`pnpm dev` defaults to the downloader because that is the primary product. Switch to landing with `pnpm dev:landing`.

## Type Checking Per Mode

The generated `routeTree.gen.ts` only contains the active group's routes, but the inactive group's source files still exist on disk. Without exclusion, TS errors like:

> `createFileRoute("/(app)/settings")` argument `not assignable to parameter of type '"/(home)/"'`

Fix: per-mode tsconfigs that `extend` the base and `exclude` the inactive group.

- `tsconfig.landing.json` → `exclude: ["src/routes/(app)/**"]`
- `tsconfig.downloader.json` → `exclude: ["src/routes/(home)/**"]`

The `typecheck` script runs both in sequence so neither mode regresses.

## Vercel Deploy (Landing)

`vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "pnpm build:landing",
  "outputDirectory": "dist/client",
  "framework": null,
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }]
}
```

Filesystem is resolved before rewrites, so static assets under `dist/client/` serve directly and only dynamic routes hit the function.

### `api/index.js` — Node-to-Web Adapter

Vercel's Node runtime invokes the function with `(IncomingMessage, ServerResponse)`, not a Web `Request`. TanStack Start's bundled fetch handler tries `new URL(req.url)` which crashes because `req.url` is just `/` (path-only).

The adapter at `api/index.js`:

1. Reconstructs an absolute URL: `${x-forwarded-proto || "https"}://${x-forwarded-host || host}${req.url}`.
2. Copies `req.headers` into a Web `Headers` object (handling array values).
3. Builds a Web `Request` with `duplex: "half"` so streamed bodies work on non-GET/HEAD.
4. Awaits `server.fetch(request)`.
5. Streams the `Response` body back to `res` (status, headers, then `getReader()` loop).

If TanStack ever ships an official Vercel preset, this shim becomes deletable.

## Docker Deploy (Downloader) — Deferred

The downloader image work is **deferred** at user request ("no need node server for now"). When picked back up, plan is:

- `APP_MODE=downloader pnpm build` produces `dist/`.
- A small Node entry (`server.js` style) imports `dist/server/server.js`'s `fetch` and serves it via `srvx` or `node:http`.
- Dockerfile uses a small Node base image, copies `dist/`, exposes the listener.
- No landing-page code is in this image (`routeFileIgnorePattern` excludes `(home)` from codegen).

## Conventions / Code Layout

- App-owned route files live inside pathless groups `routes/(home)` and `routes/(app)`.
- App-owned components grouped by responsibility: `components/layout`, `components/navigation`, `components/screens`.
- Do not hand-edit `components/ui` — it is shadcn-managed. Theme through semantic CSS variables and wrapper classes.
- Breadcrumbs are generated from the current route path; no manual breadcrumb maps.

## Known Gotchas

- **`routeTree.gen.ts` is gitignored** — different per `APP_MODE`. Run `pnpm build` (or any of the per-mode builds) to regenerate. The TanStack Router plugin handles codegen during Vite startup, so dev mode also regenerates it.
- **`tsr generate` CLI is not installed** — codegen happens through the Vite plugin. Use `pnpm build` (or `pnpm dev`) to regenerate.
- **Typecheck requires both per-mode configs to pass** — adding a new route in one group does not break the other automatically; both modes must compile cleanly.
- **Vercel rewrite catch-all (`/(.*)` → `/api`)** — keep filesystem priority in mind. If you add `dist/client/foo.html`, it serves directly without hitting the function.

## File Index

| Path | Purpose |
|------|---------|
| `vite.config.ts` | Reads `APP_MODE`, sets `routeFileIgnorePattern`, exposes `import.meta.env.APP_MODE` |
| `vercel.json` | Vercel build + output + rewrite config (landing mode) |
| `api/index.js` | Node `(req, res)` ↔ Web `Request`/`Response` adapter for Vercel |
| `tsconfig.landing.json` | Excludes `src/routes/(app)/**` |
| `tsconfig.downloader.json` | Excludes `src/routes/(home)/**` |
| `src/routes/(home)/index.tsx` | Landing page `/` |
| `src/routes/(app)/index.tsx` | Downloader `/` → redirects to `/queue` |
| `stylePhilosophy.md` | Visual / UX rules (Teenage Engineering inspired, JetBrains Mono, hard borders, signal palette) |
