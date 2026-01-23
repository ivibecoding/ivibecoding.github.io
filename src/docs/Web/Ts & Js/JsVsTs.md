---
title: js 与 ts 中各种循环遍历方式
createTime: 2026/01/23 13:24:47
---

### 1. for…in 、for…of

> 常用于遍历对象。for…in 循环读取键名，for…of 循环读取键值。如果要通过 for…of 循环，获取数组的索引，可以借助数组实例的 entries 方法和 keys 方法。

```js
let list = [4, 5, 6];
for (let i in list) {
  console.log(i + "-" + list[i]); // 打印： 0-4，1-5，2-6
}
for (let i of list) {
  console.log(i); // 打印： 4，5，6
}
```

### for…in 循环几个缺点

数组的键名是数字，但是 for…in 循环是以字符串作为键名“0”、“1”、“2”等等。
for…in 循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
某些情况下，for…in 循环会以任意顺序遍历键名。
for…in 循环主要是为遍历对象而设计的，不适用于遍历数组。
for…of 循环

有着同 for…in 一样的简洁语法，但是没有 for…in 那些缺点。
不同于 forEach 方法，它可以与 break、continue 和 return 配合使用。
提供了遍历所有数据结构的统一操作接口。 2. forEach()
forEach(): 没有返回值，不会返回新的数组，只是针对每个元素调用 func 循环数组，在原数组的基础上改变数组，可以用于数组的修改。和 for 的用法一样的。

```js
let arr= [44, 555, 6666];
arr.forEach((val, idx, array) => {
console.log(val);// val: 当前值
console.log(idx);// idx：当前下标
console.log(array);// array: 当前数组
});

结果：
44
0
[ 44, 555, 6666 ]
555
1
[ 44, 555, 6666 ]
6666
2
[ 44, 555, 6666 ]
```

### forEach() 不会返回新的数组，而是在原数组的基础上改变数组，可以用于数组的修改。

```js
let a = [1, 2, 3, 4, 5, 6];
a.forEach((num, index, a) => {
  // 三个参数分别为：子元素，索引，原数组
  a[index] = num + 1;
});
console.log(a); // [2,3,4,5,6,7]
```

forEach 无法直接遍历{}大括号括起来的对象，此时应使用 for 循环遍历，或者采用 Object.keys 遍历对象的属性。
Object.keys()方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名，且只返回可枚举的属性。

```js
//传入对象， 返回 包含对象可枚举属性和方法的数组
let obj = { name: "xiaoming", age: 18 };
console.log(Object.keys(obj)); // ["name","age"]

//传入数组，返回索引值
var arr = ["a", "b", "c"];
console.log(Object.keys(arr)); //["0", "1", "2"]

//传入 json 对象,获取 属性与值
const json = { name: "张三", age: 18 };
Object.keys(json).forEach((key) => {
  console.info(key + ":", json[key]); // name:,张三 age:,18
});
```

Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 for…in 循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )

```js
var obj = { foo: "bar", baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// array like object
var obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.values(obj)); // ['a', 'b', 'c']

// array like object with random key ordering
// when we use numeric keys, the value returned in a numerical order according to the keys
var an_obj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']

// getFoo is property which isn't enumerable
var my_obj = Object.create(
  {},
  {
    getFoo: {
      value: function () {
        return this.foo;
      },
    },
  }
);
my_obj.foo = "bar";
console.log(Object.values(my_obj)); // ['bar']

// non-object argument will be coerced to an object
console.log(Object.values("foo")); // ['f', 'o', 'o']
```

### 19 3. filter()

filter(): 返回一个符合 func 条件的元素数组。筛选条件，把数组符合条件的放在新的数组里面返回。新数组和原来的数组长度不一定一样。

```js
let a = [1, 2, 3, 4, 5, 6];
let b = a.filter((num, index, a) => {
  // b 为一个新的数组
  return num > 3;
});
console.log(b); //[4,5,6]
```

## 5 4. map()

map(): 返回一个新的 Array，每个元素为调用 func 的结果。新数组的长度和原来的是一样的，他只不过是逐一对原来数据里的每个元素进行操作。
map()不改变原数组，返回改变后的新数组（而 foreach 改变原数组，且没有返回值）
map()和 foreach() 不同在于他是有 return 的，并且他会返回一个新数组。

```js
let a = [1, 2, 3];
let b = a.map(function (n) {
  return n + 1;
});
console.log(a); // [1, 2, 3] 原数组并未改变
console.log(b); // [2, 3, 4]
```

map 方法接受一个函数作为参数。该函数调用时，map 方法向它传入三个参数：当前成员、当前位置和数组本身。

```js
[1, 2, 3].map(function(elem, index, arr) {
return elem \* index; // [0, 2, 6]
});
1
2
3
举例

this.list = this.list.map((item, index) => {
return {
...item,
direction: 'left',
};
});
```

### 6 5. every() 和 some()

some(): 返回一个 boolean，判断是否有元素是否符合 func 条件。数组里面所有的元素有一个符合条件就返回 true。

every():返回一个 boolean，判断每个元素是否符合 func 条件。数组里面所有的元素都符合才返回 true。

every 和 some 都只是判断，不做处理，不生成新的数组。

```js
// every 中每一个元素都要大于 3 返回 true, 否则返回 false
let a = [1, 2, 3, 4, 5, 6];
let b = a.every((num, index, a) => {
  return num > 3;
});
console.log(b); // false

// some 中任意一个只要大于 3 返回 true, 没有任何一个 返回 false
let c = a.some((num, index, a) => {
  return num > 3;
});
console.log(c); // true
```

使用技巧：
every 和 some 都通过控制 return 的值来跳出循环。
具体做法是：

every 方法返回值是布尔类型，最终返回值为 true 需要每一次回调函数返回值都为 true，如果某一次回调函数返回值为 false 则 every 方法结束对数组的遍历并返回 false，所以在想要跳出循环时回调函数 return false，因为 every 会对 callback 回调函数中的返回值做的判断处理类似于&&。

some 方法返回值是布尔类型，最终返回值为 true 只需要任意一次回调函数返回值为 true 就会结束对数组的遍历，如果每一次回调函数返回值都为 false 的话则 some 方法就会一直遍历辖区并返回 false，所以在想要跳出循环时回调函数 return true，因为 some 会对 callback 回调函数中的返回值做的判断处理类似于||。

实际运用中，如果希望跳出循环时得到的判断值为 true 的话则用 some，如果希望跳出循环时得到的判断值为 false 的话则用 every。比如在判定用户是否勾选了不可操作的数据，或者是否勾选了一条可以操作的数据可以使用这两个方法遍历循环数组。

6.reduce()，reduceRight()
reduce 方法和 reduceRight 方法依次处理数组的每个成员，最终累计为一个值。
它们的差别是，reduce 是从左到右处理（从第一个成员到最后一个成员），reduceRight 则是从右到左（从最后一个成员到第一个成员），其他完全一样。

```js
let result = [1, 2, 3, 4, 5].reduce(function (a, b) {
  console.log(a, b);
  return a + b;
});
console.log(result);
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15
```

reduce 方法和 reduceRight 方法的第一个参数都是一个函数。该函数接受以下四个参数。

累积变量(必须)，默认为数组的第一个成员
当前变量(必须)，默认为数组的第二个成员
当前位置(可选)（从 0 开始）
原数组(可选)
如果要对累积变量指定初值，可以把它放在 reduce 方法和 reduceRight 方法的第二个参数。

```js
let result2 = [1, 2, 3, 4, 5].reduce(function (a, b) {
  return a + b;
}, 10);
console.log(result2); // 25
```

上面的第二个参数相当于设定了默认值，处理空数组时尤其有用，可避免一些空指针异常。
由于这两个方法会遍历数组，所以实际上还可以用来做一些遍历相关的操作。比如，找出字符长度最长的数组成员。

```js
function findLongest(entries) {
  return entries.reduce(function (longest, entry) {
    return entry.length > longest.length ? entry : longest;
  }, "");
}

let result = findLongest(["aaa", "bb", "c"]);
console.log(result); // "aaa"
```
