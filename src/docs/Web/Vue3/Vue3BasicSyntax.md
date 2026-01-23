---
title: vue3基础语法使用
createTime: 2026/01/23 12:35:12
---

### vue.js 是什么

vue 是一套用于构建用户界面的渐进式框架，与其它大型框架不同的是，vue 被设计为可自底向上逐层使用。vue 只关心视图层，不仅容易上手，还方便第三方库或即有项目整合。

### 使用 vue 的三种方式

- 使用 cdn

```js
<script src="https://unpkg.com/vue@next"></script>
```

- 使用 Vite 脚手架模板

```js
npm init vite-app hello-vue3 # OR yarn create vite-app hello-vue3
vue-cli
npm install -g @vue/cli # OR yarn global add @vue/cli
vue create hello-vue3

# select vue 3 preset
```

### vue3 中的新特性

- 组合式 API
- Teleport
- 片段
- 触发组件选项
- createRenderer API 来自 @vue/runtime-core 创建自定义渲染器
- 单文件组件组合式 API 语法糖 `<script setup> `实验性
- 单文件组件状态驱动的 CSS 变量 `<style vars> `实验性
- 单文件组件 `<style scoped>` 现在可以包含全局规则或只针对插槽内容的规则

## 模板指令

- 组件上 v-model 用法已更改
- `<template v-for>` 和非 v-for 节点上 key 用法已更改
  在同一元素上使用的 v-if 和 v-for 优先级更改(以前版本是 v-for 优先)
- v-bind="object"现在排序敏感
- v-for 中的 ref 不再注册 ref 数组

## 组建

- 只能使用普通函数创建功能组建
- functional 属性在单文件组建(SFC)`<template>`和 functional 组建选项被抛弃
- 一部组建现在需要 defineAsyncComponent 方法来创建

## 渲染函数

- 渲染函数 API 改变
- $scopedSlots property已删除，所有插槽都通过$slots 作为函数暴露
- 自定义指定 API 已更改为组建生命周期一致
- 一些转换 class 被重命名了:
  v-enter -> v-enter-from
  v-leave -> v-leave-from
- 组建 watch 选项和实例方法$watch 不再支持点分割字符串路径，请改为计算函数作为参数
- 在 Vue 2.x 中，应用根容器的 outerHTML 将替换为根组件模板 (如果根组件没有模板/渲染选项，则最终编译为模板)。VUE3.x 现在使用应用程序容器的 innerHTML。

## 其他小变化

- destroyed 生命周期选项被重命名为 unmounted
- beforeDestroy 生命周期选项被重命名为 beforeUnmount
- prop default 工厂函数不再有权访问 this 是上下文
- 自定义指令 API 已更改为与组件生命周期一致
- data 应始终声明为函数
- 来自 mixin 的 data 选项现在可简单地合并
- attribute 强制策略已更改
- 一些过渡 class 被重命名
- 组建 watch 选项和实例方法 $watch 不再支持以点分隔的字符串路径。请改用计算属性函数作为参数。`<template>` 没有特殊指令的标记 (v-if/else-if/else、v-for 或 v-slot) 现在被视为普通元素，并将生成原生的 `<`template> `元素，而不是渲染其内部内容。
- 在 Vue 2.x 中，应用根容器的 outerHTML 将替换为根组件模板 (如果根组件没有模板/渲染选项，则最终编译为模板)。Vue 3.x 现在使用应用容器的 innerHTML，这意味着容器本身不再被视为模板的一部分。

## 移除 API

- keyCode 支持作为 v-on 的修饰符
- $on，$off 和 $once 实例方法
- 过滤
- 内联模板 attribute
- $destroy 实例方法。用户不应再手动管理单个 Vue
- 组件的生命周期。
- 新增功能详解

## v-for 中的 Ref 数组

- vue2 中 v-for 中的 Ref 是给每一项动态添加 ref，例如 点击使指定元素变成红色

```js
// html
<button @click="test">点击我</button>

 <div :ref="'dd' + n" v-for="n in 10" class="dddd">{{n}}</div>

//js
test(){
    this.$refs.dd1.style.background="#FF0000"
}
```

需要注意的是 ref 将会是一个包含了对应数据源的这些子组件的数组
例如:[li,li,li]

在 vue3 中，这样的用法将不再$ref 中自动创建数组，(官方给出的解释是这种行为会变得不明确且效率低下)，所以 vue3 中需要从单个绑定获取多个 ref，请将 ref 绑定到一个更灵活的函数上。

```js
//html

<div v-for="item in list" :ref="setItemRef"></div>
// 结合选项式api
export default{
    data(){
        return {
            itemRefs:[]
        }
    },
    methods:{
        setItemRef(el) {
         this.itemRefs.push(el)
        }
    },
    beforeUpdate() {
    this.itemRefs = []
  },
   updated() {
    console.log(this.itemRefs)
  }
}

//组合式 api
import {ref,onBeforeUpdate,onUpdated} from 'vue'
export default{
setup(){
let itemRefs =[]; //这里不一定是数组
const setItemRef = el =>{
itemRefs.push(el)
}
onBeforeUpdate(()=>{
itemRefs.push(el)
})
onUpdated(() => {
console.log(itemRefs)
})
return {
itemRefs,
setItemRef
}
}
}
```

## 异步组件

defineAsyncComponent 显示的定义异步组件
component 选项重命名为 loader
Loader 函数本身不再接受 resolve，reject 参数，必须返回一个 promise 对象

```js
//2.0 版本写法
//第一种方法
const asyncPage = () => import("./NextPage.vue");

//第二种方法
const asyncPage = {
  component: () => import("./NextPage.vue"),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent,
};
```

//3.0 语法
现在，vue3 中 由于函数式组件被定义为纯函数，因此异步组件的定义需要通过将其包装在新的 defineAsyncComponent 来显示定义
[纯函数参照]

```js
import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// 不带选项的异步组件
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))

// 带选项的异步组件
const asyncPageWithOptions = defineAsyncComponent({
loader: () => import('./NextPage.vue'),
delay: 200,
timeout: 3000,
errorComponent: ErrorComponent,
loadingComponent: LoadingComponent
})
相对于 x.x 所做的更改 component 被重新命名为 loader，用来更准确的传达不能直接提供组件定义的信息。

loader 函数不接受 resolve 和 reject 参数，必须始终返回 promise

//vue2
const oldAsyncComponent = (resolve,reject)=>{
...
}

//3.0
const asyncComponent = defineAsyncComponent(()=>{
new Promise(resolve,reject)=>{
...
}
})
```

attribute 强制行为
将 attribute 视为普通的布尔值，删除枚举
如果是布尔值，不在删除 sttribut false，相反他会被设置 attr=“false” 移除 attribute 使用 null 或者 undefined
自定义指令
自定义指令将由子组件通过 v-bind="$attrs"
vue2 中

自定义指令是通过使用下面列出的勾子来创建的，这些勾子时可选择的

bind 指令绑定到元素后发生。只发生一次
inserted 元素插入父 DOM 后发生
update 当元素更新，一旦子元素尚未更新时，将调用此勾子
componentUpdated 一旦组件和子集被更新，就会调用此勾子
unbind 一旦指令被移除，就会调用也只调用一次也只调用一次

```js
//html
<p v-hightlight="yellow">高亮显示此文本黄色</p>;

//js
Vue.directive("highlight", {
  bind(el, binding, vnode) {
    el.style.background = binding.value;
  },
});
```

vue3 中

自定义了指令创建了 api

bind => beforeMount
inserted => mounted
beforeUpdate: 新的 这是在元素本身更新之前调用的，很像组件声明周期勾子
update 移除，有太多的相似之处要更新，所以这是多余的，可以试试用 updated
componentUpdated -> updated
beforeUnmount 新的，与组件生命周期勾子类似在卸载元素之前调用
unbind => unmounted
最终 api

```js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // 新
  unmounted() {},
};
```

举例使用:

```js
//html

<p v-highlight="yellow">高亮显示此文本亮黄色</p>;

//js
const app = Vue.createApp({});

app.directive("highlight", {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value;
  },
});
```

自定义元素交互
如果我们想添加 Vue 外部定义的自定义元素(例如使用 web 组件 api)我们需要指令 Vue 将其视为自定义元素。让我们一下面的模板为例

vue2

在 Vue 2.x 中，将标记作为自定义元素白名单是通过 Vue.config.ignoredElements：

这将使 Vue 忽略在 Vue 外部定义的自定义元素
(例如：使用 Web Components API)

```js
Vue.config.ignoredElements = ["plastic-button"];
```

在 Vue 3.0 中，此检查在模板编译期间执行指示编译器将 `<plastic-button>` 视为自定义元素：

如果使用生成步骤：将 isCustomElement 传递给 Vue 模板编译器，如果使用 vue-loader，则应通过 vue-loader 的 compilerOptions 选项传递：

```js
// webpack 中的配置
rules: [
  {
    test: /\.vue$/,
    use: "vue-loader",
    options: {
      compilerOptions: {
        isCustomElement: (tag) => tag === "plastic-button",
      },
    },
  },
  // ...
];
```

如果使用动态模板编译，请通过 app.config.isCustomElement 传递：

```js
const app = Vue.createApp({});
app.config.isCustomElement = (tag) => tag === "plastic-button";
```

定制内置元素
is
vue2 中相当于 bar 组件
vue3 中通过 is prop 渲染 foo 组件

```js
<button is="plastic-button">点击我</button>
```

v-is 用于 Dom 内模板解析解决方案 更像 vue2 中的:is
Data 选项
data 组件选项声明不再接收纯 JavaScript object，而需要 function 声明。

```js
const app = new Vue({
  data() {
    return {};
  },
});
```

## 组合式 API

什么是组合式 API？
应用程序变得非常大的时候——想想几百个组件,将接口的可重复部分及其功能提取到可重用的代码段中。仅此一项变得远远不够。

组合式 API 基础
setup 组件选项
新的 setup 组件选项在创建组件之前执行，一旦 props 被解析，并充当合成 API 的入口点。

\*由于在执行 setup 时尚未创建组件实例，因此在 setup 选项中没有 this。这意味着，除了 props 之外，你将无法访问组件中声明的任何属性——本地状态、计算属性或方法

```js
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String },
  },
  setup(props) {
    console.log(props); // { user: '' }

    return {}; // 这里返回的任何内容都可以用于组件的其余部分
  },
  // 组件的“其余部分”
};
```

我们将从最明显的部分开始：

仓库列表
更新仓库列表的函数
返回列表和函数，以便其他组件选项可以访问它们

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'

// 在我们的组件内
setup (props) {
let repositories = []
const getUserRepositories = async () => {
repositories = await fetchUserRepositories(props.user)
}

return {
repositories,
getUserRepositories // 返回的函数与方法的行为相同
}
}
```

带 ref 的响应式变量
这是我们的出发点，但它还不能工作，因为我们的 repositories 变量是非响应式的。这意味着从用户的角度来看，仓库列表将保持为空。我们来解决这个问题！
带 ref 的响应式变量
