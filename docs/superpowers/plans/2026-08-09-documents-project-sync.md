# Documents Project Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish three new static websites, synchronize the public-safe Documents project updates to `Codex_f`, and refresh the personal homepage with eight web projects and five current updates.

**Architecture:** Each Vite website remains independently buildable and receives a small `BASE_URL` compatibility layer before its production output is copied into `personal-blog/public/<slug>`. The homepage consumes local screenshots and fixed public links. GitHub publishing uses allowlisted Git Data API tree entries based on each repository's latest remote `main`, with no force updates.

**Tech Stack:** React, TypeScript, Vite, Astro, Vitest, Playwright, GitHub Git Data API, GitHub Pages.

## Global Constraints

- Deploy paths are `/personal-blog/aquamarine-triptych/`, `/personal-blog/one-drop-landscape/`, and `/personal-blog/guanshan/`.
- Do not publish credentials, `xsec_token`, cookies, account-level research manifests, private diary content, local databases, Android toolchains, dependency folders, caches, or historical APK files.
- Preserve the existing five GitHub Pages sites and the JARVIS connection screen behavior.
- All GitHub ref updates use `force: false` and start from the latest remote `main`.
- New gallery images must be real production-page screenshots.

---

### Task 1: Make the three websites GitHub Pages compatible

**Files:**
- Modify: `/Users/liweijia/Documents/Web/.worktrees/aquamarine-cinematic/src/app/routes.ts`
- Modify: `/Users/liweijia/Documents/Web/.worktrees/aquamarine-cinematic/src/App.tsx`
- Create: `/Users/liweijia/Documents/Web/.worktrees/aquamarine-cinematic/src/shared/assetUrl.ts`
- Modify: `/Users/liweijia/Documents/Web/.worktrees/aquamarine-cinematic/src/content/media.ts`
- Modify: `/Users/liweijia/Documents/Web/.worktrees/aquamarine-cinematic/src/atelier/aquamarine-bracelet/product.ts`
- Modify: `/Users/liweijia/Documents/Web/.worktrees/one-drop-landscape-jewelry/src/main.tsx`
- Create: `/Users/liweijia/Documents/Web/.worktrees/one-drop-landscape-jewelry/src/assetUrl.ts`
- Modify: `/Users/liweijia/Documents/Web/.worktrees/one-drop-landscape-jewelry/src/data/media.ts`
- Create: `/Users/liweijia/Documents/find-skills/guanshan-five-showcase/src/assetUrl.ts`
- Modify: `/Users/liweijia/Documents/find-skills/guanshan-five-showcase/src/products.ts`
- Modify: `/Users/liweijia/Documents/find-skills/guanshan-five-showcase/src/components/CinematicHero.tsx`
- Modify: `/Users/liweijia/Documents/find-skills/guanshan-five-showcase/src/styles.css`

**Interfaces:**
- Consumes: Vite `import.meta.env.BASE_URL`.
- Produces: `assetUrl(path: string): string` and base-aware routes/media paths.

- [ ] **Step 1: Add failing route and asset tests**

Add assertions that a base `/personal-blog/<slug>/` resolves owned media below that prefix and that Aquamarine strips its deployment base before calling `resolveRoute`.

```ts
expect(assetUrl('/media/example.jpg')).toBe('/personal-blog/example/media/example.jpg')
expect(stripBasePath('/personal-blog/aquamarine-triptych/ice-awakening', '/personal-blog/aquamarine-triptych/')).toBe('/ice-awakening')
```

- [ ] **Step 2: Run tests and confirm the new assertions fail**

Run each existing Vitest command with `--run`. Expected: only the new base-path assertions fail.

- [ ] **Step 3: Implement one base helper per independent project**

Use the same normalization behavior without cross-worktree imports:

```ts
export const assetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
```

Aquamarine route navigation prefixes `import.meta.env.BASE_URL`; its route reader removes that prefix. One Drop sets `basename={import.meta.env.BASE_URL}` on `BrowserRouter`. Guanshan remains a single page and only resolves media against `BASE_URL`; its CSS fallback image is provided through a custom property set by React.

- [ ] **Step 4: Run all three test suites**

Expected: every existing and new unit test passes.

- [ ] **Step 5: Build with final bases**

```bash
npm run build -- --base /personal-blog/aquamarine-triptych/
npm run build -- --base /personal-blog/one-drop-landscape/
npm run build -- --base /personal-blog/guanshan/
```

Expected: three successful `dist` directories with no root-relative project media references.

### Task 2: Install production outputs and create previews

**Files:**
- Create: `/Users/liweijia/Documents/personal-blog/public/aquamarine-triptych/**`
- Create: `/Users/liweijia/Documents/personal-blog/public/one-drop-landscape/**`
- Create: `/Users/liweijia/Documents/personal-blog/public/guanshan/**`
- Create: `/Users/liweijia/Documents/personal-blog/public/images/web-portfolio/aquamarine-triptych.jpg`
- Create: `/Users/liweijia/Documents/personal-blog/public/images/web-portfolio/one-drop-landscape.jpg`
- Create: `/Users/liweijia/Documents/personal-blog/public/images/web-portfolio/guanshan.jpg`

**Interfaces:**
- Consumes: Task 1 production builds.
- Produces: three deployable subdirectories and three `1440x960` JPEG previews.

- [ ] **Step 1: Replace only the three target public directories**

Delete stale versions of the three target directories if present, then copy each verified `dist` directory. Do not alter the five existing project directories.

- [ ] **Step 2: Serve the Astro production build locally**

Run `npm run build` and `npm run preview -- --host 127.0.0.1 --port 4322`.

- [ ] **Step 3: Capture and inspect real screenshots**

Use Chrome at `1440x960`, open each final subpath, wait for visible media, assert no failed image, then save the first viewport as its gallery JPEG.

- [ ] **Step 4: Verify site interactions**

Aquamarine must open all three theme routes; One Drop must render product scenes; Guanshan must switch products and open its local cart. Expected: no console errors or HTTP 4xx responses.

### Task 3: Prepare public-safe Codex_f updates

**Files:**
- Create: `/Users/liweijia/Documents/xhs_mcpdev/research-data/2026-08-09_外贸独立站公开摘要.md`
- Publish allowlisted files from `minipro`, `minimax-h3-lab`, `update/obsidian-century-journal`, `每周蒸馏`, and the three website sources.

**Interfaces:**
- Consumes: local project files and the design allowlist.
- Produces: a Git Data API tree entry list containing only public-safe files.

- [ ] **Step 1: Write the sanitized XHS summary**

Include sample size, median engagement, two growth patterns, recommended content structure, and limitations. Do not include source URLs, author IDs, query strings, or raw manifests.

- [ ] **Step 2: Build the upload allowlist**

Use tracked/source files and explicit inclusion roots. Reject any path matching `.env`, `workspace.json`, `local.properties`, database extensions, `.android-tools`, `.venv`, `node_modules`, build/cache folders, APK files, or raw XHS research directories.

- [ ] **Step 3: Scan allowlisted content**

Run `rg` for `xsec_token`, cookies, common API-key prefixes, private-key headers, and assignment-style secret names. Expected: zero findings outside `.env.example` placeholders.

- [ ] **Step 4: Run project checks**

Run `minipro` unit tests and any documented lightweight validation for the other selected projects. Record failures instead of uploading broken source silently.

### Task 4: Refresh the personal homepage

**Files:**
- Modify: `/Users/liweijia/Documents/personal-blog/src/pages/index.astro`

**Interfaces:**
- Consumes: three final project URLs, three preview JPEGs, and five Codex_f public paths.
- Produces: eight-item `webProjects` gallery and five current-update rows.

- [ ] **Step 1: Add three gallery data records**

Add Aquamarine Triptych, 一滴山河, and 观山五行系列 after the existing five items. Each record includes title, category, concise description, final Pages URL, preview image, accurate alt text, and `featured: false`.

- [ ] **Step 2: Replace the stale current-build rows**

Render Obsidian 百年日记, 外贸独立站研究公开摘要, MiniMax H3 Lab, 羽毛球抢场助手 v0.4.4, and 2026-07-31 每周知识蒸馏. Link each row to its final public GitHub directory or the knowledge-engine page.

- [ ] **Step 3: Update gallery and project counts**

Change the portfolio lead to eight deployed sites and the hero proof count to match the public project total selected during implementation.

- [ ] **Step 4: Build and inspect desktop/mobile layouts**

Run `npm run build`. In Chrome verify `1440x1000` and `390x844`: eight gallery items, two desktop columns, one mobile column, no overlap, no horizontal overflow, and all lazy images load after scrolling.

### Task 5: Publish and verify both repositories

**Files:**
- Commit the personal-blog source, screenshots, docs, and generated site directories.
- Publish the Task 3 allowlist to `EdithJenius/Codex_f`.

**Interfaces:**
- Consumes: verified local artifacts and latest remote refs.
- Produces: non-force commits on both repositories and deployed GitHub Pages.

- [ ] **Step 1: Commit the local blog changes intentionally**

Stage only the files from Tasks 1-4 that belong to `personal-blog`; do not stage unrelated worktree changes.

- [ ] **Step 2: Publish Codex_f by Git Data API**

Create blobs for allowlisted files, create a tree based on current remote `main`, create a commit with that parent, and update the ref using `force: false`.

- [ ] **Step 3: Publish personal-blog by Git Data API**

Upload every required file for the three static sites plus homepage source, previews and docs. Base the tree on current remote `main` and update without force.

- [ ] **Step 4: Wait for GitHub Pages Actions**

Expected: build and deploy jobs conclude `success` for the final personal-blog commit.

- [ ] **Step 5: Verify the public result**

Use a real browser to check the homepage and all eight project URLs. Expected: HTTP 200, correct identifying text, loaded visible media, five current updates, and no horizontal overflow on desktop or mobile.
