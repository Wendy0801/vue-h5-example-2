import Vue from 'vue'
Vue.config.productionTip = false

import store from '@/store'
import {
    Indicator,
} from 'mint-ui'

// 所有的自定义添加在vue 原型链上的方法, 统一 用 "$_"开头意做区分
// 操作提示方法
Vue.prototype.$_showtip = function (msg, statuType = "success", isFromApp = false) {
    Indicator.close();
    store.dispatch('SET_ACTION_STATU', {
        'type': statuType,
        'message': msg,
        'isFromApp': isFromApp
    })
}

// api 处理数据请求
import api from '@/services/api'
Vue.prototype.$_api = api

// cookie操作
import cookie from '@/services/cookie'
Vue.prototype.$_cookie = cookie

// 本地存储
import local from '@/services/local'
Vue.prototype.$_local = local

// 社交平台操作
import social from '@/services/social'
Vue.prototype.$_social = social

// tool工具箱
import tool from '@/services/tool'
Vue.prototype.$_tool = tool

// 地址栏处理函数
import url from '@/services/url'
Vue.prototype.$_url = url

// 平台相关操作
import platformService from '@/services/platform'
Vue.prototype.$_platform = platformService

// 数据验证服务
import validate from '@/services/validate'
Vue.prototype.$_validate = validate

// platform平台分为 web ,web_andorid, web_ios, web_wechat , smi_ios ,smi_android 
const ua = window.navigator.userAgent.toLowerCase()
var isSmiApp = false  // 是否为大星美的app
var platform = 'web'  // 默认为普通web
var isWechat = false
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    isWechat = true
    store.dispatch('SET_IS_WECHAT', true)
    platform = 'web_wechat'
    social.init()
}
if(ua.match(/iphone/i) == 'iphone'){
    platform = 'web_ios'
}
if(ua.match(/android/i) == 'android'){
    platform = 'web_android'
}
if (ua.match(/SMI_IOS/i) == 'smi_ios') {
    isSmiApp = true
    platform = 'smi_ios'
    store.dispatch('SET_IS_APP', true)
}
if (ua.match(/SMI_ANDROID/i) == 'smi_android') {
    isSmiApp = true
    platform = 'smi_android'
    store.dispatch('SET_IS_APP', true)
}

Vue.prototype.$_config = {
    'isWechat': isWechat,
    'isSmiApp': isSmiApp,
    'baiduKey':'rSc0WmydyBgO1QM99nFiZMKBpt5KOm2i',
    'platform':platform
}
window.app_config =  {
    'isWechat': isWechat,
    'isSmiApp': isSmiApp,
    'baiduKey':'rSc0WmydyBgO1QM99nFiZMKBpt5KOm2i',
    'platform':platform
}

// Vue.mixin({
//   mounted() {
//     console.log('hello from mixin!')
//   }
// })
