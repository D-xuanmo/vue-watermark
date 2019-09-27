# vue-watermark

> vue水印组件使用说明

## 安装

```
yarn add @xuanmo/watermark
or
npm i @xuanmo/watermark
```

## 在项目中使用

* 在vue项目入口文件中引入，全局注册
```js
import Vue from 'vue'
import XWatermark from '@xuanmo/watermark'
Vue.use(XWatermark)
```

* 在页面中调用
```html
<x-watermark />
```

## props
字段名|默认值|类型|说明|是否必填
:-: | :-: | :-: | :-: | :-:
rotate|-30|number|水印内容旋转角度|N
text|水印内容|string|水印填充内容|N
opacity|0.1|number|水印透明度|N
fontStyle|size: 18,<br>family: 'SimHei',<br>color: '#000'|object|水印样式|N
