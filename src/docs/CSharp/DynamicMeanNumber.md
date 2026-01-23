---
title: 无缓存计算平均数
createTime: 2026/01/23 11:42:12
permalink: /docs/csharp/jl7gfmod/
---

实时计算平均数，减少缓存

```csharp

public static double Mean(double value, double mean, int index)
{
    double delta = value - mean;
    double scaleDelta = delta / ++index;
    mean += scaleDelta;

    return mean;
}

```