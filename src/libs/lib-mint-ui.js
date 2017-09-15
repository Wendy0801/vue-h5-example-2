// ui框架
import Vue from 'vue'
import MintUI from 'mint-ui'
// 自定义全局样式
import '@/themes/main.scss'
// mint-ui 框架样式
import 'mint-ui/lib/style.css'

import {
  Popup,
  Button,
  Range,
  Spinner,
  Indicator,
  InfiniteScroll,
} from 'mint-ui'

Vue.component(Popup.name, Popup)
Vue.component(Button.name, Button)
Vue.component(Range.name, Range)
Vue.component(Spinner.name, Spinner)
Vue.component('infinite-scroll', InfiniteScroll)
Vue.use(InfiniteScroll)
