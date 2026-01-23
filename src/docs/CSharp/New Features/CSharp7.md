---
title: CSharp 7.0 新特性
createTime: 2026/01/23 14:16:13
---

## 新特性

### 1. out 变量（out variables）

以前我们使用 out 变量必须在使用前进行声明，C# 7.0 给我们提供了一种更简洁的语法 “使用时进行内联声明” 。如下所示：

```csharp
var input = ReadLine();
  if (int.TryParse(input, out var result))
  {
      WriteLine("您输入的数字是：{0}",result);
  }
  else
  {
      WriteLine("无法解析输入...");
  }
```

上面代码编译后：

```csharp
int num;
  string s = Console.ReadLine();
  if (int.TryParse(s, out num))
  {
      Console.WriteLine("您输入的数字是：{0}", num);
  }
  else
  {
      Console.WriteLine("无法解析输入...");
  }
```

原理解析：所谓的 “内联声明” 编译后就是以前的原始写法，只是现在由编译器来完成。

备注：在进行内联声明时，即可直接写明变量的类型也可以写隐式类型，因为 out 关键字修饰的一定是局部变量。

### 2. 元组（Tuples）

值元组也是一种数据结构，用于表示特定数量和元素序列，但是是和元组类不一样的，主要区别如下：
值元组是结构，是值类型，不是类，而元组（Tuple）是类，引用类型；
值元组元素是可变的，不是只读的，也就是说可以改变值元组中的元素值；
值元组的数据成员是字段不是属性。
值元组的具体使用如下：

1.  如何创建值元组
    和元组类一样，.Net Framework 值元组也只支持 1 到 7 个元组元素，如果有 8 个元素或者更多，需要使用值元组的嵌套和 Rest 属性去实现。另外 ValueTuple 类可以提供创造值元组对象的静态方法。
    利用构造函数创建元组：

```csharp
var testTuple6 = new ValueTuple<int, int, int, int, int, int>(1, 2, 3, 4, 5, 6);
Console.WriteLine($"Item 1: {testTuple6.Item1}, Item 6: {testTuple6.Item6}");

```

利用 Tuple 静态方法构建元组，最多支持八个元素：

```csharp
var testTuple8 = ValueTuple.Create<int, int, int, int, int, int, int, int>(1, 2, 3, 4, 5, 6, 7, 8);
Console.WriteLine($"Item 1: {testTuple8.Item1}, Item 8: {testTuple8.Rest.Item1}");
```

注意这里构建出来的 Tuple 类型其实是 ```Tuple<int, int, int, int, int, int, int, Tuple<int>>```，因此 testTuple8.Rest 取到的数据类型是 ```Tuple<int>```，因此要想获取准确值需要取 Item1 属性。

优化区别：当构造出超过 7 个元素以上的值元组后，可以使用接下来的 ItemX 进行访问嵌套元组中的值，对于上面的例子，要访问第十个元素，既可以通过 testTuple10.Rest.Item3 访问，也可以通过 testTuple10.Item10 来访问。

```csharp
var testTuple10 = new ValueTuple<int, int, int, int, int, int, int, ValueTuple<int, int, int>>(1, 2, 3, 4, 5, 6, 7, new ValueTuple<int, int, int>(8, 9, 10));
Console.WriteLine($"Item 10: {testTuple10.Rest.Item3}, Item 10: {testTuple10.Item10}");
```

2.  表示一组数据
    如下创建一个值元组表示一个学生的三个信息：名字、年龄和身高，而不用单独额外创建一个类。

```csharp
var studentInfo = ValueTuple.Create<string, int, uint>("Bob", 28, 175);
Console.WriteLine($"Student Information: Name [{studentInfo.Item1}], Age [{studentInfo.Item2}], Height [{studentInfo.Item3}]");
```

3.  从方法返回多个值
    值元组也可以在函数定义中代替 out 参数返回多个值。

```csharp
static ValueTuple<string, int, uint> GetStudentInfo(string name)
{
    return new ValueTuple <string, int, uint>("Bob", 28, 175);
}

static void RunTest()
{
    var studentInfo = GetStudentInfo("Bob");
    Console.WriteLine($"Student Information: Name [{studentInfo.Item1}], Age [{studentInfo.Item2}], Height [{studentInfo.Item3}]");
}
```

优化区别：返回值可以不明显指定 ValueTuple，使用新语法(,,)代替，如(string, int, uint)：

```csharp
static (string, int, uint) GetStudentInfo1(string name)
{
    return ("Bob", 28, 175);
}

static void RunTest1()
{
    var studentInfo = GetStudentInfo1("Bob");
    Console.WriteLine($"Student Information: Name [{studentInfo.Item1}], Age [{studentInfo.Item2}], Height [{studentInfo.Item3}]");
}
```

返回值可以指定元素名字，方便理解记忆赋值和访问：

```csharp
static (string name, int age, uint height) GetStudentInfo1(string name)
{
    return ("Bob", 28, 175);
}

static void RunTest1()
{
    var studentInfo = GetStudentInfo1("Bob");
    Console.WriteLine($"Student Information: Name [{studentInfo.name}], Age [{studentInfo.age}], Height [{studentInfo.height}]");
}
```

4.  用于单参数方法的多值传递
    当函数参数仅是一个 Object 类型时，可以使用值元组实现传递多个值。

```csharp
static void WriteStudentInfo(Object student)
{
    var studentInfo = (ValueTuple<string, int, uint>)student;
    Console.WriteLine($"Student Information: Name [{studentInfo.Item1}], Age [{studentInfo.Item2}], Height [{studentInfo.Item3}]");
}

static void RunTest()
{
    var t = new System.Threading.Thread(new System.Threading.ParameterizedThreadStart(WriteStudentInfo));
    t.Start(new ValueTuple<string, int, uint>("Bob", 28, 175));
    while (t.IsAlive)
    {
        System.Threading.Thread.Sleep(50);
    }
}
```

5.  解构 ValueTuple
    可以通过 var (x, y)或者(var x, var y)来解析值元组元素构造局部变量，同时可以使用符号”\_”来忽略不需要的元素。

```csharp
static (string name, int age, uint height) GetStudentInfo1(string name)
{
    return ("Bob", 28, 175);
}

static void RunTest1()
{
    var (name, age, height) = GetStudentInfo1("Bob");
    Console.WriteLine($"Student Information: Name [{name}], Age [{age}], Height [{height}]");

    (var name1, var age1, var height1) = GetStudentInfo1("Bob");
    Console.WriteLine($"Student Information: Name [{name1}], Age [{age1}], Height [{height1}]");

    var (_, age2, _) = GetStudentInfo1("Bob");
    Console.WriteLine($"Student Information: Age [{age2}]");
}
```

由上所述，ValueTuple 使 C#变得更简单易用。较 Tuple 相比主要好处如下：

ValueTuple 支持函数返回值新语法”(,,)”，使代码更简单；
能够给元素命名，方便使用和记忆，这里需要注意虽然命名了，但是实际上 value tuple 没有定义这样名字的属性或者字段，真正的名字仍然是 ItemX，所有的元素名字都只是设计和编译时用的，不是运行时用的（因此注意对该类型的序列化和反序列化操作）；
可以使用解构方法更方便地使用部分或全部元组的元素；
值元组是值类型，使用起来比引用类型的元组效率高，并且值元组是有比较方法的，可以用于比较是否相等

### 3. 模式匹配（Pattern matching）

3.1 is 表达式（is expressions），如：

```csharp
static int GetSum(IEnumerable<object> values)
  {
      var sum = 0;
      if (values == null) return sum;

      foreach (var item in values)
      {
          if (item is short)     // C# 7 之前的 is expressions
          {
              sum += (short)item;
          }
          else if (item is int val)  // C# 7 的 is expressions
          {
              sum += val;
          }
          else if (item is string str && int.TryParse(str, out var result))  // is expressions 和 out variables 结合使用
          {
              sum += result;
          }
          else if (item is IEnumerable<object> subList)
          {
              sum += GetSum(subList);
          }
      }

      return sum;
  }
```

使用方法：

```csharp
  条件控制语句（obj is type variable）
   {
      // Processing...
   }
```

理解析：此 is 非彼 is ，这个扩展的 is 其实是 as 和 if 的组合。即它先进行 as 转换再进行 if 判断，判断其结果是否为 null，不等于 null 则执行

语句块逻辑，反之不行。由上可知其实 C# 7 之前我们也可实现类似的功能，只是写法上比较繁琐。

3.2switch 语句更新（switch statement updates），如：

```csharp
static int GetSum(IEnumerable<object> values)
  {
      var sum = 0;
      if (values == null) return 0;

      foreach (var item in values)
      {
          switch (item)
          {
              case 0:                // 常量模式匹配
                  break;
              case short sval:       // 类型模式匹配
                  sum += sval;
                  break;
              case int ival:
                  sum += ival;
                  break;
              case string str when int.TryParse(str, out var result):   // 类型模式匹配 + 条件表达式
                  sum += result;
                  break;
              case IEnumerable<object> subList when subList.Any():
                  sum += GetSum(subList);
                  break;
              default:
                  throw new InvalidOperationException("未知的类型");
          }
      }

      return sum;
  }
```

使用方法：

```csharp
switch (item)
  {
      case type variable1:
          // processing...
          break;
      case type variable2 when predicate:
          // processing...
          break;
      default:
          // processing...
          break;
  }
```

原理解析：此 switch 非彼 switch，编译后你会发现扩展的 switch 就是 as 、if 、goto 语句的组合体。同 is expressions 一样，以前我们也能实

现只是写法比较繁琐并且可读性不强。

总结：模式匹配语法是想让我们在简单的情况下实现类似与多态一样的动态调用，即在运行时确定成员类型和调用具体的实现。

### 4. 局部引用和引用返回 (Ref locals and returns)

我们知道 C# 的 ref 和 out 关键字是对值传递的一个补充，是为了防止值类型大对象在 Copy 过程中损失更多的性能。现在在 C# 7 中 ref 关键字得

到了加强，它不仅可以获取值类型的引用而且还可以获取某个变量（引用类型）的局部引用。如：

```csharp
static ref int GetLocalRef(int[,] arr, Func<int, bool> func)
  {
      for (int i = 0; i < arr.GetLength(0); i++)
      {
          for (int j = 0; j < arr.GetLength(1); j++)
          {
              if (func(arr[i, j]))
              {
                  return ref arr[i, j];
              }
          }
      }

      throw new InvalidOperationException("Not found");
  }
```

Call：

```csharp
   int[,] arr = { { 10, 15 }, { 20, 25 } };
   ref var num = ref GetLocalRef(arr, c => c == 20);
   num = 600;

  Console.WriteLine(arr[1, 0]);
```

Print results：
600
使用方法：

1.  方法的返回值必须是引用返回：

    a) 声明方法签名时必须在返回类型前加上 ref 修饰。

    b) 在每个 return 关键字后也要加上 ref 修饰，以表明是返回引用。

2.  分配引用（即赋值），必须在声明局部变量前加上 ref 修饰，以及在方法返回引用前加上 ref 修饰。

注：C# 开发的是托管代码，所以一般不希望程序员去操作指针。并由上述可知在使用过程中需要大量的使用 ref 来标明这是引用变量（编译后其

实没那么多），当然这也是为了提高代码的可读性。

总结：虽然 C# 7 中提供了局部引用和引用返回，但为了防止滥用所以也有诸多约束，如：

1. 你不能将一个值分配给 ref 变量，如：

```csharp
  ref int num = 10;   // error：无法使用值初始化按引用变量
```

2. 你不能返回一个生存期不超过方法作用域的变量引用，如：

```csharp
 public ref int GetLocalRef(int num) => ref num;   // error: 无法按引用返回参数，因为它不是 ref 或 out 参数
```

3. ref 不能修饰 “属性” 和 “索引器”。

```csharp
   var list = new List<int>();
   ref var n = ref list.Count;  // error: 属性或索引器不能作为 out 或 ref 参数传递
```

原理解析：非常简单就是指针传递，并且个人觉得此语法的使用场景非常有限，都是用来处理大对象的，目的是减少 GC 提高性能。

### 5. 局部函数（Local functions）

C# 7 中的一个功能“局部函数”，如下所示：

```csharp
static IEnumerable<char> GetCharList(string str)
   {
       if (IsNullOrWhiteSpace(str))
           throw new ArgumentNullException(nameof(str));

       return GetList();

       IEnumerable<char> GetList()
       {
           for (int i = 0; i < str.Length; i++)
           {
               yield return str[i];
           }
       }
   }
```

使用方法：

```csharp
   [数据类型,void] 方法名（[参数]）
  {
      // Method body；[] 里面都是可选项
  }
```

原理解析：局部函数虽然是在其他函数内部声明，但它编译后就是一个被 internal 修饰的静态函数，它是属于类，至于它为什么能够使用上级函

数中的局部变量和参数呢？那是因为编译器会根据其使用的成员生成一个新类型（Class/Struct）然后将其传入函数中。由上可知则局部函数的声

明跟位置无关，并可无限嵌套。

总结：个人觉得局部函数是对 C# 异常机制在语义上的一次补充（如上例），以及为代码提供清晰的结构而设置的语法。但局部函数也有其缺点，

就是局部函数中的代码无法复用（反射除外）。

### 6. 更多的表达式体成员（More expression-bodied members）

C# 6 的时候就支持表达式体成员，但当时只支持“函数成员”和“只读属性”，这一特性在 C# 7 中得到了扩展，它能支持更多的成员：构造函数

、析构函数、带 get，set 访问器的属性、以及索引器。如下所示：

```csharp
public class Student
  {
      private string _name;

      // Expression-bodied constructor
      public Student(string name) => _name = name;

      // Expression-bodied finalizer
      ~Student() => Console.WriteLine("Finalized!");

      // Expression-bodied get / set accessors.
      public string Name
      {
          get => _name;
          set => _name = value ?? "Mike";
      }

      // Expression-bodied indexers
      public string this[string name] => Convert.ToBase64String(Encoding.UTF8.GetBytes(name));
  }
```

备注：索引器其实在 C# 6 中就得到了支持，但其它三种在 C# 6 中未得到支持。

### 7. Throw 表达式（Throw expressions）

在 C#7.0 以前,我们想判断一个字符串是否为 null,如果为 null 则抛除异常,我们需要这么写:

```csharp
public string IsNull()
 {
        string a = null; if (a == null) { throw new Exception("异常了!"); } return a; }
}
```

样,我们就很不方便,特别是在三元表达式 或者非空表达式中,都无法抛除这个异常,需要写 if 语句.

那么我们在 C#7.0 中,可以这样:

```csharp
public string IsNull()
        {
            string a = null; return a ?? throw new Exception("异常了!"); }
}
```

### 8. 扩展异步返回类型（Generalized async return types）

以前异步的返回类型必须是：```Task```、```Task<T>```、```void```，现在 C# 7 中新增了一种类型：```ValueTask<T>```，如下所示：

```csharp
   public async ValueTask<int> Func()
   {
       await Task.Delay(3000);
      return 100;
   }
```

总结：```ValueTask<T>``` 与 ```ValueTuple``` 非常相似，所以就不列举： ```ValueTask<T>``` 与 ```Task``` 之间的异同了，但它们都是为了优化特定场景性能而

新增的类型。

使用 ```ValueTask<T>``` 则需要导入： Install - Package System.Threading.Tasks.Extensions

### 9. 数字文本语法的改进（Numeric literal syntax improvements）

C# 7 还包含两个新特性：二进制文字、数字分隔符，如下所示：

```csharp
  var one = 0b0001;
  var sixteen = 0b0001_0000;
  long salary = 1000_000_000;
  decimal pi = 3.141_592_653_589m;
```

注：二进制文本是以 0b（零 b）开头，字母不区分大小写；数字分隔符只有三个地方不能写：开头，结尾，小数点前后。

总结：二进制文本，数字分隔符 可使常量值更具可读性。
