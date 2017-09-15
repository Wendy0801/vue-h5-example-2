# 运行流程

--- 

## main.js

引入相关文件,并且实例化一个vue类`/src/main.js`

1. Vue
2. Mock数据模拟
3. 第三方库
4. app入口模板App.vue
5. 路由
6. vuex状态管理
7. flex.css第三方flex布局解决方案
8. 过滤器

## App.vue

定义基本布局,路由切换内容区域和公共区域,全局的模板效果的更改都基于全局状态vuex

1. 页面切换加载效果 `loading`组件
2. 通用提示弹出层 `mt-popup`组件
3. 微信自动登录组件 `wx-auto-login`组件

