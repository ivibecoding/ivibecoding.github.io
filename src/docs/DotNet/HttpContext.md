---
title: HttpContext.Items vs HttpContext.Features
createTime: 2026/01/23 11:33:16
permalink: /docs/dotnet/kmg93oan/
---

## HttpContext.Items

- `​HttpContext.Items​​`​ 是设计用来存储键-值对的, 存储在当前请求上下文中共享的数据
- `HttpContext.Items` 是设计用来存储在单个请求中短期存在的数据

## HttpContext.Features

​`​HttpContext.Features`​​​ 是设计用来存储类型-实例 ​ 对的, 它是一个 `​​IFeatureCollection​`​ 的实例，该实例表示一组 HTTP 特性的集合

- `IAuthenticationFeature` 存储原始的 PathBase 和 原始的 Path
- `ISessionFeature` 存储当前的 Session
- `IHttpConnectionFeature` 存储了当前的底层连接

为了便于存储和提取 ​​ 类型-实例 ​​ 对，IFeatureCollection 接口定义了如下 3 个重要方法：

```cs
public interface IFeatureCollection : IEnumerable<KeyValuePair<Type, object>>{
    object this[Type key] { get; set; }
    TFeature Get<TFeature>();
    void Set<TFeature>(TFeature instance);
}
```

在 `IFeatureCollection` 的实现类 `FeatureCollection` 中，将获取的值简单地转型为要求的类型

```cs
public class FeatureCollection : IFeatureCollection
{
    public TFeature Get<TFeature>()
    {
        return (TFeature)this[typeof(TFeature)];
    }

    public void Set<TFeature>(TFeature instance)
    {
        this[typeof(TFeature)] = instance;
    }
}
```

> 在当前请求中不需要存储 2 个 `​​IHttpConnectionFeature​​`​ 实例，或者 2 个 ​`​ISession​​ `，尽管从技术上来说，你可以使用 `FeatureColliection` 来存储其它的类型-值对，但最好不要这样做，`​​Set<TFeature>(TFeature instance)​​ `方法在类型已经存储集合中的时候，会简单地替换掉原来的实例，这就意味着如果你希望存储同一类型的两个实例，是做不到的。

`HttpContext.Features` 是设计用来共享不同的 HTTP 特性的，这使得中间件可以创建或者修改应用程序的主机处理管线。通过 .NET 本身已经创建了一系列的特性，例如 `IHttpSendFileFeature`。

## 结论

应该只使用 `HttpContext.Items` 来存储数据，使用 `HttpContext.Features` 来添加新的其它中间件可能会使用的 HTTP 特性。