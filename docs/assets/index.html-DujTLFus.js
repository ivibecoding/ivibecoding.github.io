import{_ as n,c as a,a as e,o as i}from"./app-BZ1Wmvro.js";const l={};function p(d,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h2 id="partial-type" tabindex="-1"><a class="header-anchor" href="#partial-type"><span><code>Partial&lt;Type&gt;</code></span></a></h2><p><code>Partial&lt;T&gt; </code>可以快速把某个接口类型中定义的属性变成可选的 源代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>type Partial&lt;T&gt; = {</span></span>
<span class="line"><span>    [P in keyof T]?: T[P];</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface {</span></span>
<span class="line"><span>age:number</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>interface IUser={</span></span>
<span class="line"><span>  name:string;</span></span>
<span class="line"><span>  age:number  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type optional = Partial&lt;IUser&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//转化后的结果</span></span>
<span class="line"><span>type optional = {</span></span>
<span class="line"><span>  name?:string;</span></span>
<span class="line"><span>  age?:number</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目实战:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>//materialForm.ts  43</span></span>
<span class="line"><span>type IMaterialVarLength = Partial&lt;IStimuliInputKey&lt;number&gt;&gt;;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="required-type" tabindex="-1"><a class="header-anchor" href="#required-type"><span><code>Required&lt;Type&gt;</code></span></a></h2><p>和Partial刚好相反，将一个定义中的属性全部变成必选参数.让一个类型的属性全部必填 源代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>type Required&lt;T&gt; = {</span></span>
<span class="line"><span>    [P in keyof T]-?: T[P];</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>interface Person {</span></span>
<span class="line"><span>    name: string;</span></span>
<span class="line"><span>    age?: number;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type person = Required&lt;Person&gt;;</span></span>
<span class="line"><span>// person === {name: string; age: number}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目实战:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>interface IExtraProps {</span></span>
<span class="line"><span>    placeholder?: string;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//input audioInput.ts</span></span>
<span class="line"><span>	protected _getRestOfCompProps(): Required&lt;IExtraProps&gt; {</span></span>
<span class="line"><span>		return {</span></span>
<span class="line"><span>			placeholder: this._props.placeholder,</span></span>
<span class="line"><span>		};</span></span>
<span class="line"><span>	}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="readonly-type" tabindex="-1"><a class="header-anchor" href="#readonly-type"><span><code>Readonly&lt;Type&gt;</code></span></a></h2><p>如果要求对象中的一些字段只能在创建的时候被赋值，使用 readonly 定义只读属性。(只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候) 源代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>type Readonly&lt;T&gt; = {</span></span>
<span class="line"><span>    readonly [P in keyof T]: T[P];</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>举例</span></span>
<span class="line"><span>interface Person {</span></span>
<span class="line"><span>    readonly id: number;</span></span>
<span class="line"><span>    name: string;</span></span>
<span class="line"><span>let tom: Person = {</span></span>
<span class="line"><span>    id: 89757,</span></span>
<span class="line"><span>    name: &#39;Tom&#39;,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>tom.id = 9527;      //  Cannot assign to &#39;id&#39; because it is a constant or a read-only</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目实战</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>//share form.ts (68)</span></span>
<span class="line"><span>readonly inputConfig: Readonly&lt;TInputConfig&gt;;</span></span>
<span class="line"><span>readonly value: Readonly&lt;TValue&gt;;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="record-keys-type" tabindex="-1"><a class="header-anchor" href="#record-keys-type"><span><code>Record&lt;Keys, Type&gt;()</code></span></a></h2><p><code>Record&lt;K,T&gt;</code>具有给定类型T的一组属性K的类型。在将一个类型的属性映射到另一个类型的属性时，Record非常方便。 <a href="https://zhuanlan.zhihu.com/p/356662885" target="_blank" rel="noopener noreferrer">相关解释</a> 源代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>type Record&lt;K extends keyof any, T&gt; = {</span></span>
<span class="line"><span>    [P in K]: T;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>type person6 = Record&lt;&#39;name&#39; | &#39;age&#39;, string&gt;</span></span>
<span class="line"><span>// person6 === {name: string; age: string}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type CatName = &quot;miffy&quot; | &quot;boris&quot;</span></span>
<span class="line"><span>const cats: Record&lt;CatName, person6&gt; = {</span></span>
<span class="line"><span>   miffy: { name: 10, age: &quot;Persian&quot; },</span></span>
<span class="line"><span>   boris: { name: 5, age: &quot;Maine Coon&quot; },</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目实战</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>//layoutInput.ts</span></span>
<span class="line"><span>export class LayoutInputConfig extends InputConfigBase&lt;</span></span>
<span class="line"><span>	ILayoutInputSetting,</span></span>
<span class="line"><span>	ILayoutValue,</span></span>
<span class="line"><span>	Record&lt;string, any&gt;</span></span>
<span class="line"><span>&gt; {</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//Record&lt;string, any&gt;</span></span>
<span class="line"><span>// {</span></span>
<span class="line"><span>    [x: string]: person6;   //索引签名</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>name:any</span></span>
<span class="line"><span>sex:angry</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>综合实战应用1</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>//针对Paradigm 中blockForm.ts</span></span>
<span class="line"><span>export const blockInputPresets: Partial&lt;Record&lt;keyof IBlockValue, IInputPropPreset&gt;&gt; = {</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// * 执行keyof IBlockValue 的联合类型 例如maxPump | gain | count;</span></span>
<span class="line"><span>// * 执行Record maxPump：IInputPropPreset，gain：IInputPropPreset，count：IInputPropPreset   </span></span>
<span class="line"><span>export type IInputPropPreset = {</span></span>
<span class="line"><span>	label: string;</span></span>
<span class="line"><span>	description?: string;</span></span>
<span class="line"><span>	constraint?: INumberConstraint;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>// * 执行Partial里面的参数 都是不必填内容</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pick-type-keys-部分选择" tabindex="-1"><a class="header-anchor" href="#pick-type-keys-部分选择"><span><code>Pick&lt;Type, Keys&gt;</code> (部分选择)</span></a></h2><p>》可能需要从一个已声明的类型中抽取出一个子类型，在子类型中包含父类型中的部分或全部属性，这时我们可以使用Pick来实现， 源代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>type Pick&lt;T, K extends keyof T&gt; = {</span></span>
<span class="line"><span>    [P in K]: T[P];</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>举例</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface User {</span></span>
<span class="line"><span>    id: number;</span></span>
<span class="line"><span>    name: string;</span></span>
<span class="line"><span>    age: number;</span></span>
<span class="line"><span>    gender: number;</span></span>
<span class="line"><span>    email: string;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>type PickUser = Pick&lt;User, &quot;id&quot; | &quot;name&quot; | &quot;gender&quot;&gt;;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>// 等价于</span></span>
<span class="line"><span>type PickUser = {</span></span>
<span class="line"><span>    id: number;</span></span>
<span class="line"><span>    name: string;</span></span>
<span class="line"><span>    gender: number;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>项目实战</span></span>
<span class="line"><span>//multiLevelInput.ts</span></span>
<span class="line"><span>const defaultSetting: Pick&lt;IMultiLevelInputSetting, &#39;level&#39;&gt; = {</span></span>
<span class="line"><span>	level: {</span></span>
<span class="line"><span>		constraint: numberConstraints.int_1_20,</span></span>
<span class="line"><span>		lengthRange: numberConstraints.int_1_20,</span></span>
<span class="line"><span>	},</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export interface IMultiLevelInputSetting {</span></span>
<span class="line"><span>    /** 默认值 int 1-20 */</span></span>
<span class="line"><span>    level?: {</span></span>
<span class="line"><span>        constraint: INumberConstraint;</span></span>
<span class="line"><span>        lengthRange: IRange;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    varSettings: IMultiLevelVarNumberSetting[];</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="omit-type-keys-属性忽略" tabindex="-1"><a class="header-anchor" href="#omit-type-keys-属性忽略"><span><code>Omit&lt;Type, Keys&gt;</code>（属性忽略）</span></a></h2><p>与Pick相反，Pick用于拣选出我们需要关心的属性，而Omit用于忽略掉我们不需要关心的属性</p><p>举例</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>interface User {</span></span>
<span class="line"><span>    id: number;</span></span>
<span class="line"><span>    name: string;</span></span>
<span class="line"><span>    age: number;</span></span>
<span class="line"><span>    gender: number;</span></span>
<span class="line"><span>    email: string;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>// 表示忽略掉User接口中的age和email属性</span></span>
<span class="line"><span>type OmitUser = Omit&lt;User, &quot;age&quot; | &quot;email&quot;&gt;;</span></span>
<span class="line"><span>// 等价于</span></span>
<span class="line"><span>type OmitUser = {</span></span>
<span class="line"><span>  id: number;</span></span>
<span class="line"><span>  name: string;</span></span>
<span class="line"><span>  gender: number;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目实战</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>	//所有的block.ts文件中</span></span>
<span class="line"><span>  protected _createConstants(</span></span>
<span class="line"><span>		blockValue: IBlockValue</span></span>
<span class="line"><span>	): Omit&lt;ITrialConstants, &#39;feedback&#39; | &#39;fileManager&#39;&gt; {</span></span>
<span class="line"><span>		return { keys: blockValue.key, area: blockValue.area, pos: blockValue.pos };</span></span>
<span class="line"><span>	}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>条件类型 (参考地址)[https://blog.csdn.net/diecuoxie4468/article/details/102360892?spm=1001.2101.3001.6650.1&amp;utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-102360892-blog-104111165.pc_relevant_antiscanv2&amp;depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-102360892-blog-104111165.pc_relevant_antiscanv2&amp;utm_relevant_index=2]</p><h2 id="exclude-uniontype-excludedmembers" tabindex="-1"><a class="header-anchor" href="#exclude-uniontype-excludedmembers"><span><code>Exclude&lt;UnionType, ExcludedMembers&gt;</code></span></a></h2><p>一个类型从另一个类型中剔除部分属性key 源码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>type Exclude&lt;T, U&gt; = T extends U ? never : T;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>举例</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>type T0 = Exclude&lt;&quot;a&quot; | &quot;b&quot; | &quot;c&quot;, &quot;a&quot;&gt;;</span></span>
<span class="line"><span>type T0 = &quot;b&quot; | &quot;c&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type T1 = Exclude&lt;&quot;a&quot; | &quot;b&quot; | &quot;c&quot;, &quot;a&quot; | &quot;b&quot;&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type T1 = &quot;c&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//解释 对于联合类型，是如何进行类比的？</span></span>
<span class="line"><span>T1 = | (&quot;a&quot; extends &quot;a&quot; | &quot;b&quot; ? never : &quot;a&quot;)</span></span>
<span class="line"><span>  | (&quot;b&quot; extends &quot;a&quot; | &quot;b&quot; ? never : &quot;b&quot;)</span></span>
<span class="line"><span>  | (&quot;c&quot; extends &quot;a&quot; | &quot;b&quot; ? never : &quot;c&quot;)</span></span>
<span class="line"><span>最终结果 T1 = &quot;c&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type T2 = Exclude&lt;string | number | (() =&gt; void), Function&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T2 = string | number</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目实战</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>// orderedBlock.ts</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export type ILevelVarPool&lt;T extends IOrderedTrialLevel&gt; = {</span></span>
<span class="line"><span>	[key in Exclude&lt;keyof T, &#39;index&#39;&gt;]: Array&lt;T[key]&gt;;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>//is.ts    如果value不是null的为true</span></span>
<span class="line"><span>export function noNull&lt;T&gt;(v: T | null): v is Exclude&lt;T, null&gt; {</span></span>
<span class="line"><span>	return v !== null;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="extract-type-union" tabindex="-1"><a class="header-anchor" href="#extract-type-union"><span><code>Extract&lt;Type, Union&gt;</code></span></a></h2><p>Extract 的功能，与 Exclude 相反，它是 提取 T 中可以赋值给 U 的类型</p><p>源码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>type Extract&lt;T, U&gt; = T extends U ? T : never;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>举例</span></span>
<span class="line"><span>type T0 = Extract&lt;&quot;a&quot; | &quot;b&quot; | &quot;c&quot;, &quot;a&quot; | &quot;f&quot;&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T0 = &quot;a&quot;</span></span>
<span class="line"><span>type T1 = Extract&lt;string | number | (() =&gt; void), Function&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T1 = () =&gt; void</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目实战暂无</p><h2 id="nonnullable-type" tabindex="-1"><a class="header-anchor" href="#nonnullable-type"><span><code>NonNullable&lt;Type&gt;</code></span></a></h2><p>非空类型中排除 null 和 undefined</p><p>举例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>type T04 = NonNullable&lt;string | number | undefined&gt;;  // string | number</span></span>
<span class="line"><span>type T05 = NonNullable&lt;(() =&gt; string) | string[] | null | undefined&gt;;  // (() =&gt; string) | string[]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>项目案例</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>export function notNullish&lt;T&gt;(v: T | null | undefined): v is NonNullable&lt;T&gt; {</span></span>
<span class="line"><span>	// eslint-disable-next-line unicorn/no-null</span></span>
<span class="line"><span>	return v != null;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="returntype-函数返回值类型" tabindex="-1"><a class="header-anchor" href="#returntype-函数返回值类型"><span><code>ReturnType</code>（函数返回值类型）</span></a></h2><p><code>ReturnType&lt;T&gt;</code>的作用是用于获取函数 T 的返回类型。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>declare function f1(): { a: number; b: string };</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>type T0 = ReturnType&lt;() =&gt; string&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T0 = string</span></span>
<span class="line"><span>type T1 = ReturnType&lt;(s: string) =&gt; void&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T1 = void</span></span>
<span class="line"><span>type T2 = ReturnType&lt;&lt;T&gt;() =&gt; T&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T2 = unknown</span></span>
<span class="line"><span>type T3 = ReturnType&lt;&lt;T extends U, U extends number[]&gt;() =&gt; T&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T3 = number[]</span></span>
<span class="line"><span>type T4 = ReturnType&lt;typeof f1&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T4 = {</span></span>
<span class="line"><span>    a: number;</span></span>
<span class="line"><span>    b: string;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目实战无</p><h2 id="parameters-函数参数类型" tabindex="-1"><a class="header-anchor" href="#parameters-函数参数类型"><span><code>Parameters</code>（函数参数类型）</span></a></h2><p>Parameters的作用是用于获取函数 T 的参数类型</p><p>举例</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>// 获取函数所有参数的类型元组</span></span>
<span class="line"><span>type T0 = Parameters&lt;() =&gt; string&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T0 = []</span></span>
<span class="line"><span>type T1 = Parameters&lt;(s: string) =&gt; void&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T1 = [s: string]</span></span>
<span class="line"><span>type T2 = Parameters&lt;&lt;T&gt;(arg: T) =&gt; T&gt;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>type T2 = [arg: unknown]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目实战无</p>`,65)])])}const r=n(l,[["render",p]]),c=JSON.parse('{"path":"/docs/qhp7g8w1/","title":"常用的高级类型","lang":"zh-CN","frontmatter":{"title":"常用的高级类型","createTime":"2026/01/23 12:35:12","permalink":"/docs/qhp7g8w1/"},"readingTime":{"minutes":4.16,"words":1248},"git":{"createdTime":1769153516000,"updatedTime":1769153516000,"contributors":[{"name":"Z小染","username":"","email":"ryning@sina.com","commits":1,"avatar":"https://gravatar.com/avatar/7097c8ff6482a07ed82070960a9644dc6c0e6b6954b8ae4d6b5bdba65812d1ad?d=retro"}]},"filePathRelative":"docs/Ts & Js/Advanced Type.md","headers":[]}');export{r as comp,c as data};
