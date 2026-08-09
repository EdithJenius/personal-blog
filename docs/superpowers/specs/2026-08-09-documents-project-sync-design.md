# Documents 项目同步与主页更新设计

## 目标

检查 2026 年 7 月 30 日以后 `Documents` 中形成的可交付成果，将适合公开的项目文件同步到 `EdithJenius/Codex_f`，并更新个人主页。新增的三个完整网页原型统一部署到现有 `personal-blog` GitHub Pages，保持一个入口和一套发布流程。

## 本次公开内容

### GitHub Pages 网页

| 项目 | 来源 | 部署路径 |
| --- | --- | --- |
| Aquamarine Triptych | `Web/.worktrees/aquamarine-cinematic` | `/personal-blog/aquamarine-triptych/` |
| 一滴山河 | `Web/.worktrees/one-drop-landscape-jewelry` | `/personal-blog/one-drop-landscape/` |
| 观山五行系列 | `find-skills/guanshan-five-showcase` | `/personal-blog/guanshan/` |

三个项目构建前必须适配 Vite 子路径。项目自有图片、视频和 CSS 背景统一基于 `import.meta.env.BASE_URL` 解析；需要客户端路由的页面必须保证入口路径可直接加载。生产产物分别复制到博客 `public` 下对应目录。

### Codex_f 项目更新

- `minipro`：上传 Python/Android 源码、文档、测试和必要构建配置；排除 `.android-tools`、`.venv`、Gradle 构建目录、缓存、本地数据库、`local.properties` 和 APK 历史包。
- `minimax-h3-lab`：上传 README、测试记录、提示词、素材索引和允许公开的商品参考图；不上传模型、虚拟环境或本地推理缓存。
- `update/obsidian-century-journal`：上传 README、模板、Bases 和必要 Obsidian 配置；排除 `workspace.json`、真实日记、私人附件和密钥。
- `xhs_mcpdev`：只上传新建的公开摘要；不上传账号级原始清单、manifest、临时访问参数或浏览器状态。
- `每周蒸馏`：同步 README 和 `2026-07-31_每周知识蒸馏.md`。
- 三个网页项目：同步可构建源码和公开媒体，排除 `node_modules`、测试截图、构建缓存及工作树元数据。

## 主页结构

现有“网页作品集”保留前五个项目，新增 Aquamarine Triptych、一滴山河和观山五行系列，合计八个可访问静态站。新项目使用真实生产页面截图，桌面端继续采用双列网格，移动端保持单列。

“近期项目更新”替换为本周五项成果：

1. Obsidian 百年日记。
2. 外贸独立站小红书研究公开摘要。
3. MiniMax H3 视频实验室。
4. 羽毛球抢场助手 v0.4.4。
5. 2026-07-31 每周知识蒸馏。

每项链接到 GitHub Pages 或 `Codex_f` 中对应的公开目录。旧项目仍保留在作品集、文章或项目档案中，不在“近期项目更新”重复出现。

## 发布流程

1. 对三个网页项目运行现有测试与生产构建。
2. 在本地博客预览中验证三个新站和八项作品集布局。
3. 对待上传文件执行敏感信息扫描和单文件大小检查。
4. 使用 GitHub Git Data API 在远端最新 `main` 上创建非强推提交，分别更新 `Codex_f` 与 `personal-blog`。
5. 等待 GitHub Pages Actions 成功，从公网验证主页、三条新路径、预览图和主要静态资源。

## 验收标准

- 三个新网页地址返回 200，首屏正文和可见媒体正常加载。
- 主页显示八个网页项目，桌面与移动端无横向溢出或内容遮挡。
- 五条近期更新链接有效，公开摘要不包含 `xsec_token`、Cookie、API Key 或账号级原始数据。
- `Codex_f` 不包含本地工具链、依赖目录、缓存、数据库、私人日记和历史 APK。
- 项目测试、博客生产构建及 GitHub Pages 部署全部成功。
