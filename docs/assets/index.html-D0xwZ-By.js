import{_ as s,c as n,a,o as l}from"./app-BuzjU66J.js";const i={};function t(d,e){return l(),n("div",null,[...e[0]||(e[0]=[a(`<ul><li>在哈希表中添加一个keyvalue键值对：HashtableObject.Add(key,value);</li><li>在哈希表中去除某个keyvalue键值对：HashtableObject.Remove(key);</li><li>从哈希表中移除所有元素： HashtableObject.Clear();</li><li>判断哈希表是否包含特定键key： HashtableObject.Contains(key);</li></ul><p>下面控制台程序将包含以上所有操作：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">using System; </span>
<span class="line">using System.Collections; //file使用Hashtable时，必须引入这个命名空间 </span>
<span class="line">class hashtable </span>
<span class="line">{ </span>
<span class="line">public static void Main() </span>
<span class="line">{ </span>
<span class="line">Hashtable ht=new Hashtable(); //file创建一个Hashtable实例 </span>
<span class="line">ht.Add(E,e);//添加keyvalue键值对 </span>
<span class="line">ht.Add(A,a); </span>
<span class="line">ht.Add(C,c); </span>
<span class="line">ht.Add(B,b); </span>
<span class="line">string s=(string)ht[A]; </span>
<span class="line">if(ht.Contains(E)) //file判断哈希表是否包含特定键,其返回值为true或false </span>
<span class="line">Console.WriteLine(the E keyexist); </span>
<span class="line">ht.Remove(C);//移除一个keyvalue键值对 </span>
<span class="line">Console.WriteLine(ht[A]);此处输出a </span>
<span class="line">ht.Clear();//移除所有元素 </span>
<span class="line">Console.WriteLine(ht[A]); //file此处将不会有任何输出 </span>
<span class="line">} </span>
<span class="line">} </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>遍历哈希表 遍历哈希表需要用到DictionaryEntry Object或Hashtable.GetEnumerator()方法，代码如下：</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">for(DictionaryEntry de in ht) //ht为一个Hashtable实例 </span>
<span class="line">{ </span>
<span class="line">Console.WriteLine(de.Key);  //de.Key对应于keyvalue键值对key </span>
<span class="line">Console.WriteLine(de.Value);  //de.Key对应于keyvalue键值对value </span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>对哈希表进行排序 对哈希表进行排序在这里的定义是对keyvalue键值对中的key按一定规则重新排列，但是实际上这个定义是不能实现的，因为我们无法直接在Hashtable进行对key进行重新排列，如果需要Hashtable提供某种规则的输出，可以采用一种变通的做法：</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ArrayList akeys=new ArrayList(ht.Keys); //file别忘了导入System.Collections </span>
<span class="line">akeys.Sort(); //file按字母顺序进行排序 </span>
<span class="line">for(string skey in akeys) </span>
<span class="line">{ </span>
<span class="line">Console.Write(skey + ); </span>
<span class="line">Console.WriteLine(ht[skey]);//排序后输出 </span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)])])}const r=s(i,[["render",t]]),v=JSON.parse('{"path":"/code/dotnet/Hash/HashTable/","title":"","lang":"zh-CN","frontmatter":{},"git":{"contributors":[{"name":"Z小染","username":"","email":"ryning@sina.com","commits":1}],"changelog":[{"hash":"995f6bbc4321146d3e553a3bd6419e75fc085035","time":1666772012000,"email":"ryning@sina.com","author":"Z小染","message":"add file"}]},"filePathRelative":"code/dotnet/Hash/HashTable/index.md"}');export{r as comp,v as data};
