import{_ as n,c as a,a as e,o as i}from"./app-DCWaDjZv.js";const l={};function p(d,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<ul><li>在哈希表中添加一个keyvalue键值对：HashtableObject.Add(key,value);</li><li>在哈希表中去除某个keyvalue键值对：HashtableObject.Remove(key);</li><li>从哈希表中移除所有元素： HashtableObject.Clear();</li><li>判断哈希表是否包含特定键key： HashtableObject.Contains(key);</li></ul><p>下面控制台程序将包含以上所有操作：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>using System; </span></span>
<span class="line"><span>using System.Collections; //file使用Hashtable时，必须引入这个命名空间 </span></span>
<span class="line"><span>class hashtable </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>public static void Main() </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>Hashtable ht=new Hashtable(); //file创建一个Hashtable实例 </span></span>
<span class="line"><span>ht.Add(E,e);//添加keyvalue键值对 </span></span>
<span class="line"><span>ht.Add(A,a); </span></span>
<span class="line"><span>ht.Add(C,c); </span></span>
<span class="line"><span>ht.Add(B,b); </span></span>
<span class="line"><span>string s=(string)ht[A]; </span></span>
<span class="line"><span>if(ht.Contains(E)) //file判断哈希表是否包含特定键,其返回值为true或false </span></span>
<span class="line"><span>Console.WriteLine(the E keyexist); </span></span>
<span class="line"><span>ht.Remove(C);//移除一个keyvalue键值对 </span></span>
<span class="line"><span>Console.WriteLine(ht[A]);此处输出a </span></span>
<span class="line"><span>ht.Clear();//移除所有元素 </span></span>
<span class="line"><span>Console.WriteLine(ht[A]); //file此处将不会有任何输出 </span></span>
<span class="line"><span>} </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>遍历哈希表 遍历哈希表需要用到DictionaryEntry Object或Hashtable.GetEnumerator()方法，代码如下：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>for(DictionaryEntry de in ht) //ht为一个Hashtable实例 </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>Console.WriteLine(de.Key);  //de.Key对应于keyvalue键值对key </span></span>
<span class="line"><span>Console.WriteLine(de.Value);  //de.Key对应于keyvalue键值对value </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>对哈希表进行排序 对哈希表进行排序在这里的定义是对keyvalue键值对中的key按一定规则重新排列，但是实际上这个定义是不能实现的，因为我们无法直接在Hashtable进行对key进行重新排列，如果需要Hashtable提供某种规则的输出，可以采用一种变通的做法：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>ArrayList akeys=new ArrayList(ht.Keys); //file别忘了导入System.Collections </span></span>
<span class="line"><span>akeys.Sort(); //file按字母顺序进行排序 </span></span>
<span class="line"><span>for(string skey in akeys) </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>Console.Write(skey + ); </span></span>
<span class="line"><span>Console.WriteLine(ht[skey]);//排序后输出 </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)])])}const c=n(l,[["render",p]]),r=JSON.parse('{"path":"/docs/csharp/x27q8el7/","title":"HashTable","lang":"zh-CN","frontmatter":{"title":"HashTable","createTime":"2026/01/23 14:33:59","permalink":"/docs/csharp/x27q8el7/"},"readingTime":{"minutes":1.37,"words":410},"git":{},"filePathRelative":"docs/csharp/Hash/HashTable.md","headers":[]}');export{c as comp,r as data};
