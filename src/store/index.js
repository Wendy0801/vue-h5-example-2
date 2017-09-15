import Vue from 'vue'
import Vuex from 'vuex'
require('es6-promise').polyfill();
Vue.use(Vuex)

import configModule from './modules/config.module'
import activityModule from './modules/activity,module'
import userModule from './modules/user.module'

export default new Vuex.Store({
  modules:{
    config:configModule,
    activity:activityModule,
    userModule:userModule
  }
})
