---
title: 代码可读性
createTime: 2026/01/23 14:12:34
---

> <strong style="color:green;">Key Idea</strong>
> Code should be written to minimize the time it would take for someone else to understand it.

## Naming | 命名

### 让命名变得有意义
- ✔**推荐** 在你的代码中使用有意义的名称去命名你的变量和方法等。我们应该通过名称就可以知道该变量或者方法的大致用途，优雅的代码应该是自解释的。一个好的名称要比一个泛泛的命名加上一堆注释行之有效。
- ❌**避免** tmp、list、value等通用的名称

### 命名不能带来歧义
- ✔**考虑** 必要时增加重要细节，如：时间增加InMs后缀表明毫秒计时，未处理的数据增加Raw前缀
- ✔**考虑** 方法采用动词，越明确的意义的越好。如：避免全篇使用GetXXX，使用Calc，Fetch，Read，Check等可能会更好。

### 布尔类型命名
- ✔**推荐** 使用is、has、can、use、should等前缀，后面加形容词（Visible）或者被动词（Changed）
- ❌**避免** 使用**否定**术语命名，如 `bool disableBtn = false`， 改为 `bool isBtnEnabled = true`会更容易理解

### List、Array、Dictionary命名
- ✔**推荐** 采用后缀而不是采用复数，如`Subjects`应该使用`SubjectCollection`
- ✔**考虑** Dictionary增加key类型的描述，如`_idSubjectDict`

### 其他命名规范
- ✔**考虑** Class采用名词，抽象基类应该添加Base后缀
- ✔**推荐** Interface添加I前缀，单方法的接口可以使用方法名的形容词，如：`ICloneable`
- ✔**推荐** 异步方法添加Async后缀
- ✔**考虑** private变量命名时常用名词可以使用**缩写**，减少长度。方法或者public属性使用**全称**。

### 命名方式应该保持一致性
- ✔**推荐** 在命名前应该先**参考**系统内其他类似模块的命名方式，还可以参看框架内底层库的命名方式。
- ✔**推荐** 如果没有参考，应遵循上面的原则。

## Commenting and Documentation | 注释和文档

### 避免无用注释
- ❌**避免** 注释那些代码或命名可以明确解释含义的地方
- ✔**考虑**  注释要言简意赅，避免无信息量的**废话**

### 注释你写代码思考过程
- ✔**考虑** 选择采用这种实现方法而不是其他方法的原因。比如：用SpanView而不是Span，是因为DotNetFramework中`File.WriteAllBytes`接口不接受`Span`，只接受`byte[]`
- ✔**推荐** 解释const常量为什么这么赋值
- ✔**考虑** 用注释记录编程思路和流程（VS中Task List可以查看所有特殊标记的注释）
  - **TODO**：有待实现的地方。如 //TODO 添加用户行为记录
  - **FIXME**/名字简写：已知有问题的地方。如 //FIXME 数据长度过短会造成输出为null
  - **HACK**：现有实现方法不是很完美，有待改善。如 //HACK 每次被选中都会执行读取和刷新操作，是否可以引入cache机制提高效率

### 从读者的视角编写注释
- ✔**考虑** 预测别人会觉得你代码中**难懂**的地方，添加注释
- ✔**考虑** 注释代码中**不寻常**的实现方面。
- ✔**推荐** 公共方法存在**不同实现方法**，或调用有**注意事项**时。比如`ShowWaitDialog`四种接口的使用场景
- ✔**推荐** 公共class头部增加**Big Picture**注释，解释整个类的用途和使用场景。如：ThemeHelper是用来改变系统主题色和明暗色系

## Simplicity and Clarity | 简洁清晰

### 提高**Control Flow | 控制流**的可读性
- ✔**推荐** 条件表达式中，左侧是变量，右侧是常数。如使用`if(i < MaxLimit)`而不是`if(MaxLimit > i)`
- ✔**考虑** 只有在逻辑简单的情况下使用 ? : 三目运算符来使代码更紧凑，否则应该拆分成 if / else
- ✔**考虑** do / while 的条件放在后面，不够简单明了，并且会有一些迷惑的地方，最好使用 while 来代替
- ✔**考虑** 如果只有一个 goto 目标，那么 goto 尚且还能接受，但是过于复杂的 goto 会让代码可读性特别差，应该避免使用 goto
- ✔**推荐** 在嵌套的循环中，用一些 return 语句往往能减少嵌套的层数
- ✔**考虑** 不要使用难懂技巧性很高的语句，除非很有必要时。如`return ++i;`

### 拆分长表达式
- ✔**考虑** 注意运算符优先级，并用**括号**明确表达式的操作顺序，避免使用默认优先级
- ✔**考虑** 可以引入一些**解释变量**从而拆分表达式，如 `bool canProcess = (selected != null && (paramChanged || isInit))`
### 变量和常量
- **禁止** 使用不易理解的数字**Magic Number**，用有意义的const或者enum来替代。
- ✔**考虑** 除了使用const，尽量使用readonly，IReadOnly等**只读**变量，更清楚的表明代码意图

### 优化代码结构
- ✔**推荐** 关系比较紧密的代码应尽可能**相邻**。使用region去按照功能分组
- ✔**推荐** 把大问题**拆分**成小问题，再把这些问题的解决方案放回一起。
- ✔**推荐** 公共方法，常用方法的**提取**。不要重复，DRY(Don't repeat yourself)
- ✔**考虑** 代码功能应该尽量**单一**，只做一件事的代码更易懂。

## Learn to Get Better | 提高能力

- **English**：代码是全球性的语言，英文也是代码的统一语言。英文读写作为程序员的必备技能，想要提高编程能力，英文是必经之路。
- **Source Code**：闭门造车在现在日新月异的时代，肯定是会被淘汰。不管是底层还是第三方库，要善于学习，善于借鉴。
- **Self Review**：提交前自我审核，对自己编写的代码要负责任。只是为了完成任务而编写的代码，永远不会是好的代码。
- **Habit**：提高能力是个日积月累的过程，培养良好的习惯才是关键。
  - 合理规划自己的工作计划
  - 属于自己的思考和审核流程
  - 系统的学习计划
  - 善于总结和记录

## 参考 | References
-  编写可读代码的艺术 | The Art of Readable Code - O'Reilly Media
- 官方命名指南 https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/
-  https://github.com/Wei-Xia/most-frequent-technology-english-words