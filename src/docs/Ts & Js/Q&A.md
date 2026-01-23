---
title: Q & A
createTime: 2026/01/23 13:22:16
permalink: /docs/m2mejf1k/
---

# 写 TypeScript 时，很多人可能会犯的几个小错误！

> TypeScript 和 JavaScript 在过去几年中不断进步，我们在过去点时间中建立的一些实践可能已经过时。有些可能永远没有意义，下面我列出了很多=开发者可能会犯的几个错误！

## 没有使用严格模式

通过使用没有严格模式的 tsconfig.json。

```js
"compilerOptions":{
  "target":"ES2015",
  "module":"commonjs"
}
```

使用严格模式后

```js
"compilerOptions":{
  "target":"ES2015",
  "module":"commonjs",
  "strict":true
}
```

我们为什么要使用严格模式？
严格模式可以消除语法里一些不合理，不严谨的地方，可以让 TS 往更合理、更安全、更严谨的方向去发展: 通过将一些 TS 的静默错误更改为抛出错误，消除了 TS 的一些静默错误，能更加有效保障代码运行的安全；提高编译器效率，增加运行速度；禁止一些可能在 ECMAScript 未来版本中定义的语法。

## 使用 || 确定默认值

```ts
function createBlogPost(text:string,author:string,date?:Date){
  return {
    text:text,
    author:author,
    date:date || new Date();
  }
}
```

它应该是什么样子的呢？
使用最新的??运算符或者最好是在参数级别定义返回值。

```ts
function createBlogPost(text:string,author:string,date:Date = new Date()){
  return {
    text:text,
    author:author,
    date:date;
  }
}
```

这??运算符去年才被引入，如果在长函数的中间使用值，可能很难将它们定义为参数默认值。

?? 与 || 不同，它只返回 null 或 undefined，而不是所有 falsy 值。

## 使用 any 作为类型

当我们不确定数据类型的时候，会使用 any 类型的数据。

```ts
async function loadProducts(): Promise<Product[]> {
  const response = await fetch("https://api.mysize.com/products");
  const products: any = await response.json();
  return products;
}
```

在所有我们不确定类型的情况下，我们都应该使用 unknown。

```ts
async function loadProducts(): Promise<Product[]> {
  const response = await fetch("https://api.mysize.com/products");
  const products: any = await response.json();
  return products as Product[];
}
```

## 为什么要这么做呢？

> any 很简单，因为它从根本上禁用了所有类型检查。通常，即使在官方类型中也使用 any

## 为什么不能用 any？

它从根本上禁用所有类型检查。通过 any 进入的所有值都将完全放弃任何类型检查。这可能会变得非常难以捕捉错误，因为只有当我们对类型结构的假设符合运行时代码时，代码才会失败。

## val 作为 SomeType

```ts
async function loadProducts(): Promise<Product[]> {
  const response = await fetch("https://api.mysize.com/products");
  const products: any = await response.json();
  return products as Product[];
}
```

这就是类型守卫的用途。

```ts
function isArrayOfProducts(obj: unknown): obj is Product[] {
  return Array.isArray(obj) && obj.every(isProduct);
}

function isProduct(obj: unknown): obj is Product {
  return obj != null && typeof (obj as Product).id === "string";
}

async function loadProducts(): Promise<Product[]> {
  const response = await fetch("https://api.mysize.com/products");
  const products: unknown = await response.json();
  if (!isArrayOfProducts(products)) {
    throw new TypeError("Received malformed products API response");
  }
  return products;
}
```

当我们想要从 JavaScript 转换为 TypeScript 时，现有的代码库经常对 TypeScript 编译器无法自动得出的类型做出假设。在这些情况下，使用快速 as SomeOtherType 可以加快转换速度，而无需放松 tsconfig 中的设置。

即使现在可以保存断言，但当有人移动代码时，这可能会改变。类型保护将确保所有检查都是明确的。

## 使用一个字母作为泛型参数

用一个字母给作为名称，比如常用的 T 作为泛型名称！

```ts
function head<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

用一个字母给作为名称，比如常用的 T 作为泛型名称！

```ts
function head<Element>(arr: Element[]): Element | undefined {
  return arr[0];
}
```

我猜很多人有这种坏习惯，因为即使是官方文档也使用一个字母的名称。按 T 代替写全名可以更快地键入，并且不需要考虑太多。

泛型类型是变量，就像其他变量一样。当 IDE 开始向我们展示这些技术性时，我们已经放弃了在变量名称中描述变量技术性的想法。例如。我们通常只写 const name = ‘Daniel’ 而不是 const strName = ‘Daniel’。此外，一个字母的变量名通常会引起轰动，因为如果不看它们的声明，可能很难翻译它们的含义。

## 非布尔检查

通过将值直接传递给 if 语句来检查值是否已定义。

```ts
function createNewMessagesResponse(countOfNewMessages?: number) {
  if (countOfNewMessages) {
    return `You have ${countOfNewMessages} new Messages`;
  }
  return "Error:";
}
```

我们可以明确检查我们关心的情况。

```ts
(countOfNewMessages?:number){
  if(countOfNewMessages !== undefined){
    return `You have ${countOfNewMessages} new Messages`
  }
  return 'Error:'
}
```

用简短的方式编写检查看起来更简洁，并且可以让我们避免思考我们真正想要检查的内容。

## ！！操作符

```ts
function createNewMessagesResponse(countOfNewMessages?: number) {
  if (!!countOfNewMessages) {
    return `You have ${countOfNewMessages} new Messages`;
  }
  return "Error:";
}
```

明确检查我们关心的状况。

```ts
(countOfNewMessages?:number){
  if(countOfNewMessages !== undefined){
    return `You have ${countOfNewMessages} new Messages`
  }
  return 'Error:'
}
```

对我们中的一些人来说，理解！很简单。它看起来简短而简洁，如果您已经熟悉它，那么您就会知道它是关于什么的。这是将任何值转换为布尔值的简便方法。尤其是在代码库中，假值（如 null、undefined 和“”）之间没有明确的语义分离。

用 !!通过宣传内部知识来混淆代码的真正含义。这使得新开发人员更不容易访问代码库，无论是一般开发的新手，还是 JavaScript 的新手。引入细微的错误也很容易。来自“非布尔布尔检查”的 countOfNewMessages 为 0 的问题仍然存在 !!。

## 盘点 TypeScript 中的易混淆点

### any VS unknown

- any
  用来表示可以赋值为任意类型，包括 any 类型值的属性和方法，所有类型都能被赋值给它，它也能被赋值给其他任何类型，在 TypeScript 中尽量避免使用

```ts
let anyThing: any = "hello";

// 以下在编译时不会报错，在运行时报错，失去了 TypeScript 类型检查的意义
console.log(anyThing.todo());
console.log(anyThing.todo().abc);
```

- unknown
  unknown 是 any 类型对应的安全类型，在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 any 类型的值执行操作之前，我们不必进行任何检查

```ts
let value: unknown;

value = undefined; // ok
value = null; // ok
value = true; // ok
value = 86; // ok
value = "hello"; // ok
value = {}; // ok
value = Symbol(); // ok
```

```ts
let value: unknown;

let v1: unknown = value; // ok
let v2: any = value; // ok
let v3: undefined = value; // Error
let v4: null = value; // Error
let v5: string = value; // Error
let v6: number = value; // Error
let v7: boolean = value; // Error
let v8: symbol = value; // Error

console.log(value.key); // Error
value.foo(); // Error
```

所以在操作 unknown 类型前，应该缩小类型范围，可以通过：typeof、instanceof、as、is

```ts
let value: unknown = "hello";

// 通过 typeof 缩小类型范围
if (typeof value === "string") {
  console.log(value.length);
}
```
