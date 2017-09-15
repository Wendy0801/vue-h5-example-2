# 微信自动登录

---

## 登录配置
微信登录请求code,通过code请求openid,通过openid请求个人信息,微信分享配置等地址

?> /src/services/config.js

```javascript
// 微信相关地址
wxBaseUrl = `http://testmall.xingmeihui.com/smiweb/api/`
wxShareSignUrl = 'http://testsmi.assets.smi170.com/communication/wx/getWXShare'
wxLoginBaseUrl = 'http://testsmi.assets.smi170.com/communication/wx/getWXCodeURLEncoder'
wxOpenidByCode = 'http://testsmi.assets.smi170.com/communication/wx/getWXOpenid'

...

// 跳转到微信自动登录地址
export const WX_LOGIN_BASEURL = wxLoginBaseUrl
//微信获取信息地址
export const WX_BASE_URL = wxBaseUrl 
// 根据code获取openid
export const WX_OPENID_BY_CODE = wxOpenidByCode
// 微信分享地址
export const WX_SHARE_SIGNURL = wxShareSignUrl
```


## 登录逻辑
不同状态进行不同的操作

?> /src/components/WxAutoLogin.vue

- props参数表

名称 | 类型 | 默认|说明
---|---|---|---|
loginNeed | boolean |false |是否需要登录获取个人信息,默认只获取openid
debug| boolean | false|是否展示获取到的openid和用户信息
openidKey| string |smilife_openid| 获取到的openid存储在cookie中的key值

- 微信登录基本流程
    - cookie中有openid
        - `loginNeed`为true,则获取个人信息
    - cookie中没有openid
        - 初始进入(地址没code)
            1. 调用`WX_LOGIN_BASEURL`接收后台返回的跳往`微信登录地址`,跳往获取`code`
        - 微信处理后返回进入(地址带code)
            1. 获取地址栏的code,调用`WX_OPENID_BY_CODE`,获取到openid,存储openid到cookie中
            2. `loginNeed`为true,则调用`WX_BASE_URL`,通过openid获取个人信息

- 微信对接常见问题
> 1. redirect_url参数错误,单页面应用通常用`#`来区分不同页面,但是`redirectUri`包含`#`时,则会将其后的`search`值都变成hash值,导致微信获取不到正确的信息.所以`redirectUri`字段不能带`#`号
> 2. 而遇到微信登录后需要回到原页面的需求,通过另外一种方式拼接原地址的hash值,微信登录跳转回来,获取到原hash值,再做跳转.`app-entry`负责分发跳转
    

!> 先需要引入各地址配置信息 `/src/services/config.js`
