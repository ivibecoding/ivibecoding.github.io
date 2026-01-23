import{_ as n,c as a,a as e,o as i}from"./app-Cjs9rSt5.js";const l={};function p(r,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<p>上传测试视频和音频得时候已经统一将类型进行更改 类型正确 上传流仍403 第一种使用原生Http上传</p><p><a href="https://blog.csdn.net/ahwangzc/article/details/121563470" target="_blank" rel="noopener noreferrer">参考链接</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>getImageFileFromUrl(url, imageName) {</span></span>
<span class="line"><span>      let p = new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>        var blob = null;</span></span>
<span class="line"><span>        var xhr = new XMLHttpRequest();</span></span>
<span class="line"><span>        xhr.open(&quot;GET&quot;, url);</span></span>
<span class="line"><span>        xhr.setRequestHeader(&quot;Accept&quot;, &quot;image/jpeg&quot;);</span></span>
<span class="line"><span>        xhr.responseType = &quot;blob&quot;;</span></span>
<span class="line"><span>        xhr.onload = () =&gt; {</span></span>
<span class="line"><span>          blob = xhr.response;</span></span>
<span class="line"><span>          let imgFile = new File([blob], imageName, {type: &quot;image/jpeg&quot;});</span></span>
<span class="line"><span>          resolve(imgFile);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>        xhr.send();</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>      return p;</span></span>
<span class="line"><span>    },</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第二种-使用fetch" tabindex="-1"><a class="header-anchor" href="#第二种-使用fetch"><span>第二种:使用fetch</span></a></h3><p><a href="https://segmentfault.com/a/1190000042295695#comment-area" target="_blank" rel="noopener noreferrer">参考链接地址</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>imgUrlToFomdata (url) {</span></span>
<span class="line"><span>  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>    fetch(url)</span></span>
<span class="line"><span>      .then(respone =&gt; respone.blob())</span></span>
<span class="line"><span>      .then(blob =&gt; {</span></span>
<span class="line"><span>        const formData = new FormData();</span></span>
<span class="line"><span>        const { type } = blob</span></span>
<span class="line"><span>        const imgSuffix = type.substring(6)</span></span>
<span class="line"><span>        // 不设置名字和后缀，接口会报错401，具体看后端接口代码</span></span>
<span class="line"><span>        const fileName = \`\${new Date().getTime()}.\${imgSuffix}\`</span></span>
<span class="line"><span>        const file = new File([blob], fileName, { type });</span></span>
<span class="line"><span>        formData.append(&#39;file&#39;, file, fileName);</span></span>
<span class="line"><span>        resolve(formData)</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>      .catch(error =&gt; {</span></span>
<span class="line"><span>        reject(error)</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第三种-使用url转database64-database64转换file或者blob" tabindex="-1"><a class="header-anchor" href="#第三种-使用url转database64-database64转换file或者blob"><span>第三种:使用url转database64 database64转换file或者blob</span></a></h3><p><a href="https://blog.csdn.net/xingxingxingge/article/details/121996752" target="_blank" rel="noopener noreferrer">参考链接地址</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>function urlToBase64(url) {</span></span>
<span class="line"><span>    return new Promise((resolve) =&gt; {</span></span>
<span class="line"><span>      fetch(url).then(data =&gt; {</span></span>
<span class="line"><span>        const blob = data.blob()</span></span>
<span class="line"><span>        return blob;</span></span>
<span class="line"><span>      }).then(blob =&gt; {</span></span>
<span class="line"><span>        let reader = new FileReader()</span></span>
<span class="line"><span>        reader.onloadend = function () {</span></span>
<span class="line"><span>          const dataURL = reader.result</span></span>
<span class="line"><span>          // console.log(&#39;base64地址：&#39;, dataURL)</span></span>
<span class="line"><span>          resolve(dataURL)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        reader.readAsDataURL(blob)</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> function base64ToFile(dataURL) {</span></span>
<span class="line"><span>    var arr = dataURL?.split?.(&#39;,&#39;)</span></span>
<span class="line"><span>    let mime = arr[0].match(/:(.*?);/)[1]</span></span>
<span class="line"><span>    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);</span></span>
<span class="line"><span>    while (n--) {</span></span>
<span class="line"><span>      u8arr[n] = bstr.charCodeAt(n);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    let filename = new Date().getTime() + &quot;&quot; + Math.ceil(Math.random() * 100) + &quot;.&quot; + mime.split(&quot;/&quot;)[1]</span></span>
<span class="line"><span>    return (new File([u8arr], filename, { type: mime }))</span></span>
<span class="line"><span>  }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)])])}const t=n(l,[["render",p]]),c=JSON.parse('{"path":"/docs/Web/Ts%20_%20Js/UrlToFile.html","title":"Url转File","lang":"zh-CN","frontmatter":{"title":"Url转File"},"readingTime":{"minutes":0.98,"words":294},"git":{},"filePathRelative":"docs/Web/Ts & Js/UrlToFile.md","headers":[]}');export{t as comp,c as data};
