---
title: Markdown2
createTime: 2026/01/23 10:55:51
permalink: /demos/h13hi541/
---

## 目录

```md
[[toc]]
```

[[toc]]

## 基础语法

### 标题

```md
# Heading 1

## Heading 2

### Heading 3
```

### 斜体

```md
_Italic_
```

_Italic_

### 加粗

```md
**Bold**
```

**Bold**

### 删除线

```md
~~This was mistaken text~~
```

~~This was mistaken text~~

### 上标

```md
Superscript<sup>This is a superscript text</sup>
```

Superscript<sup>This is a superscript text</sup>

### 下标

```md
Subscript<sub>This is a subscript text</sub>
```

Subscript<sub>This is a subscript text</sub>

### 链接

```md
[Github](https://github.com/)
```

[Github](https://github.com/)

### 水平线

```md
---
```

---

### 内联代码

```md
`Inline code` with backticks
```

`Inline code` with backticks

### Emoji

[Emoji](https://github.com/ikatyang/emoji-cheat-sheet)

```md
:tada: :smile_cat: :heartbeat: :see_no_evil:
```

:tada: :smile_cat: :heartbeat: :see_no_evil:

### 图片

```md
![public](/images/logo.png)

![相对路径](../assets/logo.png)
```

![图片](../assets/logo.png)

### 引用

#### 默认

```md
> Blockquote
```

> Blockquote

#### Tip

```md
::: tip
This is a tip.
:::
```

::: tip
This is a tip.
:::

#### Warning

```md
::: warning
This is a warning.
:::
```

::: warning
This is a warning.
:::

#### Warning

```md
::: danger
This is a danger.
:::
```

::: danger
This is a danger.
:::

## 列表

### 无序列表

```md
- One
- Two
- Three
```

- One
- Two
- Three

### 有序列表

```md
1. One
2. Two
3. Three
```

1. One
2. Two
3. Three

## 表格

```md
| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| git status   |   git status   |    git status |
| git diff     |    git diff    |      git diff |

| Command      | Description                                        |
| ------------ | -------------------------------------------------- |
| `git status` | List all _new or modified_ files                   |
| `git diff`   | Show file differences that **haven't been** staged |

| Name     | Character |
| -------- | --------- |
| Backtick | `         |
| Pipe     | \|        |
```

| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| git status   |   git status   |    git status |
| git diff     |    git diff    |      git diff |

| Command      | Description                                        |
| ------------ | -------------------------------------------------- |
| `git status` | List all _new or modified_ files                   |
| `git diff`   | Show file differences that **haven't been** staged |

| Name     | Character |
| -------- | --------- |
| Backtick | `         |
| Pipe     | \|        |

## 代码

```ts{1,6-8}
import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: '你好， VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```
