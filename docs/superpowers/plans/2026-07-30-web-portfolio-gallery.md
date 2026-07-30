# 网页作品集主页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在个人主页加入五个静态网站的真实截图作品集，并保持每个项目在独立 GitHub Pages 地址运行。

**Architecture:** Astro 首页定义五个作品数据并渲染非对称原生 CSS Grid。预览图来自已上线站点的真实桌面截图，保存在 `public/images/web-portfolio/`；原近期更新列表移除重复网站条目。

**Tech Stack:** Astro、原生 CSS、Playwright、GitHub API、GitHub Pages。

## Global Constraints

- 五个作品必须使用独立的 `/personal-blog/<slug>/` 静态地址。
- 必须使用真实网页截图，不使用生成式占位图或假界面。
- 桌面端使用一宽四窄的五格非对称网格，移动端为单列。
- 不新增前端依赖。
- 动效仅使用 `transform`，并遵守 `prefers-reduced-motion`。

---

### Task 1: 建立失败断言并采集真实预览图

**Files:**
- Create: `public/images/web-portfolio/qimu-home.jpg`
- Create: `public/images/web-portfolio/pawform.jpg`
- Create: `public/images/web-portfolio/auren-objects.jpg`
- Create: `public/images/web-portfolio/nova-turn.jpg`
- Create: `public/images/web-portfolio/nourish-fresh.jpg`

**Interfaces:**
- Consumes: 五个线上 GitHub Pages URL。
- Produces: 五张 1440 x 960 的真实页面预览图。

- [ ] **Step 1: 运行失败断言**

```bash
cd /Users/liweijia/Documents/personal-blog
npm run build
rg -n 'web-portfolio|网页作品集' dist/index.html
```

Expected: `rg` exits 1 because the gallery is absent.

- [ ] **Step 2: 捕获五个站点截图**

Use Playwright at viewport `1440x960`, wait for network idle, then capture the first viewport of each deployed site to the exact five JPG paths above.

- [ ] **Step 3: 验证截图尺寸与文件**

```bash
sips -g pixelWidth -g pixelHeight public/images/web-portfolio/*.jpg
```

Expected: five readable images, each 1440 x 960.

### Task 2: 修复子站 GitHub Pages 子路径兼容

**Files:**
- Modify: PAWFORM, AUREN OBJECTS, NOVA TURN, and Nourish Fresh router and asset source files.

**Interfaces:**
- Consumes: Vite `import.meta.env.BASE_URL`.
- Produces: 在 `/personal-blog/<project>/` 下可直接访问和刷新路由的四个 React 静态站。

- [ ] **Step 1: 给 BrowserRouter 设置部署前缀**

Use `basename={import.meta.env.BASE_URL}` in all four React sites.

- [ ] **Step 2: 让本地资源跟随 BASE_URL**

Resolve project-owned image, video, poster, and background URLs through `BASE_URL`. Keep external media URLs unchanged.

- [ ] **Step 3: 测试并按子路径构建**

Run each project's test suite and build it with its final GitHub Pages base path.

- [ ] **Step 4: 替换博客内的静态站文件**

Replace `public/pawform`, `public/auren-objects`, `public/nova-turn`, and `public/nourish-fresh` with their verified production builds.

### Task 3: 实现首页作品集

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: 五个作品 URL 与五张预览图。
- Produces: `#web-portfolio` 作品集区和精简后的近期更新列表。

- [ ] **Step 1: 添加作品数据**

Define a `webProjects` array containing `title`, `category`, `description`, `href`, `image`, and `featured` for all five websites.

- [ ] **Step 2: 渲染作品集与精简更新列表**

Insert `#web-portfolio` after `.topic-strip`. Render five linked `<article>` elements with real `<img>` elements, project metadata and an “打开网站” action. Remove the five duplicate website articles from `.current-builds` and renumber the remaining four items.

- [ ] **Step 3: 添加响应式样式**

Use a two-column grid at desktop, make QIMU span both columns, keep stable image aspect ratios, and collapse to one column below 820px. Add visible focus styles, hover image scaling, and a reduced-motion override.

- [ ] **Step 4: 验证构建输出**

```bash
cd /Users/liweijia/Documents/personal-blog
npm run build
rg -n 'web-portfolio|网页作品集|qimu-home|pawform|auren-objects|nova-turn|nourish-fresh' dist/index.html
```

Expected: build exits 0 and all gallery identifiers appear.

### Task 4: 视觉验收与发布

**Files:**
- Modify: `src/pages/index.astro`
- Create: `public/images/web-portfolio/*.jpg`
- Create: `docs/superpowers/specs/2026-07-30-web-portfolio-gallery-design.md`
- Create: `docs/superpowers/plans/2026-07-30-web-portfolio-gallery.md`

**Interfaces:**
- Consumes: 本地 Astro production build。
- Produces: 更新后的 `EdithJenius/personal-blog` GitHub Pages。

- [ ] **Step 1: 桌面和移动端视觉检查**

Serve the production build locally. Capture homepage screenshots at 1440 x 1000 and 390 x 844. Confirm all five previews render, no content overlaps, headings fit, and mobile cards use one column.

- [ ] **Step 2: 提交本地变更**

```bash
git add src/pages/index.astro public/images/web-portfolio docs/superpowers
git commit -m "Add visual web portfolio gallery"
```

- [ ] **Step 3: 发布远端 main**

Create blobs for the committed gallery files, create a tree based on the latest remote `main`, create a non-force commit, then update `refs/heads/main` with `force: false`.

- [ ] **Step 4: 验证线上页面与项目地址**

Confirm the homepage contains `#web-portfolio`, each preview image returns 200, and all five static project URLs return 200.
