---
title: 如何避免内存泄漏
createTime: 2026/01/23 11:35:32
---

# 什么是GC
　　GC（Garbage Collector）就是垃圾收集器，当然这里仅就内存而言。以应用程序的root为基础，遍历应用程序在Heap上动态分配的所有对象，通过识别它们是否被引用来确定哪些对象是已经死亡的、哪些仍需要被使用。已经不再被应用程序的root或者别的对象所引用的对象就是已经死亡的对象，即所谓的垃圾，需要被回收。

## 什么是内存泄露
任何有经验的 .NET 开发人员都知道，即​​使 .NET 应用程序具有垃圾收集器，内存泄漏也会一直发生。并不是垃圾收集器有错误，只是我们可以很容易在托管语言中导致内存泄漏。随着内存泄漏，您的内存消耗会增加，从而产生 GC 压力和性能问题。最后，程序将因内存不足异常而崩溃。

## 发生内存泄露的原因

- 对象仍被引用但实际上未使用
由于它们被引用，GC 不会收集它们，它们将永远保留，占用内存。例如，当您注册事件但从未取消注册时，可能会发生这种情况。我们称之为托管内存泄漏。

- 以某种方式分配非托管内存（没有垃圾收集）并且不释放它时
.NET 本身有很多分配非托管内存的类。几乎所有涉及流、图形、文件系统或网络调用的事物都在幕后进行。通常，这些类实现一个Dispose方法，释放内存。您可以自己使用特殊的 .NET 类（如Marshal）或PInvoke轻松分配非托管内存。

## 常见的内存泄露
### 订阅事件
一旦您订阅了一个事件，该对象就会持有对您的类的引用。除非您使用未捕获类成员的匿名方法订阅。

```
public class MyClass
{
    public MyClass(WiFiManager wiFiManager)
    {
        wiFiManager.WiFiSignalChanged += OnWiFiChanged;
    }
 
    private void OnWiFiChanged(object sender, WifiEventArgs e)
    {
        // do something
    }
}
```

>**推荐方案**
取消订阅事件。
使用弱处理程序模式。
如果可能，请使用匿名函数订阅并且不捕获任何成员。

### 以匿名方式捕获成员

### 静态变量

### 缓存功能

### 不正确的 WPF 绑定

### 永不终止的线程

### 不释放非托管内存

### 添加 Dispose 而不调用它

## 参考
[GC垃圾回收原理](https://kb.cnblogs.com/page/106720/)
https://michaelscodingspot.com/ways-to-cause-memory-leaks-in-dotnet/
https://michaelscodingspot.com/find-fix-and-avoid-memory-leaks-in-c-net-8-best-practices/
