---
title: SpanView<T>和ArrayView<T>使用指南
createTime: 2026/01/23 14:37:23
permalink: /docs/csharp/d6n16hxx/
---

## Introduction 简介
[Span](https://github.com/dotnet/corefxlab/blob/master/docs/specs/span.md)和[Memory](https://github.com/dotnet/corefxlab/blob/master/docs/specs/memory.md)是C# 7.2引入的新的数据结构类型，提高底层算法性能。

>:memo:**Span优势**
>- string类操作，避免多余allocation。
>- unmanaged code，stackalloc等，避免使用unsafe环境
>- Array T类型转换 [MemoryMashal.Cast](https://docs.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.memorymarshal.cast?view=netcore-3.1)

SpanView和Span一样为ref struct类型，只能存活在stack上。主要为了减少二进制bin文件读取后，需要转换为`T[]`，和`T[]`存储bin文件前需要转换为`byte[]`的多余allocation。

SpanView2D再SpanView基础上，增加了类似二维数组的读写操作。

ArrayView和ArrayView2D，类似Memory的使用，为了解决SpanView只能存活于stack的问题，如果需要Cache一段数据，保存再heap上（如全局变量，await等），使用ArrayView。

>:x:**常见误区**
>Span和Array在读写性能上[基本一致](https://adamsitnik.com/Span/#span-vs-array)， SpanView也基本一致。


|           Method |     Mean |  Allocated |
|----------------- |---------:|-----------:|
|       ReadNormal | 2.190 ms |          - |
|         ReadSpan | 2.219 ms |          - |
|     ReadSpanView | 2.569 ms |          - |
|        ReadArray | 2.197 ms |          - |
|    ReadArrayView | 2.217 ms |          - |
|      ReadArray2D | 2.419 ms |          - |
|  ReadArrayView2D | 2.628 ms |          - |
|       WriteArray | 6.188 ms | 19660824 B |
|   WriteArrayView | 6.224 ms | 19661284 B |
|     WriteArray2D | 7.245 ms | 19660840 B |
| WriteArrayView2D | 7.784 ms | 19661283 B |

## Design 设计

SpanView设计的原理：
内部一个`byte[] _rawData`作为数据Cache，`Span<T> _span`作为rawData的读写接口使用。对span的操作会映射到rawData的变化。

### SpanView

#### Create 创建

``` csharp
// 创建
var spanView = new SpanView<int>(length);
// 从文件读取
var spanView = SpanView<double>.FromFile(filePath);
```
#### Read Write 读写

``` csharp
spanView[0] = 1;
var result = span[0];
```

#### Save 存储

``` csharp
spanView.SaveFile(filePath);
```

### SpanView2D
API在SpanView基础上增加ColumnLength，其他基本相同。

``` csharp
var spanView2D = new SpanView<int>(rowLength, columnLength);
spanView2D[1,1] = 2;
spanView2D.SaveFile(filePath);
```

### ArrayView

#### Create
    
``` csharp
var arrayView = new ArrayView<double>(length);
var arrayView2D = ArrayView2D<double>.FromFile(filePath, columnLength);
```
#### Read Write
``` csharp
var span = arrayView.AsSpanView();
span[0] = 1;
var result = span[0];
```
#### Save
``` csharp
 arrayView.SaveFile(filePath);
```

### ArrayView2D
``` csharp
var arrayView2D = new ArrayView2D<double>(rowLength, columnLength);
var span = arrayView2D.AsSpanView2D();
double value = 0;
for (int i = 0; i < arrayView2D.RowLength; i++)
{
    for (int j = 0; j < arrayView2D.ColumnLength; j++)
    {
       span[i, j] = value++;
     }
}
```

## Usage 用例

### 从文件读取单维数组
File.ReadAllSpan()和SpanView.FromFile都可以使用。

#### 推荐使用的情况

#### 不推荐使用的情况

### 从文件读取二维数组

推荐使用SpanView2D.FromFile，使用便捷。

#### 推荐使用的情况

#### 不推荐使用的情况

### 文件读取整段原始数据，需要缓存
推荐使用ArrayView

#### 推荐使用的情况

#### 不推荐使用的情况

### 用于存储的数据
推荐使用ArrayView。

#### 推荐使用的情况
眼动处理后的多维数组，脑电、传感器数据的丢包插值

#### 不推荐使用的情况

### 数据分段和截取
需要存储推荐使用ArrayView，不需要则SpanView

## Reference 参考
[ref struct](https://docs.microsoft.com/zh-cn/dotnet/csharp/write-safe-efficient-code)

[Span简介](https://www.cnblogs.com/uoyo/p/12207148.html)
