# uniapp

## uniapp 调用摄像头拍照/上传图片

```js
//选择图片库指定图片个数
//https://blog.csdn.net/qq_35366269/article/details/107901676
uni.chooseImage({
  count: 1, //默认9
  sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
  sourceType: ["camera", "album"], //开启照相功能/从相册选择
  success: function (res) {
    console.log(JSON.stringify(res.tempFilePaths), "上传图片");
  },
});
```

## 生成二维码(uniapp)

- 下载 weapp-qrcode.js 放入项目并引用

```js
import QR from "../../static/js/weapp-qrcode.js"; // 二维码生成器
```

\*建立 dom 元素

```js
<view class="qrcode">
  <canvas
    style="width: 200upx;height: 200upx;"
    canvas-id="couponQrcode"
  ></canvas>
</view>
```

- 开始使用

```js
new QR('couponQrcode', {
      text: "http://www.baidu.com",
      width: 100,
      height: 100,
      colorDark: "#333333",
      colorLight: "#FFFFFF",
      correctLevel: QR.CorrectLevel.H
    })

})
//设置完成就成功了
```

## 复制功能

uniapp 自带了复制功能 但是不支持 h5 偶

```js
uni.setClipboardData({
data: value, //要被复制的内容
success: () => {
  //复制成功的回调函数
  uni.showToast({
    //提示
    title: "复制成功",
  });
},
```

## uniapp 多语言

多语言可使用 ion8 来实现或者自己手动写 进行切换 但是底部导航需要做如下操作

```js
//page.json
"tabBar": {
		"color": "#8a8a8a",
		"selectedColor": "#d4237a",
		"borderStyle": "black",
		"backgroundColor": "#ffffff",
		"list": [
			{
				"pagePath": "pages/index/index",
				"text": "首页",
				"iconPath": "static/images/icon1.png",
				"selectedIconPath": "static/images/iconh1.png"
			},
			{
				"pagePath": "pages/prize/prize",
				"text": "开奖",
				"iconPath": "static/images/icon2.png",
				"selectedIconPath": "static/images/iconh2.png"
			},
			{
				"pagePath": "pages/me/me",
				"text": "我的",
				"iconPath": "static/images/icon3.png",
				"selectedIconPath": "static/images/iconh3.png"
			}
		]
	},
// app.vue
computed: {
    i18n() {
      return this.$t("message");
    },
  },
 onShow: function () {
    console.log("App Show");
    // 修改底部导航
    uni.setTabBarItem({
      index: 0,
      text: this.$t("message.home"),
    });
    uni.setTabBarItem({
      index: 1,
      text: this.$t("message.prize"),
    });
    uni.setTabBarItem({
      index: 2,
      text: this.$t("message.me"),
    });
    //   // 修改头部标题
    // uni.setNavigationBarTitle({
    // 	title: this.$i18n.messages[this.$i18n.locale].tabBar.home
    // });
  },
  //点击切换需要刷新一下页面
   uni.navigateBack({
        delta: 0,
      });
```
