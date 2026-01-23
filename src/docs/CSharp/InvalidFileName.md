---
title: Win10 aux,com1~com9,prn,con,nul文件命名无效
createTime: 2026/01/23 14:23:18
---

在Windows系统中，以Win10为例，有时会发现将一些文件进行重命名的时候会出现“指定的设备名无效”的情况

## 原因
因为这些关键词是 Windows 操作系统定义的设备名称，是保留关键字，不允许使用。

![图片](./assets/InvalidFileName01.jpg)


## 解决方法
- 不使用保留关键字命名
- 目前发现，Win11上支持com1~com9