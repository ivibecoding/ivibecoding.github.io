---
title: HashTable
createTime: 2026/01/23 14:33:59
permalink: /docs/ydsfsbgr/
---
- 在哈希表中添加一个keyvalue键值对：HashtableObject.Add(key,value);
- 在哈希表中去除某个keyvalue键值对：HashtableObject.Remove(key);
- 从哈希表中移除所有元素： HashtableObject.Clear();
- 判断哈希表是否包含特定键key： HashtableObject.Contains(key);

下面控制台程序将包含以上所有操作： 

```
using System; 
using System.Collections; //file使用Hashtable时，必须引入这个命名空间 
class hashtable 
{ 
public static void Main() 
{ 
Hashtable ht=new Hashtable(); //file创建一个Hashtable实例 
ht.Add(E,e);//添加keyvalue键值对 
ht.Add(A,a); 
ht.Add(C,c); 
ht.Add(B,b); 
string s=(string)ht[A]; 
if(ht.Contains(E)) //file判断哈希表是否包含特定键,其返回值为true或false 
Console.WriteLine(the E keyexist); 
ht.Remove(C);//移除一个keyvalue键值对 
Console.WriteLine(ht[A]);此处输出a 
ht.Clear();//移除所有元素 
Console.WriteLine(ht[A]); //file此处将不会有任何输出 
} 
} 

```
- 遍历哈希表
遍历哈希表需要用到DictionaryEntry Object或Hashtable.GetEnumerator()方法，代码如下：

```
for(DictionaryEntry de in ht) //ht为一个Hashtable实例 
{ 
Console.WriteLine(de.Key);  //de.Key对应于keyvalue键值对key 
Console.WriteLine(de.Value);  //de.Key对应于keyvalue键值对value 
}
```
- 对哈希表进行排序
对哈希表进行排序在这里的定义是对keyvalue键值对中的key按一定规则重新排列，但是实际上这个定义是不能实现的，因为我们无法直接在Hashtable进行对key进行重新排列，如果需要Hashtable提供某种规则的输出，可以采用一种变通的做法：

```
ArrayList akeys=new ArrayList(ht.Keys); //file别忘了导入System.Collections 
akeys.Sort(); //file按字母顺序进行排序 
for(string skey in akeys) 
{ 
Console.Write(skey + ); 
Console.WriteLine(ht[skey]);//排序后输出 
}
```