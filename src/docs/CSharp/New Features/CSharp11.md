---
title: CSharp 11.0 新特性
createTime: 2026/01/23 14:22:25
permalink: /docs/csharp/a5elbyvr/
---

## UTF-8 字符串字面量
可以对字符串字面量指定 ```u8``` 后缀来指定 UTF-8 字符编码，对于HTTP 字符串常量或类似的文本协议，可以方便创建

> .NET 中的字符串是使用 UTF-16 编码存储的。 UTF-8 是 Web 协议和其他重要库的标准。

以下三种写法是等价的
```csharp
byte[] authWithTrailingSpaceArray = new byte[] { 0x41, 0x55, 0x54, 0x48, 0x20 };
byte[] authEncodingArray = System.Text.Encoding.UTF8.GetBytes("AUTH");
byte[] authStringLiteralArray = "AUTH"u8.ToArray();
```

- UTF-8 字符串返回类型是 ```ReadOnlySpan<byte>```
- UTF-8 字符串不是编译时常量，而是运行时常量，不能将其用作可选参数的默认值
- UTF-8 字符串不能与字符串内插结合使用，不能对同一字符串表达式使用 ```$``` 令牌和 ```u8``` 后缀
- UTF-8 字符串不能与变量结合使用

## 原始字符串文本
- 可以包含任意文本，包括空格、新行、嵌入引号和其他特殊字符，无需转义序列。
- 以至少三个双引号 ```"""``` 字符开头，以相同数量的双引号字符结尾。 
- 在单个行上使用三个双引号来开始字符串，在另一行上用三个双引号来结束字符串。
- 左引号之后、右引号之前的换行符不包括在最终内容中

### 文件路径
```csharp
// before 需要\或者@进行转义
string filePath = "C:\\Users\\scoleridge\\Documents\\";
// or
string filePath = @"C:\Users\scoleridge\Documents\";

// now
string filePath = """C:\Users\scoleridge\Documents\""";
```
### 内嵌引号
```csharp
// before 需要使用"转义
string singleLine = @"Friends say ""hello"" as they pass by.";

// now
string singleLine = """Friends say "hello" as they pass by.""";
```
> 内嵌Xml与Json同理，C# 11.0之前都需要对双引号```"```进行转义

### 多行文本
```csharp
// before 
string multiLine = @"My pensive SARA ! thy soft cheek reclined
    Thus on mine arm, most soothing sweet it is
    To sit beside our Cot,...";

// now
string multiLine = """
    My pensive SARA ! thy soft cheek reclined
    Thus on mine arm, most soothing sweet it is
    To sit beside our Cot,...
    """;
```
## [```$```字符串内插](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/tokens/interpolated)
- 内插表达式可以包含换行符
```csharp
string message = $"The usage policy for {safetyScore} is {
    safetyScore switch
    {
        > 90 => "Unlimited usage",
        > 80 => "General usage, with daily safety check",
        > 70 => "Issues must be addressed within 1 week",
        > 50 => "Issues must be addressed within 1 day",
        _ => "Issues must be addressed before continued use",
    }
    }";
```
- 可以在内插的原始字符串字面量中使用多个 $ 字符，以在输出字符串中嵌入 { 和 } 字符，而无需对这些字符进行转义
```csharp
// output: You are at {0, 0}
var location = $$"""
   You are at {{{Longitude}}, {{Latitude}}}
   """;
```
## 常量 string 上的模式匹配 ```Span<char>``` 或 ```ReadOnlySpan<char>```

```csharp
Span<char> chars = "Apple".ToCharArray();
var result = chars switch
{
    "Apple" => "This is an apple",
    _ => "This is not an apple"
};
```

## [列表模式](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/proposals/csharp-11.0/list-patterns)
列表模式扩展了模式匹配，以匹配列表或数组中的元素序列
-  可以使用任何模式（包括常量、类型、属性和关系模式）来匹配元素
- 弃元模式 ```_``` 匹配任何单个元素
- 切片模式 ```..``` 匹配零个或多个元素的任何序列 
- 切片模式中可以嵌套子模式

```csharp
Console.WriteLine(new[] { 1, 2, 3 } is [1, 2, 3]);  // True
Console.WriteLine(new[] { 1, 2, 3 } is [1, 2, 4]);  // False
Console.WriteLine(new[] { 1, 2, 3 } is [1, 2, 3, 4]);  // False
Console.WriteLine(new[] { 1, 2, 3 } is [0 or 1, <= 2, >= 3]);  // True

Console.WriteLine(new[] { 1, 2, 3, 4, 5 } is [> 0, > 0, ..]);  // True
Console.WriteLine(new[] { 1, 1 } is [_, _, ..]);  // True
Console.WriteLine(new[] { 0, 1, 2, 3, 4 } is [> 0, > 0, ..]);  // False
Console.WriteLine(new[] { 1 } is [1, 2, ..]);  // False

Console.WriteLine(new[] { 1, 2, 3, 4 } is [.., > 0, > 0]);  // True
Console.WriteLine(new[] { 2, 4 } is [.., > 0, 2, 4]);  // False
Console.WriteLine(new[] { 2, 4 } is [.., 2, 4]);  // True

Console.WriteLine(new[] { 1, 2, 3, 4 } is [>= 0, .., 2 or 4]);  // True
Console.WriteLine(new[] { 1, 0, 0, 1 } is [1, 0, .., 0, 1]);  // True
Console.WriteLine(new[] { 1, 0, 1 } is [1, 0, .., 0, 1]);  // False

// 可以在切片模式中嵌套子模式
void Validate(int[] numbers)
{
    var result = numbers is [< 0, .. { Length: 2 or 4 }, > 0] ? "valid" : "not valid";
    Console.WriteLine(result);
}

Validate(new[] { -1, 0, 1 });  // output: not valid
Validate(new[] { -1, 0, 0, 1 });  // output: valid
```
## [```required``` 修饰符](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/proposals/csharp-11.0/required-members)
```required``` 修饰符表示它所应用的字段或属性必须由所有构造函数或使用对象初始值设定项进行初始化

### 一个简单层次结构的定义

#### C# 8
```csharp
class Person
{
    public string FirstName { get; }
    public string MiddleName { get; }
    public string LastName { get; }

    public Person(string firstName, string lastName, string? middleName = null)
    {
        FirstName = firstName;
        LastName = lastName;
        MiddleName = middleName ?? string.Empty;
    }
}

class Student : Person
{
    public int ID { get; }
    public Person(int id, string firstName, string lastName, string? middleName = null)
        : base(firstName, lastName, middleName)
    {
        ID = id;
    }
}
```
**存在问题**
- 在层次结构的根，每个属性的类型必须重复两次，名称必须重复四次。
- 在派生级别，每个继承属性的类型必须重复一次，名称必须重复两次。

#### C# 9

```csharp
record Person(string FirstName, string LastName, string MiddleName = "");
record Student(int ID, string FirstName, string LastName, string MiddleName = "") : Person(FirstName, LastName, MiddleName);
```
**存在问题**
- ```record```消除了第一个重复源，但第二个重复源保持不变
- 这是随着层次结构的增长而增长的重复源，并且是在对层次结构进行更改后要修复的重复中最痛苦的部分，因为它需要通过所有位置跟踪层次结构，甚至可能跨越项目和潜在的破坏消费者。

#### C# 11

```csharp
public class Person
{
    // 默认构造函数要求在构造时设置FirstName和LastName
    public required string FirstName { get; init; }
    public string MiddleName { get; init; } = "";
    public required string LastName { get; init; }
}

public class Student : Person
{
    public required int ID { get; init; }
}
```
## [```file```关键字](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/file)
可以使用 ```file``` 访问修饰符创建其可见性范围限定为其声明时所在的源文件的类型

## 参考资料
- [Welcome to C# 11](https://devblogs.microsoft.com/dotnet/welcome-to-csharp-11/)
- [C# 11 中的新增功能](https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-11)
