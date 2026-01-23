---
title: 项目中使用的代码规范
createTime: 2026/01/23 14:12:51
permalink: /docs/kguwzw4s/
---

代码可以根据是否是Hot Path分为两类：
- 正常代码(90%) **Safety > Readability > Performance**
- Hot Path(10%) **Performance = Safety > Readability**

- :100: **推荐**   const
- :+1:   **考虑**   ArraySegment
- ❌  **禁止** ArrayList
- :-1: **避免** List.Add()

## 参考
https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/
https://github.com/dotnet/runtime/tree/master/docs/coding-guidelines