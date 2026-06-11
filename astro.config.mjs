import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://edithjenius.github.io",
  base: "/personal-blog",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
