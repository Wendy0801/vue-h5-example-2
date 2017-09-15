import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import { zhcnLang } from './zh_cn'
import { enLang } from './en'
import cookie from '@/services/cookie'

const langPackage = {
    'zh_cn': zhcnLang,
    'en': enLang
}

var locale = cookie.get('lang') || 'en'
export const i18n = new VueI18n({
  locale: locale, // set locale
  messages:langPackage, // set locale messages
})