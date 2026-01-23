/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from "vuepress-theme-plume";

export default defineNavbarConfig([
  // { text: '首页', link: '/' },,
  { text: "文档", link: "/docs/" },
  { text: "博客", link: "/blogs/" },
  { text: "标签", link: "/blogs/tags/" },
  {
    text: "语法示例",
    items: [
      { text: "示例1", link: "/demos/markdown.md" },
      { text: "示例2", link: "/demos/markdown2.md" },
    ],
  },
]);
