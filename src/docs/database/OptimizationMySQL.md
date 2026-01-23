---
title: MySQL 优化
createTime: 2026/01/23 11:47:57
permalink: /docs/database/hl6vq0lv/
---

## 配置

### 硬件

- IO 密集型操作程序<磁盘的写入和磁盘的读取>磁盘性能比较好，最好选择 SSD，其次 SATA
- CPU 标准
- 网络 1G NIC 网卡

### 软件

- Linux 一定是 64 位的
- MySQL 64 位
- Linux 文件系统 [ext3 ext4] xfs {ext3 稳定很多年} {xfs 并发处理读取能力} {版本 漏洞 恢复数据}
- SSD/xfs 20000 次/s

## 表/字段设计

### 三范式

数据库中很多表设计标准
标准一：1NF[最低]
标准二：2NF[高一些]
标准三：3NF[最高一些]

1NF：表中的字段都是单一的属性

- id int
- name varchar

2NF：实体属性完全依赖主关键字

- 数据冗余多
- 更新问题多
  解决方法：拆表

3NF：不存在非关键字对任一候选关键字有<传递依赖关系>

::: danger
反 3NF：为了性能要求不完全满足 3NF
:::

### 设计表的注意事项

#### 表存储引擎

- myisam 简单，查询速度快，不支持事务与外键
- memory 速度快，不安全
- innodb 最佳选择。
  create table t_user(
  )engine=innodb

#### 编码

建议使用 utf8

> 乱码
> jdbc/mysql
> url=jdbc/mysql/127.0.0.1/note?useUnicode=true&&characterEncoding=utf-8

- 编码是 utf8
  CREATE DATABASE note DEFAULT CHARACTER SET utf8

- 导入表 utf8{顺序}
  set names utf8;
  source d:/note.sql;

#### 表设计上优化

- 一个库最多 300 到 400 张表
- 单张表不超过 50 个纯 INT 字段
- 单张表不超过 20 个 char（10）个字段
- 尽量使用最小范围原则

示例：表设计时的优化

```sql
--age tinyint<127~-128>
--int(1) int(10)区别----int 范围是<21 亿~-21 亿>
-- fill zero 1\10 是宽度，不够则在前面补 0.
--char(5) 保存多少字符----（5 个汉字或 5 个字符）
--货币 decimal(10,2)高精度的浮点数----共 10 为包括 2 位小数
--性别：char(1) enum('男'，‘女’) 枚举
--手机号：bigint 数字占 8 个字节
--尽可能的把类型转换为数字，数字的效率高
--ip 地址 char(15) bigint
inet_aton();//把地址转换为数字
select inet_aton（‘192.168.10.1’）;
inet_ntoa();//把数字转换为 ip 地址
---尽量少用 text/blob 类型
varchar() utf8 21000 汉字
---图片不要存储在数据库中。。。。将图片放在文件夹中，将文件夹的路径存放在数据库
---不要在表中出现 null 记录---->有 null 很难进行优化，添加的索引不生效，计算不准确
解决：name varchar(25) not null default '',

age tinyint not null default 0,
ctime timestamp not null default '0000-00-00'
---建表时库的名、表的名、列的名 全小写
---每一张表尽量要创建一个无意义的主键（设计原则：任何有意义的事务都可能发生改变）
COMMENT ‘’注释
---尽量不要再线上的库添加列，添加几个备用的列，小表添加 2 个，大表添加 8 个（一半整型一半 varchar）
```

### 树状结构的表的设计

```sql
 id oname sn pid{父机构id} level{级别}
```

### 权限管理表的设计

- t_user
  id name pwd type {用户类型}
  0 普通用户
  1 管理员

- 完善[RBAC 权限管理模型]
  基于角色的访问控制

- t_module 模块表
- 人员管理
- 财务管理
  t_user 用户表
  t_role 角色表
  t_user_role 用户与角色关系表
  t_acl 授权表

### 蜜罐的设计(防止攻击)

在项目中添加从名字上看很重要的表，添加几条记录，给表添加个触发器，将查询表的人员记录下来

- 用户表
- 银行交易记录表

## 事务/索引/SQL 分析

多条不可分割的 sql 语句叫做一个事务

- 全局事务：不同数据库之间事务处理
- 局部事务：同一个数据库内部

### 事务特性：ACID

- a:原子性 不可分割
- c:隔离性 事务和事务之间操作互不影响
- i:一致性 事务的开始结束状态一致，
- d:持久性 事务结束，数据永久保存

```sql
begin：#开启事务
commit： #提交事务
rollback #事务回滚
set autocommit=0 禁止自动提交
数据迁移操作引发的问题：
```

可能引发的问题

- 脏读：一个事务读取到另一个事务未提交数据。
- 不可重复读：一个事务内部两次读取不一致
- 幻读：

解决方法：调整事务的隔离级别

::: tip
ISOLATION_DETAUL #默认
ISOLATION_UNCOMMITED #读 未提交
ISOLATION_READ_COMMITED #读 提交 orcal 默认
ISOLATION_REPEATABLE_READ #重复读 mysql 默认
ISOLATION_SERIALIZABLE #串读
show variables like '%iso%';
:::

## 索引

索引是数据库中的一个对象
作用：提高查询效率
原理：二分法查找 每个表的前面有个物理编号，地址 0x001...
迁移时应将表的索引一同迁移。
使用索引查询快，但是增删改较慢，需要操作两张表（索引表和用户表）
索引的类型：

- 普通索引
- 唯一索引
- 组合索引（优选）
- 全文索引 (不用)
- 位图索引（mysql 不支持）
- 前缀索引

```sql
create index idx_t_user_id on t_user(列名，列名)
```

查看索引

```sql
show indexes from 表名\G
```

## 参考资料
- [MySQL常见的三种存储引擎（InnoDB、MyISAM、MEMORY）](https://zhuanlan.zhihu.com/p/508538016)