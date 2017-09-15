<template>
  <div>
    <div v-if="debug">
      <ul>
        <li class="info-row">
          <b>openId:</b>
          <span>{{openid}}</span>
        </li>
        <li class="info-row" v-for="(item,key,index) in userinfo" :key="index">
          <b>{{key}}:</b>
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  WX_LOGIN_BASEURL,
  WX_OPENID_BY_CODE,
} from '@/services/config'
import url from '@/services/url'
export default {
  props: [
    'loginNeed',  // 需要登录获取个人用户信息,否则只做openid存储
    'debug',   // 开启debug模式,可以展示当前openid, 个人信息等
    'openidKey', // 需要将openid存储在cookie里面时的key值
  ],
  data() {
    return {
      'openid': '',
      'userinfo': {
      }
    }
  },
  mounted() {
    if (this.$_config.isWechat) {
      this.checkLogin();
    }
  },
  methods: {
    checkLogin() {
      /*
        0. 是否已经存在用户信息 => 已有用户信息,什么都不做
        1. cookie有openid => 直接通过openid获取个人信息
        2. 没有openid 
          - 2.1 => 用户未绑定卡=> 跳去账号登录且绑定
          - 2.2 => 用户已绑定卡
            . 2.2.1 => 地址中有code ,通过code获取openid
            . 2.2.2 => 地址中没有code ,跳去账号登录
      */
      var userInfo = this.$_cookie.get('userInfo')
      if (!userInfo) {
        var openid = this.$_cookie.get('smilife_openid') || this.$_cookie.get('newopenid')
        if (!openid) {
          let _code = this.$_url.search('code')
          if (!_code) {
            this.goWxLogin()
          }
          else {
            this.getOpenIdByCode(_code)
          }
        }
        else {
          this.loginByOpenid(openid)
        }
      }
    },
    goWxLogin() { // 微信登录,通过发送请求,获取一个跳去微信登录的地址,之后又将带着code返回该页面
      let _locationNow = window.location.origin + window.location.pathname + '?hash=' + window.location.hash.substr(1)
      _locationNow = encodeURIComponent(_locationNow)
      this.$_api.post({
        ext: `${WX_LOGIN_BASEURL}`,
        redirectUri: _locationNow,
        state: 1,
        type: 1
      })
        .then(res => {
          if (res.code === 1) {
            window.location.href = res.entity.value
          }
        })
    },
    getOpenIdByCode(code) { // 通过上面的微信登录返回的带code的地址,通过code请求openid
      this.$_api.post({
        ext: `${WX_OPENID_BY_CODE}`,
        code: code
      })
        .then(res => {
          if (res.code === 1) {
            var openIdCookieKey = this.openidKey || 'smilife_openid'
            var storeObj = {}
            storeObj[openIdCookieKey] = res.entity.value
            this.$_cookie.set(storeObj, null, '/');
            this.openid = res.entity.value;
            this.loginByOpenid(res.entity.value)
          }
        })
    },
    loginByOpenid(openid) { // 通过openid微信登录, 最终都通过这里来获取用户信息
      // 不需要通过openid获取个人信息
      if (!this.loginNeed) {
        return
      }
      this.$_api.post({
        ext: 'public/auto/login',
        openid: openid
      })
        .then(res => {
          if (res.code === 1) {
            if (res.data) { // 如果返回用户信息数据
              this.userinfo = res.data
              cookie.set({
                userinfo: res.data
              })
              this.$_cookie.set({
                'newtoken': res.data.token,
              }, 24 * 60, '/')
            }
            else {  // 否则清空之前留下的用户信息
              this.$_cookie.set({
                userinfo: '{}'
              }, -24 * 60)
            }
          }
        })
    },

  }
}
</script>
<style lang="scss" scoped>
@import '../themes/_variable.scss';
@import '../themes/_basic.scss';
</style>
