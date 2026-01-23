---
title: 原生类型和操作性能对比
createTime: 2026/01/23 14:32:51
permalink: /docs/csharp/xpkim7i5/
---

## array vs list
Currently List makes an "additional bounds check" to the one array does. In other words when accessing List indexer or list iterator it must make sure the index given is less than list size. Plus, iterator checks "version". That is relatively big overhead that makes accessing List much slower than array. 

## string vs StringBuilder vs span

## struct vs  class

## double vs  float

## if  vs switch

Notes, switch slower. It is tempting to think that a switch is always faster than an equivalent if-statement. However, this is not true.
And: A situation where the switch is slower is when the actual runtime of the program has a very skewed distribution of inputs.

Benchmark
So: If the input is almost always a specific value, then using an if-statement to test for that value may be faster.

## for vs foreach

对Array来说，for和foreach效率一样，推荐使用foreach
对List来说，for的效率高于foreach，推荐使用for

## dictionary vs linq
linq的ToArray和ToList效率一样，主要区别在于后期使用

## sort  SortedList vs  SortedDictionary

## Buffer.BlockCopy vs  Array.Copy

# C#、DotNet中常见的性能优化点

## Benchmark和源码查询
*Know What Things Cost.* （了解事情的成本）

编写代码时候要保持好奇心，了解常见底层方法和类的实现原理。既可以[学习他人编程的技巧](https://www.stevejgordon.co.uk/become-a-better-developer-by-reading-source-code)，也可以更好的决定如何实现功能。
比如：下面是`List<T>.Insert`的代码。可以看出insert并不是一个很高效的实现，在实现功能的时候应该尽量避免。
 ``` csharp
        public void Insert(int index, T item) {
            //如果超出Capacity，List内部的_items Array会Resize
            if (_size == _items.Length) EnsureCapacity(_size + 1); 
            if (index < _size) {
                //会把插入索引后的所有值向前Copy一遍
                Array.Copy(_items, index, _items, index + 1, _size - index);
            }
            _items[index] = item;
            _size++;            
        }
```

Benchmark作为测试性能的工具，也可以让我们对不同实现方法在不同情况下进行比较，更好的优化代码。

> <strong style="color:green;">提示</strong>
> - 不要**assume**，而是**measure**。熟知所有底层基础操作的成本。(for  foreach; list  array; dictionnary  find; switch  if;)
> - 并不是所有代码都需要Benchmark或者优化，主要是**Hot Path**关键路径中的方法。
> - Benchmark尽量模拟项目中使用案例。
> - 采用`[Params(length1,length2)]`可以同时模拟不同数据量的情况，注意[算法复杂度](https://baike.baidu.com/item/%E7%AE%97%E6%B3%95%E5%A4%8D%E6%9D%82%E5%BA%A6/210801?fr=aladdin)（时间和空间）O(f(N))

## Allocation减少没必要的内存分配
*The rule of thumb is to have objects de-allocated as fast as possible or not at all.*
（经验法则是尽可能快地回收对象，或者根本不回收）

在 .NET 应用程序中，内存和性能非常相关。内存管理不当会在许多方面影响性能。一种效应称为 GC 压力或内存压力。

GC 压力（垃圾回收器压力）是 GC 跟不上内存处理时的压力。当 GC 受到压力时，它将花费更多时间进行垃圾收集，并且这些收集将更频繁地出现。当程序花费更多时间进行垃圾收集时，它执行代码的时间会更少，从而直接损害性能。

### 常见的优化点：
- ✔**考虑**  使用ArraySegment、ArrayPool或者Span对数组分段处理
- ✔**考虑**  使用SpanView对文件进行读写
- **推荐** List、Collection、Dictionary等已知长度时候，新建应该设置初始Capacity
- ✔**考虑** 当string合并大于10个时候，应该是用`StringBuilder`，string复杂操作时候使用`Span`
- [了解更多](https://devblogs.microsoft.com/pfxteam/know-thine-implicit-allocations/)

## MemoryLeak内存泄漏

内存泄漏有两个相关的核心原因。第一个核心原因是，当对象仍然被引用，但实际上未使用。由于它们被引用，GC 不会收集它们，它们将永久保留，占用内存。例如，当您注册到事件但永远不会取消注册时，可能会发生这种情况。让我们称之为托管内存泄漏。

第二个原因是，当您以某种方式分配非托管内存（不进行垃圾回收）并且不释放它时。这并不难做到。.NET 本身有许多类分配非托管内存。几乎任何涉及流、图形、文件系统或网络调用的东西都这样做。通常，这些类实现`Dispose`方法，该方法释放内存。您可以使用特殊的 .NET 类（如`Marshal`）或使用 `PInvoke` 轻松分配非托管内存。

### 常见原因：
- 事件没有注销**监听**
- ❌**匿名函数**，会增加内部调用的变量所在Class的引用，作为Timer事件Handle时候或者在Task中长期运行时会出现内存泄漏。
- Static**静态变量**或者**全局单例**的变量中引用的类
- **Dispose**没有调用，或者Dispose中没有释放所有事件监听和其他继承Dispose的变量（如Bitmap）
- [了解更多](https://michaelscodingspot.com/ways-to-cause-memory-leaks-in-dotnet/)

## C#常见性能优化项
- **推荐** 使用**const**
- Array vs Collection vs Dictionary选择时，查询使用Dic，已知长度使用array等。
- ❌**避免** **Throwing Exceptions** 抛出和捕捉异常是非常昂贵的操作，应该在提前预知可能性的时候使用if或者类似TryParse的方法去避免TryCatch逻辑判断。
- ❌**避免** **Reflection** 反射是很耗时的操作，尽量避免。尽量使用基类或者接口。
- ❌**避免**  The **dynamic** type is particularly expensive. Try avoiding it entirely in hot paths.
- **禁止** **Boxing**避免装箱拆箱的操作，比如`HashTable`，`ArrayList`，或者方法接口使用**object**
- ✔**考虑** **Caching**数据，频繁访问数据或者操作比较费时的数据结果，应该考虑使用缓存或者文件暂存。Cache也不能太多，增加内存压力。Cache也有可能会引起内存泄漏，设计时候请考虑。Cache验证失效的机制也不能比信息获取消耗更大，适得其反。

## Hot Path关键访问路径

Hot Path是指程序中经常被调用的方法，关键功能的算法，比如以下几类：
- **数据库**读写，和实体模型之间**映射**
- **文件**读写和**序列化**
- 网络或者硬件**通讯**
- **海量**数据（>100）计算，查询，排序等
- 框架**底层**机制
- **公用**控件和帮助类

Hot Path中的方法实现应该尽量设计周全，进行必要的**Benchmark**和**Memory Diagnostic**（内存诊断)。
在关键的地方，除了上面提到的Allocation(内存分配)，Memory Leak（内存泄漏）等，下面这些看起来比较**极端**的操作也是必须考虑的。

- ✔**考虑**设计更好的**查询**方法，Dictionary或者Binary Search或者Cache查询的Index等。
- ❌**避免** 使用LINQ（ToArray，ToList，Min，Where等）OrderBy和Distinct考虑使用使用SortedList，HashSet等
- ✔**考虑** 相比List优先使用**Array**，相比foreach优先使用**for**
- ❌**避免** 循环里面判断，先**判断**再循环。循环中执行代码最简化，缓存**Cache**临时变量，而不是循环调用方法获取。
- ❌**避免** String的`Split`、`SubString`等，使用**Span**的Split和Slide
- ❌**避免** 方法参数使用param时候，应该实现常用个数（比如单参数和双参数）的情况，避免多余List的Allocation
- ✔**考虑** 参数或者变量使用具体的类，如`double[]`、`List<double>`，而不是接口Interface。
接口调用会有[多余开销](https://github.com/dotnet/runtime/issues/7291),考虑实现常用具类的方法，或者增加`is`的cast。如：`if(interface is double[] array){}`
- ✔**考虑** 个别情况使用[Struct或者ValueTuple](https://adamsitnik.com/Value-Types-vs-Reference-Types/)相比于Class，比如，当数据结构小于等于16bytes（4个int）大小的时候，struct更加高效。参考wpf中的Color和Point。
- ✔**考虑** 复杂Struct结构体尽量定义为readonly，传参时候使用ref，或者定义为readonly ref，减少没必要的内存复制。
- ✔**考虑** 极端情况下，256bytes大小内的数组考虑使用stackalloc。`Span<byte> bytes = stackalloc byte[2];`

## 参考
- ⭐官方dotnet https://docs.microsoft.com/en-us/dotnet/framework/performance/performance-tips
- ⭐官方readonly struct https://docs.microsoft.com/en-us/dotnet/csharp/write-safe-efficient-code
- ⭐ https://www.stevejgordon.co.uk/writing-high-performance-csharp-and-dotnet-code
- 视频教程Writing Allocation Free Code in C# https://www.bilibili.com/video/av39019704/
-  https://michaelscodingspot.com/performance-problems-in-csharp-dotnet/
-  https://michaelscodingspot.com/avoid-gc-pressure/
-  https://www.dotnetperls.com/optimization
-  https://github.com/adamsitnik/awesome-dot-net-performance