---
title: Hash
createTime: 2026/01/23 14:34:22
permalink: /docs/csharp/chn8j5pj/
---
## 什么是Hash？
   > Hash 翻译做“散列”，也可直译为“哈希”，就是把任意长度的值输入，通过hash()函数输出固定长度的消息摘要。 Hash函数也有很多种，包括：直接取余法，乘法取整法，平方取中法，暂时先了解有这些方法即可。它其实就是一个算法，最简单的算法就是加减乘除，比方，我设计个数字算法，输入+7=输出，比如我输入1，输出为8；输入2，输出为9。

### Hash特性
  - 不可逆：
    在具备编码功能的同时，哈希算法也作为一种加密算法存在。即，你无法通过分析哈希值计算出源文件的样子，换句话说：你不可能通过观察香肠的纹理推测出猪原来的样子。
  - 计算极快：
    20G高清电影和一个5K文本文件复杂度相同，计算量都极小，可以在0.1秒内得出结果。也就是说，不管猪有多肥，骨头多硬，做成香肠都只要眨眨眼的时间。

## HashCode的作用？
-  HashCode的存在主要是为了查找的快捷性，HashCode是用来在散列存储结构中确定对象的存储地址的
- 如果两个对象equals相等，那么这两个对象的HashCode一定也相同
- 如果对象的equals方法被重写，那么对象的HashCode方法也尽量重写
- 如果两个对象的HashCode相同，不代表两个对象就相同，只能说明这两个对象在散列存储结构中，存放于同一个位置

### Hashcode和Equals
 例如内存中有这样的位置
 0 1 2 3 4 5 6 7
    而我有个类，这个类有个字段叫ID,我要把这个类存放在以上8个位置之一，如果不用Hashcode而任意存放，那么当查找时就需要到这八个位置里挨个去找，或者用二分法一类的算法。
    但如果用Hashcode那就会使效率提高很多。
    我们这个类中有个字段叫ID,那么我们就定义我们的Hashcode为ID％8，然后把我们的类存放在取得得余数那个位置。比如我们的ID为9，9除8的余数为1，那么我们就把该类存在1这个位置，如果ID是       13，求得的余数是5，那么我们就把该类放在5这个位置。这样，以后在查找该类时就可以通过ID除 8求余数直接找到存放的位置了。

   但是如果两个类有相同的Hashcode怎么办呢（我们假设上面的类的ID不是唯一的），例如9除以8和17除以8的余数都是1，那么这是不是合法的，回答是：可以这样。那么如何判断呢？在这个时候就需要定义 equals了。
    也就是说，我们先通过 Hashcode来判断两个类是否存放某个桶里，但这个桶里可能有很多类，那么我们就需要再通过 Equals 来在这个桶里找到我们要的类。
    那么。重写了equals()，为什么还要重写hashCode()呢？
    想想，你要在一个桶里找东西，你必须先要找到这个桶啊，你不通过重写Hashcode()来找到桶，光重写Equals()有什么用啊

## HashSet是什么?

 所谓的HashSet，指的就是 System.Collections.Generic 命名空间下的 `HashSet<T>` 类，它是一个高性能，无序的集合，因此HashSet它并不能做排序操作，也不能包含任何重复的元素，Hashset 也不能像数组那样使用索引，所以在 HashSet 上你无法使用 for 循环，只能使用 foreach 进行迭代，HashSet 通常用在处理元素的唯一性上有着超高的性能。

HashSet 只能包含唯一的元素，它的内部结构也为此做了专门的优化，值得注意的是，HashSet 也可以存放单个的 null 值，可以得出这么一个结论：如何你想拥有一个具有唯一值的集合，那么 HashSet 就是你最好的选择，何况它还具有超高的检索性能。

`HashSet<T>` 类 主要被设计用来存储集合，做高性能集运算，例如两个集合求交集、并集、差集等。从名称可以看出，它是基于Hash的，可以简单理解为没有Value 的 Dictionary。

优势在于集合运算快，作为一种存放在内存的数据，可以很快的进行设置和取值的操作。

### HashSet 特性
- `HashSet<T>` 的容量指的是可以容纳的元素总数，增减元素时，容量会自动增加，但不会自动减少。
- `HashSet<T>` 不自带排序方法，如果需要排序的可以参考使用 List 集合配合 Sort 方法。
- `HashSet<T>` 元素是唯一的，不可重复，同时区分大小写。
- `HashSet<T>` 不能使用下标来访问元素。

#638  HashSet使用案例

### `HashSet<T>` 的优势和与 `List<T>` 的比较

`HashSet<T>` 最大的优势是检索的性能，简单的说它的 Contains 方法的性能在大数据量时比 `List<T>` 好得多。

在内部算法实现上，`HashSet<T>` 的 Contains 方法复杂度是 O(1)，`List<T>` 的 Contains 方法复杂度是 O(n)，后者数据量越大速度越慢，而 `HashSet<T>`不受数据量的影响。
> 这里的方法复杂度就是 时间复杂度 和 空间复杂度 的综合评定。
时间复杂度和空间复杂度详解：
https://blog.csdn.net/qq_47897078/article/details/124646714
https://blog.csdn.net/qq_49613557/article/details/115301174


所以在集合的目的是为了检索的情况下，我们应该使用 `HashSet<T>` 代替 `List<T>` 。比如一个存储关键字的集合，运行的时候通过其 Contains 方法检查输入字符串是否关键字。

如果你必须建立新的设定，或者如果应用程序只需要存取提供的任务，那么使用任何的IEnumerable集合都已经足够了。但是，如果应用程序需要存取其他值，或则不建议不需要建立新的集合，这时可使用HashSet

### `HashSet<T>` 类的方法和属性

- `HashSet<T>` 类的一些常用的 属性：

属性 | 描述 
:----------- | :-----------: 
 Count  |     获取集合中现有元素的总数

- `HashSet<T>` 类的一些常用的 方法：

方法  | 描述 
:----------- | :-----------: 
bool Add (T item);      |   添加指定元素，返回bool值指示是否执行成功
bool Remove (T item); | 移除指定元素，返回bool值表示是否执行成功
void Clear ();    |  移除所有元素
bool Contains (T item);  |  判断是否包含指定元素
void CopyTo (T[] array);  |  复制元素到数组中
void ExceptWith (IEnumerable《T》 other);  |  移除当前集合中指定子集的元素
void IntersectWith (IEnumerable《T》 other);  |  修改当前集合元素为当前集合与指定集合的交集
void UnionWith (IEnumerable other);  |  修改当前集合元素为当前集合与指定集合的并集
bool IsProperSubsetOf (IEnumerable other);   |  判断当前集合是否为指定集合的真子集
bool IsProperSupersetOf (IEnumerable other);  |  判断当前集合是否为指定集合的真超集
bool IsSubsetOf (IEnumerable other);   |  判断当前集合是否为指定集合的子集
bool IsSupersetOf (IEnumerable other); |  判断当前集合是否为指定集合的超集
bool Overlaps (IEnumerable other);  | 判断当前集合是否与指定集合至少有一个公共元素
bool SetEquals (IEnumerable other); | 判断当前集合是否与指定集合包含相同的元素
bool TryGetValue (T equalValue, out T actualValue); |  搜索给定值，并返回所找到的相等值
void TrimExcess ();   |  将当前集合的容量设置为它包含的实际元素数

## HashTable简述

>在.NET Framework中，Hashtable是System.Collections命名空间提供的一个容器，用于处理和表现类似keyvalue的键值对，其中key通常可用来快速查找，同时key是区分大小写；value用于存储对应于key的值。Hashtable中keyvalue键值对均为object类型，所以Hashtable可以支持任何类型的keyvalue键值对.

#639  HashTable使用案例

## HashSet源码比较
> HashSet的内部实现跟Dictionary几乎是一模一样的，差别仅在于HashSet没有key，只有value，所以存储的时候是用value的HashCode值进行判断。

HashSet源码：https://source.dot.net/#System.Private.CoreLib/HashSet.cs
Dictionary源码：https://source.dot.net/#System.Private.CoreLib/Dictionary.cs