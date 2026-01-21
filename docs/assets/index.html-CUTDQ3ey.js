import{_ as n,c as e,a,o as i}from"./app-BuzjU66J.js";const t="/assets/01-Dhqh6W4-.png",l="/assets/02-C8e3K8aQ.png",u="/assets/03-DAT6URq0.png",d="/assets/04-B_mDdf3S.png",r="/assets/05-DboBxRKN.png",c="/assets/06-BZezygzE.png",o={};function p(v,s){return i(),e("div",null,[...s[0]||(s[0]=[a(`<h3 id="从-hashset-中查找一个元素" tabindex="-1"><a class="header-anchor" href="#从-hashset-中查找一个元素"><span>从 HashSet 中查找一个元素</span></a></h3><p>如果想判断某一个元素是否在 HashSet 内，建议使用 Contains 进行判断，代码如下：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">static void Main(string[] args)</span>
<span class="line">        {</span>
<span class="line">            HashSet&lt;string&gt; hashSet = new HashSet&lt;string&gt;();</span>
<span class="line">            hashSet.Add(&quot;A&quot;);</span>
<span class="line">            hashSet.Add(&quot;B&quot;);</span>
<span class="line">            hashSet.Add(&quot;C&quot;);</span>
<span class="line">            hashSet.Add(&quot;D&quot;);</span>
<span class="line">            if (hashSet.Contains(&quot;D&quot;))</span>
<span class="line">                Console.WriteLine(&quot;The required element is available.&quot;);</span>
<span class="line">            else</span>
<span class="line">                Console.WriteLine(&quot;The required element isn’t available.&quot;);</span>
<span class="line">            Console.ReadKey();</span>
<span class="line">        }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hashset中的元素唯一性" tabindex="-1"><a class="header-anchor" href="#hashset中的元素唯一性"><span>HashSet中的元素唯一性</span></a></h3><p>如果你向 HashSet 中插入重复的元素，它的内部会忽视这次操作而不像别的集合一样抛出异常，接下来展示一下代码：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">  static void Main(string[] args)</span>
<span class="line">        {</span>
<span class="line">            HashSet&lt;string&gt; hashSet = new HashSet&lt;string&gt;();</span>
<span class="line">            hashSet.Add(&quot;A&quot;);</span>
<span class="line">            hashSet.Add(&quot;B&quot;);</span>
<span class="line">            hashSet.Add(&quot;C&quot;);</span>
<span class="line">            hashSet.Add(&quot;D&quot;);</span>
<span class="line">            hashSet.Add(&quot;D&quot;);</span>
<span class="line">            Console.WriteLine(&quot;The number of elements is: {0}&quot;, hashSet.Count);</span>
<span class="line">            Console.ReadKey();</span>
<span class="line">        }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你执行了这个程序，输出结果如下图： <img src="`+t+`" alt="图片"></p><h3 id="现在可以考虑一下下面的代码段-它展示了重复的元素是如何被剔除的。" tabindex="-1"><a class="header-anchor" href="#现在可以考虑一下下面的代码段-它展示了重复的元素是如何被剔除的。"><span>现在可以考虑一下下面的代码段，它展示了重复的元素是如何被剔除的。</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"> static void Main(string[] args)</span>
<span class="line">        {</span>
<span class="line">            string[] cities = new string[] {</span>
<span class="line">                &quot;Delhi&quot;,</span>
<span class="line">                &quot;Kolkata&quot;,</span>
<span class="line">                &quot;New York&quot;,</span>
<span class="line">                &quot;London&quot;,</span>
<span class="line">                &quot;Tokyo&quot;,</span>
<span class="line">                &quot;Washington&quot;,</span>
<span class="line">                &quot;Tokyo&quot;</span>
<span class="line">            };</span>
<span class="line">            HashSet&lt;string&gt; hashSet = new HashSet&lt;string&gt;(cities);</span>
<span class="line">            foreach (var city in hashSet)</span>
<span class="line">            {</span>
<span class="line">                Console.WriteLine(city);</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你执行完上面的程序，重复的城市名称已经被移除了。 <img src="`+l+`" alt="图片"></p><h3 id="从-hashset-中移除元素" tabindex="-1"><a class="header-anchor" href="#从-hashset-中移除元素"><span>从 HashSet 中移除元素</span></a></h3><p>从HashSet 中删除某一个元素可以调用 Remove 方法，它的语法结构如下：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">string[] list= new string[] {</span>
<span class="line">                &quot;A&quot;,</span>
<span class="line">                &quot;B&quot;,</span>
<span class="line">                &quot;C&quot;,</span>
<span class="line">                &quot;D&quot;,</span>
<span class="line">                &quot;E&quot;,</span>
<span class="line">                &quot;F&quot;,</span>
<span class="line">                &quot;G&quot;</span>
<span class="line">            };</span>
<span class="line"> HashSet&lt;string&gt; hashSet = new HashSet&lt;string&gt;(list);</span>
<span class="line">string item = &quot;D&quot;;</span>
<span class="line">if(hashSet.Contains(item))</span>
<span class="line">{</span>
<span class="line">   hashSet.Remove(item);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">//删除 HashSet 中的所有元素</span>
<span class="line">hashSet.Clear();</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hashset-的-set操作" tabindex="-1"><a class="header-anchor" href="#hashset-的-set操作"><span>HashSet 的 set操作</span></a></h3><p>HashSet提供了非常多的方法用于 set集合 操作上，比如说：IntersectWith, UnionWith, IsProperSubsetOf, ExceptWith, 和 SymmetricExceptWith</p><ul><li>IsProperSubsetOf 这个 IsProperSubsetOf 用于判断 HashSet 是否为某一个集合的完全子集，可以看下面的例子：</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">HashSet&lt;string&gt; setA = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot; };</span>
<span class="line">HashSet&lt;string&gt; setB = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;X&quot; };</span>
<span class="line">HashSet&lt;string&gt; setC = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;, &quot;E&quot; };</span>
<span class="line">if (setA.IsProperSubsetOf(setC))</span>
<span class="line">   Console.WriteLine(&quot;setC contains all elements of setA.&quot;);</span>
<span class="line">if (!setA.IsProperSubsetOf(setB))</span>
<span class="line">   Console.WriteLine(&quot;setB does not contains all elements of setA.&quot;);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你执行了上面这个程序，你会在控制台上看到如下的输出： <img src="`+u+`" alt="图片"></p><ul><li>UnionWith UnionWith方法常用于集合的合并，比如说下面的代码：</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">HashSet&lt;string&gt; setA = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;, &quot;E&quot; };</span>
<span class="line">HashSet&lt;string&gt; setB = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;X&quot;, &quot;Y&quot; };</span>
<span class="line">setA.UnionWith(setB);</span>
<span class="line">foreach(string str in setA)</span>
<span class="line">{</span>
<span class="line">   Console.WriteLine(str);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你执行完上面的代码，SetB 集合会被 SetA 集合吞掉，最后 SetA 集合将会是包括：&quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;, &quot;E&quot;, &quot;X&quot;, and &quot;Y&quot; 。</p><ul><li>IntersectWith IntersectWith 方法常用于表示两个 HashSet 的交集，下面的例子或许会让你更加理解：</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">HashSet&lt;string&gt; setA = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;, &quot;E&quot; };</span>
<span class="line">HashSet&lt;string&gt; setB = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;X&quot;, &quot;C&quot;, &quot;Y&quot;};</span>
<span class="line">setA.IntersectWith(setB);</span>
<span class="line">foreach (string str in setA)</span>
<span class="line">{</span>
<span class="line">    Console.WriteLine(str);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你运行了上面的这段程序，只有两个 HashSet 中都存在的元素才会输出到控制台中，输出结果如下所示： <img src="`+d+`" alt="图片"></p><ul><li>ExceptWith ExceptWith 方法表示数学上的减法操作，这个时间复杂度是 O(N)，假定你有两个HashSet 集合，分别叫 setA 和 setB，并且用了下面的语句。</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">setA.ExceptWith(setB);</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>它返回的元素为： setA中有，setB中没有 的最终结果，如果还不明白的话,使用如下代码辅助理解：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">HashSet&lt;string&gt; setA = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;, &quot;E&quot; };</span>
<span class="line">HashSet&lt;string&gt; setB = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;X&quot;, &quot;C&quot;, &quot;Y&quot; };</span>
<span class="line">setA.ExceptWith(setB);</span>
<span class="line">foreach (string str in setA)</span>
<span class="line">{</span>
<span class="line">   Console.WriteLine(str);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你执行了上面这段程序，元素 B,D,E 将会输出到控制台上。 <img src="`+r+`" alt="图片"></p><ul><li>SymmetricExceptWith SymmetricExceptWith 方法常用于修改一个 HashSet 来存放两个 HashSet 都是唯一的元素，换句话说，我要的就是两个集合都不全有的元素，如果还不明白的话，考虑下面的代码段：</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">HashSet&lt;string&gt; setA = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;, &quot;E&quot; };</span>
<span class="line">HashSet&lt;string&gt; setB = new HashSet&lt;string&gt;() { &quot;A&quot;, &quot;X&quot;, &quot;C&quot;, &quot;Y&quot; };</span>
<span class="line">setA.SymmetricExceptWith(setB);</span>
<span class="line">foreach (string str in setA)</span>
<span class="line">{</span>
<span class="line">  Console.WriteLine(str);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你执行完上面的代码，你会发现，setA中有而setB中没有 和 setB中有而setA中没有的元素将会输出到控制台中。 <img src="`+c+'" alt="图片"></p><p>我们知道数组的平均复杂度是 O(N)，这里的 n 表示数组里的元素数量，而访问 HashSet 中的某一个元素，它的复杂度为 O(1)，这个常量复杂度就决定了 HashSet 在快速检索 和执行 set集合 操作上是一个非常好的选择，你也可以使用 List 去存储某些有指定顺序的元素，同时也可以包含重复的值。</p>',33)])])}const m=n(o,[["render",p]]),q=JSON.parse('{"path":"/code/dotnet/Hash/HashSet/","title":"","lang":"zh-CN","frontmatter":{},"git":{"contributors":[{"name":"Z小染","username":"","email":"ryning@sina.com","commits":1}],"changelog":[{"hash":"995f6bbc4321146d3e553a3bd6419e75fc085035","time":1666772012000,"email":"ryning@sina.com","author":"Z小染","message":"add file"}]},"filePathRelative":"code/dotnet/Hash/HashSet/index.md"}');export{m as comp,q as data};
