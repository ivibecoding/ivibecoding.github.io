---
title: CSharp 9.0 新特性
createTime: 2026/01/23 14:21:35
permalink: /docs/csharp/urts3w44/
---

## 一、 安装必备

- 下载最新的 net5 sdk: [.NET 5.0 SDK (v5.0.103)](https://dotnet.microsoft.com/download/visual-studio-sdks)

## 二、新特性

### 1.init 关键字

只初始化属性设置器

```csharp
public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}

var person = new Person { FirstName = "Mads", LastName = "Torgersen" };
```

```csharp
public class Person
{
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
}

var person = new Person { FirstName = "Mads", LastName = "Nielsen" }; // OK
person.LastName = "Torgersen"; // ERROR!

```

**init**访问器是一个只在对象初始化时用来赋值的 set 访问器的变体，并且除过初始化进行赋值外，后续其他的赋值操作是不允许的。上面定义的 Person 对象，在下面代码中第一行初始化可以，第二行再次赋值就不被允许了。
因此，一旦初始化完成之后，仅初始化属性就保护着对象免于改变。

### 2.record 类型

您可以使用位置参数来声明记录的属性，并在创建实例时初始化属性值：

```csharp
public record Person(string FirstName, string LastName);

public static void Main()
{
    Person person = new("Nancy", "Davolio");
    Console.WriteLine(person);
    // output: Person { FirstName = Nancy, LastName = Davolio }
}
```

```csharp
public record Person
{
    public string FirstName { get; init; }
    public string LastName { get; init; }
};
```

您还可以创建具有可变属性和字段的记录类型：

```csharp
public record Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
};
```

**2.1 价值平等**

值均等意味着，如果类型匹配且所有属性和字段值匹配，则记录类型的两个变量是相等的。对于其他参考类型，平等意味着身份。即，如果参考类型中两个变量是指同一对象，则它们是相等的。

以下示例说明记录类型的价值平等：

```csharp
public record Person(string FirstName, string LastName, string[] PhoneNumbers);

public static void Main()
{
    var phoneNumbers = new string[2];
    Person person1 = new("Nancy", "Davolio", phoneNumbers);
    Person person2 = new("Nancy", "Davolio", phoneNumbers);
    Console.WriteLine(person1 == person2); // output: True

    person1.PhoneNumbers[0] = "555-1234";
    Console.WriteLine(person1 == person2); // output: True

    Console.WriteLine(ReferenceEquals(person1, person2)); // output: False
}
```

**2.2with 表达式（With-expressions）**
当使用不可变的数据时，一个常见的模式是从现存的值创建新值来呈现一个新状态。例如，如果 Person 打算改变他的姓氏（last name），我们就需要通过拷贝原来数据，并赋予一个不同的 last name 值来呈现一个新 Person。这种技术被称为非破坏性改变。作为描绘随时间变化的 person，record 呈现了一个特定时间的 person 的状态。为了帮助进行这种类型的编程，records 就提出了一个新的表达式——with 表达式：

```csharp
var person = new Person { FirstName = "Mads", LastName = "Nielsen" };
var otherPerson = person with { LastName = "Torgersen" };
```

with 表达式使用初始化语法来说明新对象在哪里与原来对象不同。with 表达式实际上是拷贝原来对象的整个状态值到新对象，然后根据对象初始化器来改变指定值。这意味着属性必须有 init 或者 set 访问器，才能用 with 表达式进行更改。

一个 record 隐式定义了一个带有保护访问级别的“拷贝构造函数”，用来将现有 record 对象的字段值拷贝到新对象对应字段中：

```csharp
protected Person(Person original) { /* 拷贝所有字段 */ } // generated
```

with 表达式就会引起拷贝构造函数被调用，然后应用对象初始化器来有限更改属性相应值。如果你不喜欢默认的产生的拷贝构造函数，你可以自定以，with 表达式也会进行调用。
**2.3 无损突变**
如果您需要改变记录实例的不可变属性，则可以使用表达式实现无损突变。表示形式会产生新的记录实例，该实例是现有记录实例的副本，并修改了指定属性和字段。您使用对象初始化器语法来指定要更改的值，如下示例所示：withwith

```csharp
public record Person(string FirstName, string LastName)
{
    public string[] PhoneNumbers { get; init; }
}

public static void Main()
{
    Person person1 = new("Nancy", "Davolio") { PhoneNumbers = new string[1] };
    Console.WriteLine(person1);
    // output: Person { FirstName = Nancy, LastName = Davolio, PhoneNumbers = System.String[] }

    Person person2 = person1 with { FirstName = "John" };
    Console.WriteLine(person2);
    // output: Person { FirstName = John, LastName = Davolio, PhoneNumbers = System.String[] }
    Console.WriteLine(person1 == person2); // output: False

    person2 = person1 with { PhoneNumbers = new string[1] };
    Console.WriteLine(person2);
    // output: Person { FirstName = Nancy, LastName = Davolio, PhoneNumbers = System.String[] }
    Console.WriteLine(person1 == person2); // output: False

    person2 = person1 with { };
    Console.WriteLine(person1 == person2); // output: True
}
```

**2.4 继承**

记录可以从另一个记录中继承。但是，记录不能从类继承，并且类不能从记录中继承。

以下示例用位置属性语法说明了继承：

```csharp
public abstract record Person(string FirstName, string LastName);
public record Teacher(string FirstName, string LastName, int Grade)
    : Person(FirstName, LastName);
public static void Main()
{
    Person teacher = new Teacher("Nancy", "Davolio", 3);
    Console.WriteLine(teacher);
    // output: Teacher { FirstName = Nancy, LastName = Davolio, Grade = 3 }
}
```

要等于两个记录变量，运行时间类型必须相等。包含变量的类型可能不同。以下代码示例中说明了这一点：

```csharp
public abstract record Person(string FirstName, string LastName);
public record Teacher(string FirstName, string LastName, int Grade)
    : Person(FirstName, LastName);
public record Student(string FirstName, string LastName, int Grade)
    : Person(FirstName, LastName);
public static void Main()
{
    Person teacher = new Teacher("Nancy", "Davolio", 3);
    Person student = new Student("Nancy", "Davolio", 3);
    Console.WriteLine(teacher == student); // output: False

    Student student2 = new Student("Nancy", "Davolio", 3);
    Console.WriteLine(student2 == student); // output: True
}
```

在示例中，所有实例具有相同的属性和相同的属性值。

### 3.顶层程序（Top-Level Programs)

通常，我们写一个简单的 C#程序，都必然会有大量的代码：

```csharp
using System;
class Program
{
    static void Main()
    {
        Console.WriteLine("Hello World!");
    }
}
```

这个不仅对于初学者来说麻烦，而且使得代码凌乱，并且增加了缩进层级。在 C#9.0 中，你可以选择在顶层用如下代码代替写你的主程序：

```csharp
using System;

Console.WriteLine("Hello World!");
```

当然，任何语句都是允许的。但是这段代码必须放在 using 后，和任何类型或者命名空间声明的前面。并且你只能在一个文件里面这样做，像如今只能写一个 main 方法一样。

如果你想返回状态，你可以那样做；你想用 await，也可以那样做。并且，如果你想访问命令行参数，神奇的是，args 像魔法一样也是可用的。

```csharp
using static System.Console;
using System.Threading.Tasks;

WriteLine(args[0]);
await Task.Delay(1000);
return 0;
```

本地函数作为语句的另一种形式，也是允许在顶层程序代码中使用的。在顶层代码段外部的任何地方调用他们都会产生错误。

### 4.类型推导 new 表达式

类型推导是从一个表达式所在的位置根据上下文获得它的类型时使用的一个术语。例如 null 和 lambda 表达式总是涉及到类型推导的。

在 C#中，new 表达式总是要求一个具体指定的类型（除了隐式类型数组表达式）。现在，如果表达式被指派给一个明确的类型时，你可以忽略 new 关键字后面的类型。

```csharp
Point p = new (3, 5);
```

当有大量重复，这个特别有用。例如下面数组初始化：

```csharp
Point[] ps = { new (1, 2), new (5, 2), new (5, -3), new (1, -3) };
```

# 参考链接
- [What's new in C# 9.0](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-9)

