---
title: 代码模拟鼠标、键盘进行操作
createTime: 2026/01/23 14:25:29
---

https://github.com/taojy123/KeymouseGo
https://github.com/michaelnoonan/inputsimulator
https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-keybd_event
![图片](./assets/KeyMouseSimulation01.png)

使用 win32API mouse_event keybd_event SetCursorPos 已实现，用 SendInput 代替模拟一下，没有相应效果
![图片](./assets/KeyMouseSimulation02.png)
