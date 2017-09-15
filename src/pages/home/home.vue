<template>
  <div>
    <vi-header :title="pageTitle"></vi-header>
    <main class="smi-content">
      <button type="button" @click="replacePage">替换当前页面</button>
    </main>
  </div>
</template>

<script>
import ViHeader from '@/components/ViHeader'
export default {
  name: 'home',
  components: {
    'vi-header':ViHeader
  },
  data() {
    return {
      pageTitle:'页面的标题',
    }
  },
  computed: {
  },
  mounted() {
    setTimeout(()=>{
      this.pageTitle='页面的标题2'
    },1000)
  },
  methods: {
    replacePage(){
      this.$_url.replace('/index.html')
    }
  }
}
</script>
<style lang="scss" src="./home.scss" scoped></style>
