---
title: Unit Testing Best Practices | 单元测试指南
createTime: 2026/01/23 14:12:34
permalink: /docs/csharp/nleqajtc/
---

## Why unit test | 为何要做单元测试

### 减少功能测试Functional test的时间
功能测试需要运行程序，模拟客户操作。比较耗时，而且很难覆盖所有用户案例。

### 更放心的修改代码和添加功能
当加入或修改代码时候，单元测试可以一定程度保证系统的稳定性。除了当前代码的正确，还能保持其他关联部分也没有受到影响。

### 当做可执行文档和使用方法
单元测试也可以看做是公共API的可执行文档，给调用的人提供可视的调用案例和预期结果。

### 减少耦合代码
当代码耦合性比较高的时候，很难进行单元测试。书写单元测试也能让程序员书写代码的时候，考虑减低耦合性，提取公共逻辑。

## Characteristics | 什么是好的单元测试

- **高速** 一个大项目一般都有上千个单元测试，每个应该保证在毫秒级
- **独立** 单元测试应该是独立的运行，不需要任何其他依赖或者数据库、网络要求
- **简单** 单元测试应该简单明了，可读性高，避免复杂逻辑，易于维护。
- **全面** 应该覆盖所有可能出现的调用情况

## Naming your tests | 怎么给单元测试命名

- **命名空间**使用被测试命名空间加`.Test`。如`ErgoLAB.Algorithm.Analysis.Tests`是对`ErgoLAB.Algorithm.Analysis`的测试
- **TestClass**使用被测试文件加`Tests`后缀。如`TimeStatsTests`是对`TimeStats`的测试
- **TestMethod**三部分组成，下换线分割。[方法名]_[使用场景]_[预期结果]。如`Sum_EmptyArray_SameAsLinq`
- **Variables**变量命名
  - 预期结果`expected`
  - 得到的结果 `actual`
  - 模拟假数据加`fake`前缀

## Arranging your tests | 单元测试的组成

- **Arrange | 准备**队形，创建对象，进行必要的设置；
- **Act | 操作**对象；
- **Assert | 断言**某件事情是预期的。

``` csharp
[TestMethod("Add_空字符串_返回零")]
public void Add_EmptyString_ReturnsZero()
{
    // Arrange
    var stringCalculator = new StringCalculator();

    // Act
    var actual = stringCalculator.Add("");

    // Assert
    Assert.Equal(0, actual);
}
```

## Best practices | 其他最佳实践

### 不要复杂化测试 | Write minimally passing tests
- 简单明了，明确表明意图
- 避免其他引入错误。测试有错误，而去修代码就得不偿失。
- 数字用简单的`1+1`，数组元素两三个即为多，没必要随机一千个。
- 测试极值，精度，异常等，注意标明特殊值。如`const int MaxCount = 1001;`

### 避免写逻辑 | Avoid logic in tests
- for循环测试不同结果可以使用[DataRow](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-mstest#add-more-features)
- 使用`helper`或者`[ClassInitialize]` `[TestInitialize]`创建复杂或重复输入情况

### 避免一个测试多个断言 | Avoid multiple asserts
- 如果一个错了，下面的也无法通过。无法更好的定位错误
- 每种使用情况，一个测试。当出现错误，更好的了解为何出错。
- 使用`DataRow`，避免重复逻辑

### 通过公共方法测试私有方法 | Validate private methods by unit testing public methods
但多数情况，私有方法是不需要测试。如果有重要逻辑，可以通过调用的它的公共方法测试。

### 区分单元测试和集成测试
任何测试，如果它运行速度不快，结果不稳定，或者要用到被测试单元的一个或多个真实依赖物，我就认为它是集成测试。

> **集成测试**
> 是对一个工作单元进行的测试，这个测试对被测试的工作单元没有完全的控制，并使用该单元的一个或多个真实依赖物，例如事件、网络、数据库、线程或随机数产生器等。

集成测试和单元测试的项目应该分开。一般来说，复杂的测试都是集成测试，由于集成测试很慢，可以考虑使用创建一个只包含单元测试的解决方案，这样才可以频繁频繁地执行测试，实行TDD。

## Reference | 参考
- 官方 https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices
- 官方 https://docs.microsoft.com/zh-cn/visualstudio/test/unit-test-basics?view=vs-2019
- 博文 https://www.cnblogs.com/dino623/p/The_Art_of_unit_Testing.html