# socail社会化分享

--- 

!> 目前仅实现微信分享配置

## 导入配置

```js
import { WX_SHARE_SIGNURL } from './config.js'
```

## 初始化微信分享验证

- init() 动态导入`jweixin-1.0.0.js`,导入成功调用`verify()`
- verify() 通过调用`WX_SHARE_SIGNURL`获取分享验证参数

## 分享配置`share(data)`

- **参数**
    - data `object`

名称 | 类型 |描述
---|---|---|
data.title | string |分享的标题
data.desc | string |分享的简介描述信息
data.pic | string |分享的图片地址
data.url | string |分享的点击的链接地址