import { defineUserConfig } from "vuepress";
import { palettePlugin } from "@vuepress/plugin-palette";
import { searchPlugin } from "@vuepress/plugin-search";
import { viteBundler } from "@vuepress/bundler-vite";
import { localTheme } from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Vibe Coding",
  description: "代码分享",
  head: [["link", { rel: "icon", href: "/images/logo.png" }]],
  pagePatterns: ["**/*.md", "!**/README.md", "!.vuepress", "!node_modules"],
  bundler: viteBundler(),

  plugins: [
    palettePlugin({
      preset: "sass",
    }),

    searchPlugin({
      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
    }),
  ],

  theme: localTheme({
    logo: "/images/logo.png",
    repo: "https://github.com/ivibeCoding/ivibeCoding.github.io",
    repoLabel: "GitHub",

    editLink: false,
    lastUpdated: false,
    contributors: true,

    navbar: [
      { text: ".NET", link: "/code/dotnet/" },
      { text: "WEB", link: "/code/web/" },
      { text: "Database", link: "/code/database/" },
      { text: "Other", link: "/code/other/" },
    ],

    sidebar: {
      "/code/web/": [
        {
          text: "Html",
          children: [
            "html/FlexLayout/index.md"],
        },
        {
          text: "Css",
          children: [
            "css/TransformVsPosition/index.md",
            "css/网站变灰/index.md",
          ],
        },
        {
          text: "TypeScript or JavaScript",
          children: [
            "ts/NullVsUndefined/index.md",
            "ts/TsNote/index.md",
            "ts/UrlToFile/index.md",
            "ts/InTheLoop/index.md",
            "ts/js与ts中各种循环遍历方式/index.md",
            "ts/10个Javascript技巧和最佳实践/index.md",
          ],
        },
        {
          text: "Vue",
          children: [
            "vue/vue3的语法糖/index.md",
            "vue/vue3基础语法使用/index.md",
          ],
        },
        {
          text: "Other",
          children: [
            "other/pnpm/index.md",
            "other/uniapp/index.md",
            "other/github的其它知识/index.md",
          ],
        },
      ],

      "/code/dotnet/": [
        {
          text: "WPF",
          children: [
            "WpfUILayout/index.md",
            "XAMLBinding/index.md",
            "Language/index.md",
          ],
        },
      ],

      "/code/database/": [
        {
          text: "MySQL",
          children: ["OptimizationMySQL/index.md"],
        },
      ],
    },
  }),
});
