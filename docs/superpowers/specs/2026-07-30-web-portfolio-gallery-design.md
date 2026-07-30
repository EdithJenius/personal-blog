# 网页作品集主页设计

## 目标

在个人主页首屏之后加入可视化网页作品集，让访客直接看到并进入五个已经部署到 GitHub Pages 的静态站点。

## 设计读取

这是面向项目访客的个人作品集升级，保留现有编辑型浅色视觉语言。设计参数为视觉变化 7、动效 3、信息密度 4。继续使用现有 Astro 与原生 CSS，不引入新的组件库。

## 作品与地址

| 作品 | GitHub Pages 地址 |
| --- | --- |
| 栖木家居 QIMU HOME | `/personal-blog/qimu-home/` |
| PAWFORM | `/personal-blog/pawform/` |
| AUREN OBJECTS | `/personal-blog/auren-objects/` |
| NOVA TURN | `/personal-blog/nova-turn/` |
| Nourish Fresh | `/personal-blog/nourish-fresh/` |

## 视觉结构

合集位于主题导航与“正在研究与实践”之间。五个作品使用五张真实页面截图，组成一个非对称网格：QIMU 占据首行宽幅主位，PAWFORM 与 AUREN 并排，NOVA TURN 与 Nourish Fresh 并排。每个作品包含项目名称、类别、简短说明和“打开网站”动作。

截图保持固定宽高比，图片区域在悬停时仅做轻微缩放，文字与边框不移动。移动端严格改为单列，保持项目顺序与可读性。所有图片提供准确替代文本，并保留键盘焦点状态与 reduced-motion 降级。

## 内容整理

原“近期项目更新”区移除五个网站条目，只保留知识迭代引擎、选品 Agent、JARVIS 和 MotionSites，编号重新排列。这样网页作品与持续更新内容不重复。

## 静态部署兼容

PAWFORM、AUREN OBJECTS、NOVA TURN 与 Nourish Fresh 使用 React Router。四个站点统一使用 Vite 的 `BASE_URL` 作为路由 `basename`，项目自有的图片、视频、海报和 CSS 背景也通过相同前缀解析。构建时分别传入最终的 `/personal-blog/<project>/` 子路径，再将产物放入博客的 `public` 目录。

## 验证

个人博客必须构建成功。生成首页必须包含五个作品链接和五张预览图。桌面与移动端截图必须确认无文字遮挡、无布局溢出，五个 GitHub Pages 地址及其主要静态资源必须返回成功。
