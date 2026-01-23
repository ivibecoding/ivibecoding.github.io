---
title: Flex 下的基本对齐
createTime: 2026/01/23 11:49:22
---

```ts
<!-- 撑满屏幕高度 min-h-screen -->
<main class="flex flex-col w-full h-full min-h-screen">
	<!-- 垂直居上 items-start 垂直居中 items-center 垂直居下 items-end-->
	<!-- 水平居左 justify-start  水平居右 justify-end 水平居中 justify-center 两端对齐 justify-between justify-around  justify-evenly-->
	<div class="flex items-center justify-between bg-blue-200 h-12 ">
		<div class="flex">
			<h1>Logo</h1>
			<h1>Title</h1>
		</div>
		<h1>Center</h1>
		<div class="flex">
			<h1>Btn1</h1>
			<h1>Btn2</h1>
		</div>
	</div>
	<!-- flex-1 撑满剩余空间 -->
	<div class="flex-1 flex justify-between bg-red-200">
		<div class="w-80 bg-yellow-200">Left</div>
		<div>Center</div>
		<div class="w-80 bg-yellow-200">Right</div>
	</div>
	<div class="flex items-center justify-center bg-green-200 h-12">
		<p>Description</p>
	</div>
</main>

```
![Image](./assets/FlexLayout.jpg)

## 参考资料
- [30 分钟学会 Flex 布局](https://zhuanlan.zhihu.com/p/25303493)