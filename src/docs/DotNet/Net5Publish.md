---
title: VS2019 基于.NET5 单文件打包
createTime: 2026/01/23 14:24:15
---

## .NET5 环境 下载

- [下载适用于 Visual Studio 的 .NET SDK](https://dotnet.microsoft.com/zh-cn/download/visual-studio-sdks?utm_source=getdotnetsdk&utm_medium=referral)

This release is only compatible with Visual Studio 2019 (v16.8).

## .NET5 单文件发布

- [Single-file Publish](https://github.com/dotnet/designs/blob/main/accepted/2020/single-file/design.md)

> 对比 .net core 3.1 单文件发布 .net 5 发布单文件需要将 IncludeNativeLibrariesForSelfExtract 设置为 True，否则发布的文件会多 4 个文件（coreclr.dll，clrjit.dll，clrcompression.dll， mscordaccore.dll）

![IMAGE](./assets/Net5Publish01.png)
