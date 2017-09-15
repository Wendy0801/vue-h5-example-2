import Vue from 'vue'

// 数据模拟
import Mock from '@/mock'
Mock.bootstrap()

// 引用自定义配置后的第三方库
import '@/libs'

// @ => 代替根路径下的src目录
import App from '@/App'

// vue-router路由管理
import router from '@/router'

// vuex全局状态管理
import store from '@/store'

// flex样式
import 'flex.css'

// 过滤器
import '@/filters'

// 国际化
import { i18n } from '@/lang'

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
