---
title: CSharp 8.0 新特性
createTime: 2026/01/23 14:20:44
---

## 新特性

### 1.可空引用类型（Nullable reference types）

从此，引用类型将会区分是否可分，可以从根源上解决 NullReferenceException。但是由于这个特性会打破兼容性，因此没有当作 error 来对待，而是使用 warning 折衷，而且开发人员需要手动 opt-in 才可以使用该特性（可以在项目层级或者文件层级进行设定）。
例如：

```csharp
string s = null; // 产生警告: 对不可空引用类型赋值 null
string? s = null; // Ok

void M(string? s)
{
    Console.WriteLine(s.Length); // 产生警告：可能为 null
    if (s != null)
    {
        Console.WriteLine(s.Length); // Ok
    }
}
```

至此，再也不用担心我的程序到处报 NullReferenceException 啦！

### 2.异步流（Async streams）

使用异步流需要在列举流元素时在关键字之前添加关键字。添加关键字需要用修饰符来列举异步流并返回允许的方法类型的方法。通常，这意味着返回任务或任务它也可以是一个价值任务或价值任务一种方法可以消耗和产生异步流，这意味着它会返回一个亚同步可识别以下代码生成从 0 到 19 的序列，在生成每个数字之间等待 100 ms：awaitforeachawaitasyncasync

```csharp
public static async System.Collections.Generic.IAsyncEnumerable<int> GenerateSequence()
{
    for (int i = 0; i < 20; i++)
    {
        await Task.Delay(100);
        yield return i;
    }
}
```

您将使用该语句列举序列：await foreach

```csharp
await foreach (var number in GenerateSequence())
{
    Console.WriteLine(number);
}
```

### 3.范围和下标类型（Ranges and indices）

C# 8.0 引入了 Index 类型，可用作数组下标，并且使用 ^ 操作符表示倒数。
不过要注意的是，倒数是从 1 开始的。

```csharp
Index i1 = 3;  // 下标为 3
Index i2 = ^4; // 倒数第 4 个元素
int[] a = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
Console.WriteLine($"{a[i1]}, {a[i2]}"); // "3, 6"123123
```

除此之外，还引入了 “…” 操作符用来表示范围（注意是左闭右开区间）。

```csharp
var slice = a[i1..i2]; // { 3, 4, 5 }
```

关于这个下标从 0 开始，倒数从 1 开始，范围左闭右开，笔者刚开始觉得很奇怪，但是发现 Python 等语言早已经做了这样的实践，并且效果不错。因此这次微软也采用了这种方式设计了 C# 8.0 的这个语法。

### 4.接口的默认实现方法（Default implementations of interface members）

从此接口中可以包含实现了：

```csharp
interface ILogger
{
    void Log(LogLevel level, string message);
    void Log(Exception ex) => Log(LogLevel.Error, ex.ToString()); // 这是一个默认实现重载
}

class ConsoleLogger : ILogger
{
    public void Log(LogLevel level, string message) { ... }
    // Log(Exception) 会得到执行的默认实现
}
```

在上面的例子中，Log(Exception)将会得到执行的默认实现。

### 5.切换表达式

通常，开关语句在其每个方块中产生值。切换表达式使您能够使用更简洁的表达式语法。重复和关键字较少，卷曲括号更少。例如，请考虑列出彩虹颜色的以下列名录：casecasebreak

```csharp
public enum Rainbow
{
    Red,
    Orange,
    Yellow,
    Green,
    Blue,
    Indigo,
    Violet
}
```

如果您的应用程序定义了从 "和组件"构建的类型，则可以使用包含开关表达式的以下方法将值转换为其 RGB 值：RGBColorRGBRainbow

```csharp
public static RGBColor FromRainbow(Rainbow colorBand) =>
    colorBand switch
    {
        Rainbow.Red    => new RGBColor(0xFF, 0x00, 0x00),
        Rainbow.Orange => new RGBColor(0xFF, 0x7F, 0x00),
        Rainbow.Yellow => new RGBColor(0xFF, 0xFF, 0x00),
        Rainbow.Green  => new RGBColor(0x00, 0xFF, 0x00),
        Rainbow.Blue   => new RGBColor(0x00, 0x00, 0xFF),
        Rainbow.Indigo => new RGBColor(0x4B, 0x00, 0x82),
        Rainbow.Violet => new RGBColor(0x94, 0x00, 0xD3),
        _              => throw new ArgumentException(message: "invalid enum value", paramName: nameof(colorBand)),
    };
```

与使用经典语句的等效代码进行对比：switch

```csharp
public static RGBColor FromRainbowClassic(Rainbow colorBand)
{
    switch (colorBand)
    {
        case Rainbow.Red:
            return new RGBColor(0xFF, 0x00, 0x00);
        case Rainbow.Orange:
            return new RGBColor(0xFF, 0x7F, 0x00);
        case Rainbow.Yellow:
            return new RGBColor(0xFF, 0xFF, 0x00);
        case Rainbow.Green:
            return new RGBColor(0x00, 0xFF, 0x00);
        case Rainbow.Blue:
            return new RGBColor(0x00, 0x00, 0xFF);
        case Rainbow.Indigo:
            return new RGBColor(0x4B, 0x00, 0x82);
        case Rainbow.Violet:
            return new RGBColor(0x94, 0x00, 0xD3);
        default:
            throw new ArgumentException(message: "invalid enum value", paramName: nameof(colorBand));
    };
}
```

### 6.空凝聚分配

C# 8.0 引入了无凝聚分配操作员。只有当左手操作者评估到时，您才能使用操作员将其右手操作的价值分配给其左手操作。??=??=null

```csharp
List<int> numbers = null;
int? i = null;

numbers ??= new List<int>();
numbers.Add(i ??= 17);
numbers.Add(i ??= 20);

Console.WriteLine(string.Join(" ", numbers));  // output: 17 17
Console.WriteLine(i);  // output: 17
```

### 7.未管理的构造类型

在 C# 7.3 和更早的类型中，构造类型（包含至少一个类型参数的类型）不能是非管理类型。从 C# 8.0 开始，如果构造值类型仅包含非管理类型的字段，则该类型不受管理。

例如，鉴于通用类型的下列定义：```Coords<T>```

```csharp
public struct Coords<T>
{
    public T X;
    public T Y;
}
```

该类型是 C#8.0 及以后的非管理类型。与任何非管理类型一样，您可以创建此类型变量的指点，或在堆栈上分配此类型的内存块：```Coords<int>```

```csharp
Span<Coords<int>> coordinates = stackalloc[]
{
    new Coords<int> { X = 0, Y = 0 },
    new Coords<int> { X = 0, Y = 3 },
    new Coords<int> { X = 4, Y = 0 }
};
```

### 8.注意事项

1.以上的新特性需要 .NET Standard 2.1/.NET Core 3.0/.NET Framework 4.8 及以上来支持。 2.但是，由于接口的默认实现方法这个特性需要 CLR 的支持，而 .NET Framework 4.8 还没有来得及做出修改，因此此特性在 .NET Framework 4.8 中不可用，需要等待进一步的更新。
