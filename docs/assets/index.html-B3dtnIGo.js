import{_ as n,c as a,a as e,o as i}from"./app-BuzjU66J.js";const l="/assets/01-wk4cp0hH.png",c="/assets/02-zOy2yI7Y.png",t={};function p(d,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h4 id="关于javascript中class" tabindex="-1"><a class="header-anchor" href="#关于javascript中class"><span>关于javascript中class</span></a></h4><p><a href="https://www.typescriptlang.org/play?#code/FAQwRgzgLgTiDGUAE8A2IISQFQKbQCENcBvYJClAewDtoYBXRKmACgEozLukoALAJYQAdAH14fEDQDmuAMJUGNKBwDc5SgF8NFAA4wqUXIlwATJOHoJk4yTPmLlHAFxIAblQGn124GgxYeNBIuAAeRjSmgfhQRBCkOkj6Am4gRtRKyAC8SAAM6tz6hsZG5rZSsgqZLu6e5lw8FPxCwvCO2UgAjAVaiclOnIncbXRUqLjCqFTSrM0ibZnsPRTaviPBHTS4AO44MWrAUML9KksaQA" target="_blank" rel="noopener noreferrer">链接参考</a></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">abstract class TestBase{</span>
<span class="line">    constructor(){</span>
<span class="line">        this._changeCount();</span>
<span class="line">    }</span>
<span class="line">    protected abstract _changeCount(): void;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">class Test extends TestBase{</span>
<span class="line">    private count = 0;</span>
<span class="line">    protected _changeCount(): void {</span>
<span class="line">        this.count = 1;</span>
<span class="line">    }</span>
<span class="line">    print(){</span>
<span class="line">        console.log(this.count);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">const t = new Test();</span>
<span class="line">t.print();</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+l+`" alt="图片"></p><h4 id="两个都有构造器的函数" tabindex="-1"><a class="header-anchor" href="#两个都有构造器的函数"><span>两个都有构造器的函数</span></a></h4><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">export abstract class TestBase {</span>
<span class="line">    protected count = 0;</span>
<span class="line">    constructor() {</span>
<span class="line">        this._changeCount();</span>
<span class="line">    }</span>
<span class="line">    protected abstract _changeCount(): void;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">export class Test extends TestBase {</span>
<span class="line">    private childNumber: number = 8;</span>
<span class="line">    constructor() {</span>
<span class="line">        super();</span>
<span class="line">        this.childNumber = 9;</span>
<span class="line">    }</span>
<span class="line">    protected _changeCount(): void {</span>
<span class="line">        this.count = 1;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    print() {</span>
<span class="line">        console.log(this.count);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">const t = new Test();</span>
<span class="line">t.print();</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+c+'" alt="图片"></p><p>总结 TypeScript class 构造函数和成员的初始化顺序 ● 基类的成员初始化 ● 基类的构造函数初始化 ● 子类的成员初始化 ● 子类的构造函数初始化</p>',8)])])}const v=n(t,[["render",p]]),u=JSON.parse('{"path":"/code/web/ts/%E7%BB%A7%E6%89%BF%E7%B1%BB%E7%9A%84%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F/","title":"","lang":"zh-CN","frontmatter":{},"git":{"contributors":[{"name":"Z小染","username":"","email":"ryning@sina.com","commits":1}],"changelog":[{"hash":"995f6bbc4321146d3e553a3bd6419e75fc085035","time":1666772012000,"email":"ryning@sina.com","author":"Z小染","message":"add file"}]},"filePathRelative":"code/web/ts/继承类的执行顺序/index.md"}');export{v as comp,u as data};
