# 服务总览

---

## 项目结构

```html
src
├──services/                        * 所有公用的服务方法
|   ├──analysis.js                  * 数据统计服务
│   ├──api-resource.js              * vue-resource提供的数据请求方法(备选)
│   ├──api.js                       * 默认的请求库,基于axios
│   ├──config.js                    * 全局配置信息
│   ├──cookie.js                    * cookie的相关操作
│   ├──db.js                        * db网页数据库操作,未实现
│   ├──db.js                        * platform检测操作平台相关
│   ├──social.js                    * 社会化第三方相关
│   ├──tool.js                      * js封装的操作方法,each等
│   ├──url.js                       * 地址栏相关处理操作
│   ├──validate.js                  * 数据校验相关操作
│   └──...                          * 一大波services即将到达
```

## 服务挂载

> 所有的服务都以单个文件,以`$_{文件名}`的形式挂载在Vue原型链上

```javascript
// @/pages/test.js
const test = {
    show:()=>{}
}
export default api

// @/lib/lib-vue.js 
import test from '@/services/test'
Vue.prototype.$_test = test

// @/pages/test/test.vue
this.$_test.show()
```
!> 唯一`services`目录下没有挂载到vue上面的是`services/config.js`文件