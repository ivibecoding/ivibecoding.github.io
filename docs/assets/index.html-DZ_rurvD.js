import{_ as n,c as a,a as e,o as i}from"./app-BZ1Wmvro.js";const l="/assets/Class01-wk4cp0hH.png",p="/assets/Class02-zOy2yI7Y.png",c={};function d(t,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h4 id="关于javascript中class" tabindex="-1"><a class="header-anchor" href="#关于javascript中class"><span>关于javascript中class</span></a></h4><p><a href="https://www.typescriptlang.org/play?#code/FAQwRgzgLgTiDGUAE8A2IISQFQKbQCENcBvYJClAewDtoYBXRKmACgEozLukoALAJYQAdAH14fEDQDmuAMJUGNKBwDc5SgF8NFAA4wqUXIlwATJOHoJk4yTPmLlHAFxIAblQGn124GgxYeNBIuAAeRjSmgfhQRBCkOkj6Am4gRtRKyAC8SAAM6tz6hsZG5rZSsgqZLu6e5lw8FPxCwvCO2UgAjAVaiclOnIncbXRUqLjCqFTSrM0ibZnsPRTaviPBHTS4AO44MWrAUML9KksaQA" target="_blank" rel="noopener noreferrer">链接参考</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>abstract class TestBase{</span></span>
<span class="line"><span>    constructor(){</span></span>
<span class="line"><span>        this._changeCount();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    protected abstract _changeCount(): void;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Test extends TestBase{</span></span>
<span class="line"><span>    private count = 0;</span></span>
<span class="line"><span>    protected _changeCount(): void {</span></span>
<span class="line"><span>        this.count = 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    print(){</span></span>
<span class="line"><span>        console.log(this.count);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const t = new Test();</span></span>
<span class="line"><span>t.print();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+l+`" alt="图片"></p><h4 id="两个都有构造器的函数" tabindex="-1"><a class="header-anchor" href="#两个都有构造器的函数"><span>两个都有构造器的函数</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>export abstract class TestBase {</span></span>
<span class="line"><span>    protected count = 0;</span></span>
<span class="line"><span>    constructor() {</span></span>
<span class="line"><span>        this._changeCount();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    protected abstract _changeCount(): void;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export class Test extends TestBase {</span></span>
<span class="line"><span>    private childNumber: number = 8;</span></span>
<span class="line"><span>    constructor() {</span></span>
<span class="line"><span>        super();</span></span>
<span class="line"><span>        this.childNumber = 9;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    protected _changeCount(): void {</span></span>
<span class="line"><span>        this.count = 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print() {</span></span>
<span class="line"><span>        console.log(this.count);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const t = new Test();</span></span>
<span class="line"><span>t.print();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+p+'" alt="图片"></p><p>总结 TypeScript class 构造函数和成员的初始化顺序 ● 基类的成员初始化 ● 基类的构造函数初始化 ● 子类的成员初始化 ● 子类的构造函数初始化</p>',8)])])}const v=n(c,[["render",d]]),u=JSON.parse('{"path":"/docs/i8t3kype/","title":"Class","lang":"zh-CN","frontmatter":{"title":"Class","createTime":"2026/01/23 13:36:00","permalink":"/docs/i8t3kype/"},"readingTime":{"minutes":0.53,"words":158},"git":{"createdTime":1769153516000,"updatedTime":1769153516000,"contributors":[{"name":"Z小染","username":"","email":"ryning@sina.com","commits":1,"avatar":"https://gravatar.com/avatar/7097c8ff6482a07ed82070960a9644dc6c0e6b6954b8ae4d6b5bdba65812d1ad?d=retro"}]},"filePathRelative":"docs/Ts & Js/Class.md","headers":[]}');export{v as comp,u as data};
