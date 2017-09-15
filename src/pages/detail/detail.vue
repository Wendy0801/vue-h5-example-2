<template>
  <div>
    <header class="smi-header">
      <h2>详情页</h2>
      <go-back></go-back>
    </header>
    <main class="smi-content">
      {{$t('home.search')}}
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import GoBack from '@/components/GoBack'
var Hashes = require('jshashes')

export default {
  components: {
    'go-back': GoBack
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      projects: state => state.activity.projects,
    })
  },
  mounted() {
    // console.log(this.$_api.md5('123456'))
    // console.log(this.$_api.sha1('123456'))
    // SHA-1(salt + SHA-1(pwd) + "&action=auth&usr=" + usr + "&company-key=" + company-key);

    var str2 = this.$_api.sha1('1491967716993'+this.$_api.sha1('vplant')+ "&action=auth&usr=" + 'vplant' + "&company-key=" + '0123456789ABCDEF')
    console.log(str2)

    // console.log(Hashes)

    // var str = '123456'
    // // new SHA1 instance and base64 string encoding
    // // var SHA1 = new Hashes.MD5(str).any()
    // var MD5 = new Hashes.MD5().hex(str)
    // // output to console
    // console.log(MD5)
  },
  methods: {

  }
}
</script>
<style lang="scss" src="./detail.scss" scoped></style>
