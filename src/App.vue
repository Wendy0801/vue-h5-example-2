<template>
  <!-- App -->
  <div id="app" class="app" :class="{'h5-in-app':isApp,'h5-in-wechat':isWechat}">
    <transition name="fade">
      <loading v-show="loadingNow"></loading>
    </transition>
    <mt-popup v-model="popupVisible" position="top" class="mint-popup-2" :class="popupClass" :modal="false">
      <p>{{message}}</p>
    </mt-popup>
    <router-view></router-view>
    <wx-auto-login :debug="false"></wx-auto-login>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from '@/components/Loadding';
import WxAutoLogin from '@/components/WxAutoLogin'

export default {
  components: {
    'loading': Loading,
    'wx-auto-login': WxAutoLogin,
  },
  data() {
    return {
      popupVisible: false,
      popupClass: 'info',
      message: '操作成功',
      showMusicPlayer: false,
      musicBarDeg: 0,
      show:false,
    }
  },
  computed: {
    ...mapGetters({
      loadingNow: 'getLoadingStatu',
      actionStatu: 'getActionStatu',
      userinfo: 'getUserinfo',
      isWechat:'getIsWechat',
      isApp:'getIsApp',
    })
  },
  watch: {
    'actionStatu': function () {
      this.type = this.actionStatu.type;
      this.popupClass = this.actionStatu.isFromApp
        ? `${this.actionStatu.type} mint-popup-app`
        : this.actionStatu.type;
      this.message = this.actionStatu.message;
      this.popupVisible = true;
      setTimeout(() => {
        this.popupVisible = false;
      }, 1500)
    }
  },
  mounted() {
    // this.$_local.set({
    //   userinfo:{
    //     name:'xiaobing',
    //     age:20
    //   }
    // })

    console.log(this.$_local.get('userinfo'))
    // this.$_url.hashReplace('list')
    // this.$_url.cleanSearch()
    // console.log(this.$_url.search())
    // this.$_url.replace('test/123.html')
    // this.$_cookie.set({
    //   name:'xiaobinghahh'
    // })
    // this.$_cookie.data({
    //   'name':'xiaobing2'
    // })
    // .expire(2*24*60)
    // .path('/test/')
    // .store()
    // this.$_cookie.data({
    //   'age':'26'
    // })
    // .expire(3*24*60)
    // .store()

    // console.log(this.$_cookie.get('name'))
    // this.$_cookie.set({
    //   'age':'20'
    // })
    // this.$_tool.test(function(){
    //   var json = {
    //     a:10
    //   }
    //   delete(json.a)
    // })
    // this.$_api.post({
    //   ext:'http://haokur.com/cross/test',
    //   name:'xiaobing',
    //   _withToken:true,
    //   a:0,
    //   b:null,
    //   _withWait:true,
    // })
    // .then(res=>{
    //   console.log(res)
    // })
    // this.$_showtip('hello world')
    // alert(this.isWeiXin)
    // this.$_api.get({
    //   ext: 'test',
    //   data: '1',
    //   code: 2
    // })
    //   .then(res => {
    //     console.log(res)
    //     console.log('请求结果')
    //   })
    //   .catch(err=>{
    //     console.log('请求错误')
    //     throw '错误'
    //   })

    // this.$_api.post({
    //   ext:'user/list',
    //   page:1
    // })
    // .then(res=>{
    //   console.log(res)
    // })

    // this.$_local.set({
    //   a:'b'
    // },24*60)

    // this.$_local.data({
    //   c:'b'
    // })
    // .expire(3*24*60)
    // .store()

    // console.log(this.$_local.get('c'))
    // this.$_local.data({
    //   name:'xiaobing'
    // })
    // .expire(-24*60)
    // .store()

    // console.log(this.$_local.get('name'))

    // var result = this.$_url.search('page')
    // var result2 = this.$_url.hashSearch()
    // console.log(result)
    // console.log(result2)
  },
  methods: {
    addUserinfo() {
      this.$store.dispatch('SET_USERINFO', {
        username: 'xiaobing',
        age: 27
      })
    },
    changeUserinfo() {
      this.$store.dispatch('SET_USERINFO', {
        username: '张三',
        age: 27
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.fade-leave-active {
  opacity: 0;
  transition: all 0.5s ease
}
.side-bar{
  .open-side-btn{
    position: fixed;
    z-index: 99;
  }
}
</style>
