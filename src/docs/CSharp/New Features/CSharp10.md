---
title: CSharp 10.0 新特性
createTime: 2026/01/23 14:22:01
permalink: /docs/95x85pwm/
---

## 一、 安装必备

下载最新 6 .NET SDK。 还可以下载 Visual Studio 2022，其中包括 .NET 6 SDK。

## 二、新特性

### 1.record struct

首先自然是 record struct，解决了 record 只能给 class 而不能给 struct 用的问题：

```csharp
record struct Point(int X, int Y);
```

用 record 定义 struct 的好处其实有很多，例如你无需重写 GetHashCode 和 Equals 之类的方法了。

sealed record ToString 方法
之前 record 的 ToString 是不能修饰为 sealed 的，因此如果你继承了一个 record，相应的 ToString 行为也会被改变，因此这是个虚方法。

但是现在你可以把 record 里的 ToString 方法标记成 sealed，这样你的 ToString 方法就不会被重写了。

### 2.struct 无参构造函数

```csharp
struct Foo
{
    public int X;
    public Foo() { X = 1; }
}
```

但是使用的时候就要注意了，因为无参构造函数的存在使得 new struct() 和 default(struct) 的语义不一样了，例如 new Foo().X == default(Foo).X 在上面这个例子中将会得出 false。

### 3.匿名对象的 with

```csharp
var x = new { A = 1, B = 2 };
var y = x with { A = 3 };
```

这里 y.A 将会是 3 。

### 4.全局的 using

利用全局 using 可以给整个项目启用 usings，不再需要每个文件都写一份。比如你可以创建一个 Import.cs，然后里面写：

```csharp
global using System;
global using i32 = System.Int32;
```

然后你整个项目都无需再 using System，并且可以用 i32 了。

### 5.文件范围的 namespace

这个比较简单，以前写 namespace 还得带一层大括号，以后如果一个文件里只有一个 namespace 的话，那直接在最上面这样写就行了：

```csharp
namespace MyNamespace;
```

### 6.常量字符串插值

你可以给 const string 使用字符串插值了，非常方便：

```csharp
const string x = "hello";
const string y = $"{x}, world!";
```

### 7.lambda 改进

1. 支持 attributes
   lambda 可以带 attribute 了：

```csharp
f = [Foo] (x) => x; // 给 lambda 设置
f = [return: Foo] (x) => x; // 给 lambda 返回值设置
f = ([Foo] x) => x; // 给 lambda 参数设置
```

2. 支持指定返回值类型
   此前 C# 的 lambda 返回值类型靠推导，C# 10 开始允许在参数列表最前面显示指定 lambda 类型了：

```csharp
f = int () => 4;
```

3. 支持 ref 、in 、out 等修饰

```csharp
f = ref int (ref int x) => ref x; // 返回一个参数的引用
```

4. 头等函数
   函数可以隐式转换到 delegate，于是函数上升至头等函数：

```csharp
void Foo() { Console.WriteLine("hello"); }
var x = Foo;
x(); // hello
```

5. 自然委托类型
   lambda 现在会自动创建自然委托类型，于是不再需要写出类型了。

```csharp
var f = () => 1; // Func<int>
var g = string (int x, string y) => $"{y}{x}"; // Func<int, string, string>
var h = "test".GetHashCode; // Func<int>
```

### 8.CallerArgumentExpression

现在，CallerArgumentExpression 这个 attribute 终于有用了。借助这个 attribute，编译器会自动填充调用参数的表达式字符串，例如：

```csharp
void Foo(int value, [CallerArgumentExpression("value")] string? expression = null)
{
    Console.WriteLine(expression + " = " + value);
}
```

当你调用 Foo(4 + 5) 时，会输出 4 + 5 = 9。这对测试框架极其有用，因为你可以输出 assert 的原表达式了：

```csharp
static void Assert(bool value, [CallerArgumentExpression("value")] string? expr = null)
{
    if (!value) throw new AssertFailureException(expr);
}
```

### 9.tuple 支持混合定义和使用

比如：

```csharp
int y = 0;
(var x, y, var z) = (1, 2, 3);
```

于是 y 就变成 2 了，同时还创建了两个变量 x 和 z，分别是 1 和 3 。

### 10.接口支持抽象静态方法

这个特性将会在 .NET 6 作为 preview 特性放出，意味着默认是不启用的，需要设置<LangVersion>preview</LangVersion> 和 <EnablePreviewFeatures>true</EnablePreviewFeatures>，然后引入一个官方的 nuget 包 System.Runtime.Experimental 来启用。
然后接口就可以声明抽象静态成员了，.NET 的类型系统正式具备虚静态方法分发能力。
例如，你想定义一个可加而且有零的接口 ```IMonoid<T>```

```csharp
interface IMonoid<T> where T : IMonoid<T>
{
    abstract static T Zero { get; }
    abstract static T operator+(T l, T r);
}
```

然后可以对其进行实现，例如这里的 MyInt：

```csharp
public class MyInt : IMonoid<MyInt>
{
    public MyInt(int val) { Value = val; }

    public static MyInt Zero { get; } = new MyInt(0);
    public static MyInt operator+(MyInt l, MyInt r) => new MyInt(l.Value + r.Value);

    public int Value { get; }
}
```

然后就能写出一个方法对 ```IMoniod<T>``` 进行求和了，这里为了方便写成扩展方法：

```csharp
public static class IMonoidExtensions
{
    public static T Sum<T>(this IEnumerable<T> t) where T : IMonoid<T>
    {
        var result = T.Zero;
        foreach (var i in t) result += i;
        return result;
    }
}
```

最后调用：

```csharp
List<MyInt> list = new() { new(1), new(2), new(3) };
Console.WriteLine(list.Sum().Value); // 6
```

你可能会问为什么要引入一个 ```System.Runtime.Experimental```，因为这个包里面包含了 .NET 基础类型的改进：给所有的基础类型都实现了相应的接口，比如给数值类型都实现了 ```INumber<T>```，给可以加的东西都实现了 ```IAdditionOperators<TLeft, TRight, TResult>``` 等等，用起来将会非常方便，比如你想写一个函数，这个函数用来把能相加的东西加起来：

```csharp
T Add<T>(T left, T right) where T : IAdditionOperators<T, T, T>
{
    return left + right;
}
```

就搞定了。

### 11.泛型 attribute

C# 的 attributes 支持泛型了，不过 .NET 6 中将以预览特定放出，因此需要 ```<LangVersion>preview</LangVersion>```

```csharp
class TestAttribute<T> : Attribute
{
    public T Data { get; }
    public TestAttribute(T data) { Data = data; }
}
```

然后你就能这么用了：

```csharp
[Test<int>(3)]
[Test<float>(4.5f)]
[Test<string>("hello")]
```

### 12.允许在方法上指定 AsyncMethodBuilder

C# 10 将允许方法上使用 ```[AsyncMethodBuilder(...)]``` 来使用你自己实现的 async method builder，代替自带的 Task 或者 ValueTask 的异步方法构造器。这也有助于你自己实现零开销的异步方法。

### 13.嵌套属性模式匹配改进

以前在匹配嵌套属性的时候需要这么写：

```csharp
if (a is { X: { Y: { Z: 4 } } }) { ... }
```

现在只需要简单的：

```csharp
if (a is { X.Y.Z: 4 }) { ... }
```

就可以了。

# 参考链接
- [C# 10 中的新增功能](https://docs.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-10)

