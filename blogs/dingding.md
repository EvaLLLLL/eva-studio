---
title: '钉钉小程序开发总结'
date: '2020-10-16'
---

### 一、概述

- 一堆 `webView` + 页面栈管理 + `native` 通信以使用 `native` 能力

- 分为逻辑层和视图层，响应式的数据绑定系统，视图层和逻辑层终保持同步，只要在逻辑层修改数据，视图层就会相应的更新
- 以 `支付宝小程序` 为底层
  - 但是缺少了部分 `api`，比如 `getFileSystemManager`
  - 支付宝小程序的组件库可用，比如本项目使用到的 `mini-ali-ui`
- 和微信小程序在模版语法几乎一致， `wx:if` <=> `a:if`

### 二、部分原理

#### 2.1 由多个 webView 组成

>小程序在 web 上的渲染引擎是浏览器内核，作为小程序的核心组件，经过多方面的考虑，我们采用的是 UC 提供的浏览器内核，UC 的同学在浏览器内核的性能、稳定性和兼容性上做了大量的工作，比系统提供的 webview 提升了不少。 —— [支付宝小程序技术架构全解析](https://www.infoq.cn/article/ulletz7q_ue4duptkgkc)

一个小程序由多个 `webView` 组成，利用 `system event`、`jsbridge` 与 `native` 通信

![小程序框架](https://static.geekbang.org/infoq/5c6a6ada52d7a.png)

#### 2.2 逻辑与渲染分离

一个线程渲染，一个线程处理逻辑，所以开发者不能直接接触到原生api以及直接操作DOM、BOM。

>Worker 线程只是做一些计算然后把数据传递到UI线程，然后大部分工作都在UI下面执行，并且官方的组件在UI这边执行。 —— [小程序底层实现原理及一些思考](https://zhuanlan.zhihu.com/p/81775922)

![image-20210818003610887](https://pic1.zhimg.com/80/v2-8ab2d8de3eee22e0ad602bb8090c4f8c_1440w.jpg)

但支付宝声称他们进行了优化，`setData` 的对象会创建在全局的 `Global Runtime`/`Shared Heap` 里，以减少 render 和 worker 的通信成本。

>在新的隔离模型下，webview 里面的 v8 实例就是一个 Local Runtime，worker 线程里面的 v8 实例也是一个 Local Runtime，在 worker 层和 render 层交互时，setData 对象的会直接创建在 Shared Heap 里面，因此 render 层的 Local Runtime 可以直接读到该对象，并且用于 render 层的渲染，减少了对象的序列化和网络传输，极大的提升了启动性能和渲染性能。 —— [支付宝小程序技术架构全解析](https://www.infoq.cn/article/ulletz7q_ue4duptkgkc)

![368b39](https://static.geekbang.org/infoq/5c6a6bc368b39.png)

#### 2.3 生命周期

> 当首次渲染完成后，渲染层组件会发送一个信号到逻辑层组件中，逻辑层组件收到信号后触发生命周期“onReady”通知开发者已经首次渲染完毕。 —— [小程序底层实现原理及一些思考（2）](https://zhuanlan.zhihu.com/p/121815358)

![d5d0b7375a37fd4b43_1440w.jpg](https://pic4.zhimg.com/80/v2-f7bc0cfddc5e43d5d0b7375a37fd4b43_1440w.jpg)

#### 2.4 页面栈管理页面们

> 下图是微信小程序的页面栈管理图示（没找到支付宝/钉钉的），与钉钉小程序表现一致。 —— [小程序页面栈详解](https://juejin.cn/post/6844903906493857805)

![p1-jj](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c60a08fe7251ff~tplv-t2oaga2asx-watermark.awebp)



### 三、框架

> 小程序提供了自己的视图层描述语言 AXML 和 ACSS，以及基于 JavaScript 的逻辑层框架，并在视图层与逻辑层间提供了数据传输和事件系统，让开发者能够专注于数据与逻辑。 —— [钉钉小程序开发文档](https://developers.dingtalk.com/document/app/overview-of-mini-program-framework)

#### 3.1 文件结构

![image-20210815230723913](https://s3.bmp.ovh/imgs/2021/08/826a5bd8795a9adc.png)

- 一个小程序是一个 `app` 实例，一个页面是一个 `page` 实例
-  `page` 四个文件必须具有相同的路径与文件名

#### 3.2 配置

##### 3.2.1 全局配置

决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。

所有的配置项可以在这里找到：[app.json全局配置](https://developers.dingtalk.com/document/app/app-json-global-configuration)

```json
{
  "pages": [
    "pages/activities/activities", // 注册页面
  ],
  "window": {
    "defaultTitle": "八一学校工会", // 页面默认 title
    "backgroundColor": "#f6f8fa" // 页面默认背景颜色
  },
  "tabBar": { // tabBar 相关配置
    "textColor": "#666666",
    "selectedColor": "#D2401A",
    "backgroundColor": "#ffffff",
    "items": [
      {
        "name": "活动",
        "pagePath": "pages/activities/activities",
        "icon": "images/tabBar/act.png",
        "activeIcon": "images/tabBar/act_hl.png"
      },
    ]
  }
}
```

##### 3.2.2 页面配置

单个页面配置可覆盖全局配置

```json
{
  "defaultTitle": "八一学校工会",
  "usingComponents": {
    "active-item": "/components/active-item/active-item"
  }
}
```

#### 3.3 `app` 实例

- `App` 方法，创建小程序实例

```js
App({
  onLaunch (options) {
    // 第一次打开时调用
    // 这个时候 page 还没有生成，不要在这里获取页面栈
    const { query, path } = options;
    const { corpId } = query;
  },
  onShow (options) {
    // 从后台被scheme重新打开时调用
    const { query, path } = options;
    const { corpId } = query;
  },
  onHide () {
    // 进入后台时调用
    console.log('App hide');
  },
  onError (error) {
    // 小程序执行出错时调用
    console.log(error);
  },
  globalData: {
    foo: 'bar'
  },
  demo(){ // 全局方法
  	console.log('hello, demo')
    // 打印 app 实例
    console.log(this)
	},
});
```

- `getApp` 方法

获取 `app` 实例，可通过此方法获得全局数据

```js
var app = getApp()
console.log(app.globalData) // 获取 globalData
```

#### 3.4 `page` 实例

```js
//index.js
Page({
  data: {
    // 页面第一次渲染使用的初始数据
    title: "Dingtalk"
  },
  onLoad(query) {
    // 页面加载
    // 通常在这里请求数据
    // query 中有跳转过来的参数
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
   // 返回自定义分享信息
  },
  viewTap() {
    // 事件处理
    this.setData({
      text: 'Set data for update.'
    })
  },
})
```

##### 3.4.1 Page.prototype.setData()

`setData `函数用于将数据从逻辑层发送到视图层，同时改变对应的 `this.data` 的值

`setData `接受一个对象作为参数。对象的键名 `key` 可以非常灵活，以数据路径的形式给出，如 `array[2].message`、`a.b.c.d`，并且不需要在 `this.data `中预先定义

##### 3.4.2 getCurrentPages()

该用于获取 `当前页面栈` 的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面，可访问页面栈中别的页面的方法、数据。

![image-20210815235151320](https://tva1.sinaimg.cn/large/008i3skNly1gtkc5k9i30j60br08igm302.jpg)

#### 3.5 [AXML](https://developers.dingtalk.com/document/app/view-layer-overview)

- 判断逻辑复杂点在模版语法中可能判断失败，解决办法是将数据定义在 `data` 中，计算逻辑放在生命周期里

#### 3.6 [SJS](https://developers.dingtalk.com/document/app/sjs-overview)

- `Javascript` 子集

- 不支持 `window`、`DOM` 等操作
- 支持部分 `ES6` 语法，比如箭头函数、解析赋值，不支持可选链语法（?.）

#### 3.7 [ACSS](https://developers.dingtalk.com/document/app/acss-style-syntax-reference)

- 需要注意 自定义组件/template 样式污染

#### 3.8 [事件](https://developers.dingtalk.com/document/app/event-overview)

> 事件是视图层到逻辑层的通讯方式。 —— [钉钉小程序开发文档](https://developers.dingtalk.com/document/app/event-overview)

绑定事件必须以 `on` 或者 `catch` 开头

- `on` 事件绑定正常向上冒泡
- `catch` 会阻止向上冒泡

#### 3.9 自定义组件

#####  3.9.1 注册&使用

与 `page`实例一样需要四个文件描述，需要在 `json` 中定义，别的页面使用该组件需要先注册再使用

```json
{
  "component": true,
  "usingComponents": {
    "c1":"../x/index"
  }
}
```

与页面不同的是，组件的方法需要定义在 `method` 中

##### 3.9.2 props

```js
Component({
  data: { counter: 0 },
  props: {
    onCounterPlusOne: (data) => console.log(data),
    extra: 'default extra',
  },
  methods: {
    plusOne() {
      this.setData({ counter: this.data.counter + 1 });
    },
  },
});
```

##### 3.9.3 生命周期

`didMount` 、`didUpdate` 、`didUnmount`

- `didMount` 为渲染后回调，此时页面已经渲染，通常在这里请求服务端数据比较合适
- `didUpdate` 为更新后回调，每次组件数据变更的时候都会调用
- `didUnmount` 为删除后回调，每当组件示例从页面删除的时候会触发此回调

##### 3.9.4 其他实例

![image-20210816002507570](https://tva1.sinaimg.cn/large/008i3skNly1gtkc5znen6j60km045jrw02.jpg)

#### 3.10 小程序 JSAPI

- [版本管理](https://developers.dingtalk.com/document/app/mini-program-update-mechanism)

- [authCode](https://developers.dingtalk.com/document/app/mini-program-free-login)

- [网络](https://developers.dingtalk.com/document/app/send-network-requests)

### 四、开发者工具

编辑器 => 调试器 => 预览 => 真机调试

- 调试器中的 `Data` 可以方便查看当前页面数据
- 真机调试也比较方便

### 五、坑们

1. 子组件调用父组件函数，方法名必须以 on 开头，否则会将其处理为字符串
2. 不支持 promise.finally
3. 引用外部组件库可能会出错，可尝试应用分包，比如 `import compact from 'lodash/compact'`
4. lodash/floor，精度不起作用，改用` .toFixed(n) `以四舍五入
5. 在页面栈获取其他页面的实例，直接用实例 ` setData ` 在真机是不起作用的，解决办法是在页面中定义修改数据的函数，再由页面实例调用这个函数
6. `Canvas.drawImage` 要用他们的临时路径（他们的文档示例是错的，CDN 上的图片 draw 不出来😡）
7. `dd.getImageInfo` 如果传的是线上地址，得到的 `filePath` 安卓端不能用在 `Canvas.drawImage` 中（iOS 可以😡），解决办法为传本地图片路径
8. 上传包体积不能超过 XXXM，否则会构建失败，解决办法是尝试重新安装依赖
9. 网络请求报错 `xxx不在白名单内，请求失败`，解决方法在开发管理中添加相应的 `ip`
10. 开发者工具时常抽风，预览的东西与代码不符，解决方法 清缓存、重启

### 六、参考文档

- [钉钉小程序开发文档](https://developers.dingtalk.com/document/app/overview-of-mini-program-framework)

- [支付宝小程序开发文档](https://opendocs.alipay.com/mini/framework/overview)

- [支付宝小程序技术架构全解析](https://www.infoq.cn/article/ulletz7q_ue4duptkgkc)

- [小程序底层实现原理及一些思考](https://zhuanlan.zhihu.com/p/81775922)

- [小程序底层实现原理及一些思考（2）](https://zhuanlan.zhihu.com/p/121815358)

- [小程序页面栈详解](https://juejin.cn/post/6844903906493857805)
