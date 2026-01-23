---
title: Url转File
createTime: 2026/01/23 13:21:01
permalink: /docs/web/6pzad7zz/
---

上传测试视频和音频得时候已经统一将类型进行更改 类型正确 上传流仍403
第一种使用原生Http上传

[参考链接](https://blog.csdn.net/ahwangzc/article/details/121563470) 

```
getImageFileFromUrl(url, imageName) {
      let p = new Promise((resolve, reject) => {
        var blob = null;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Accept", "image/jpeg");
        xhr.responseType = "blob";
        xhr.onload = () => {
          blob = xhr.response;
          let imgFile = new File([blob], imageName, {type: "image/jpeg"});
          resolve(imgFile);
        };
        xhr.send();
      });
      return p;
    },
```
### 第二种:使用fetch
[参考链接地址](https://segmentfault.com/a/1190000042295695#comment-area)

```
imgUrlToFomdata (url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(respone => respone.blob())
      .then(blob => {
        const formData = new FormData();
        const { type } = blob
        const imgSuffix = type.substring(6)
        // 不设置名字和后缀，接口会报错401，具体看后端接口代码
        const fileName = `${new Date().getTime()}.${imgSuffix}`
        const file = new File([blob], fileName, { type });
        formData.append('file', file, fileName);
        resolve(formData)
      })
      .catch(error => {
        reject(error)
      });
  })
}
```
### 第三种:使用url转database64  database64转换file或者blob
[参考链接地址](https://blog.csdn.net/xingxingxingge/article/details/121996752)

```
function urlToBase64(url) {
    return new Promise((resolve) => {
      fetch(url).then(data => {
        const blob = data.blob()
        return blob;
      }).then(blob => {
        let reader = new FileReader()
        reader.onloadend = function () {
          const dataURL = reader.result
          // console.log('base64地址：', dataURL)
          resolve(dataURL)
        }
        reader.readAsDataURL(blob)
      })

    })
  }

 function base64ToFile(dataURL) {
    var arr = dataURL?.split?.(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let filename = new Date().getTime() + "" + Math.ceil(Math.random() * 100) + "." + mime.split("/")[1]
    return (new File([u8arr], filename, { type: mime }))
  }
```
