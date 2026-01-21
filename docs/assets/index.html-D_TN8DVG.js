import{_ as s,c as e,a,o as l}from"./app-BuzjU66J.js";const i={};function r(c,n){return l(),e("div",null,[...n[0]||(n[0]=[a(`<h1 id="url转file得尝试" tabindex="-1"><a class="header-anchor" href="#url转file得尝试"><span>url转file得尝试</span></a></h1><p>上传测试视频和音频得时候已经统一将类型进行更改 类型正确 上传流仍403 第一种使用原生Http上传</p><p><a href="https://blog.csdn.net/ahwangzc/article/details/121563470" target="_blank" rel="noopener noreferrer">参考链接</a></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">getImageFileFromUrl(url, imageName) {</span>
<span class="line">      let p = new Promise((resolve, reject) =&gt; {</span>
<span class="line">        var blob = null;</span>
<span class="line">        var xhr = new XMLHttpRequest();</span>
<span class="line">        xhr.open(&quot;GET&quot;, url);</span>
<span class="line">        xhr.setRequestHeader(&quot;Accept&quot;, &quot;image/jpeg&quot;);</span>
<span class="line">        xhr.responseType = &quot;blob&quot;;</span>
<span class="line">        xhr.onload = () =&gt; {</span>
<span class="line">          blob = xhr.response;</span>
<span class="line">          let imgFile = new File([blob], imageName, {type: &quot;image/jpeg&quot;});</span>
<span class="line">          resolve(imgFile);</span>
<span class="line">        };</span>
<span class="line">        xhr.send();</span>
<span class="line">      });</span>
<span class="line">      return p;</span>
<span class="line">    },</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第二种-使用fetch" tabindex="-1"><a class="header-anchor" href="#第二种-使用fetch"><span>第二种:使用fetch</span></a></h3><p><a href="https://segmentfault.com/a/1190000042295695#comment-area" target="_blank" rel="noopener noreferrer">参考链接地址</a></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">imgUrlToFomdata (url) {</span>
<span class="line">  return new Promise((resolve, reject) =&gt; {</span>
<span class="line">    fetch(url)</span>
<span class="line">      .then(respone =&gt; respone.blob())</span>
<span class="line">      .then(blob =&gt; {</span>
<span class="line">        const formData = new FormData();</span>
<span class="line">        const { type } = blob</span>
<span class="line">        const imgSuffix = type.substring(6)</span>
<span class="line">        // 不设置名字和后缀，接口会报错401，具体看后端接口代码</span>
<span class="line">        const fileName = \`\${new Date().getTime()}.\${imgSuffix}\`</span>
<span class="line">        const file = new File([blob], fileName, { type });</span>
<span class="line">        formData.append(&#39;file&#39;, file, fileName);</span>
<span class="line">        resolve(formData)</span>
<span class="line">      })</span>
<span class="line">      .catch(error =&gt; {</span>
<span class="line">        reject(error)</span>
<span class="line">      });</span>
<span class="line">  })</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第三种-使用url转database64-database64转换file或者blob" tabindex="-1"><a class="header-anchor" href="#第三种-使用url转database64-database64转换file或者blob"><span>第三种:使用url转database64 database64转换file或者blob</span></a></h3><p><a href="https://blog.csdn.net/xingxingxingge/article/details/121996752" target="_blank" rel="noopener noreferrer">参考链接地址</a></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">function urlToBase64(url) {</span>
<span class="line">    return new Promise((resolve) =&gt; {</span>
<span class="line">      fetch(url).then(data =&gt; {</span>
<span class="line">        const blob = data.blob()</span>
<span class="line">        return blob;</span>
<span class="line">      }).then(blob =&gt; {</span>
<span class="line">        let reader = new FileReader()</span>
<span class="line">        reader.onloadend = function () {</span>
<span class="line">          const dataURL = reader.result</span>
<span class="line">          // console.log(&#39;base64地址：&#39;, dataURL)</span>
<span class="line">          resolve(dataURL)</span>
<span class="line">        }</span>
<span class="line">        reader.readAsDataURL(blob)</span>
<span class="line">      })</span>
<span class="line"></span>
<span class="line">    })</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line"> function base64ToFile(dataURL) {</span>
<span class="line">    var arr = dataURL?.split?.(&#39;,&#39;)</span>
<span class="line">    let mime = arr[0].match(/:(.*?);/)[1]</span>
<span class="line">    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);</span>
<span class="line">    while (n--) {</span>
<span class="line">      u8arr[n] = bstr.charCodeAt(n);</span>
<span class="line">    }</span>
<span class="line">    let filename = new Date().getTime() + &quot;&quot; + Math.ceil(Math.random() * 100) + &quot;.&quot; + mime.split(&quot;/&quot;)[1]</span>
<span class="line">    return (new File([u8arr], filename, { type: mime }))</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10)])])}const t=s(i,[["render",r]]),p=JSON.parse('{"path":"/code/web/ts/UrlToFile/","title":"url转file得尝试","lang":"zh-CN","frontmatter":{},"git":{"contributors":[{"name":"cy","username":"cy","email":"1058446050@qq.com","commits":2,"url":"https://github.com/cy"}],"changelog":[{"hash":"ad12eb52b2f36055587c281e0aedff3a52822541","time":1668221365000,"email":"1058446050@qq.com","author":"cy","message":"修改目录结构"},{"hash":"15d1f95b0e6d1e96f3cdf03b244286b47e659944","time":1668043304000,"email":"1058446050@qq.com","author":"cy","message":"提交[2022-11-10]第二周任务"}]},"filePathRelative":"code/web/ts/UrlToFile/index.md"}');export{t as comp,p as data};
