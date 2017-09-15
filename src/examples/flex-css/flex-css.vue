<template>
    <div class="flex-css-page">
        <vi-header :title="pageTitle"></vi-header>
        <main class="smi-content">

          <!-- 分列列表示例 -->
          <div class="flex-block flex-cols">
            <h4>分列等分布局</h4>
            <ul flex="main:justify">
              <li v-for="(item,index) in 3" :key="index"></li>
            </ul>
          </div>

          <!-- 左右上下居中 -->
          <div class="flex-block flex-center">
            <h4>左右上下居中</h4>
            <ul flex="main:justify">
              <li v-for="(item,index) in 3" :key="index" flex="main:center cross:center">
                <img src="../../assets/logo.png" alt="">
              </li>
            </ul>
          </div>

          <!-- 一边固定,另一边自适应 -->
          <div class="flex-block">
            <h4>一边固定,另一边自适应</h4>
            <div class="flex-side-static" flex="">
                <div class="left" flex-box="0">1</div>
                <div class="right" flex-box="1">2</div>
            </div>
            <div class="flex-side-static" flex="box:first">
                <div class="left">1</div>
                <div class="right">2</div>
            </div>
            <div class="flex-side-static" flex="dir:right box:first">
                <div class="left">1</div>
                <div class="right">2</div>
            </div>
          </div>

          <!-- 两边固定,一边自适应 -->
          <div class="flex-block">
            <h4>两边固定,一边自适应 </h4>
            <div class="flex-tow-side" flex="box:justify">
                <div class="left">1</div>
                <div class="mid">2</div>
                <div class="right">3</div>
            </div>
          </div>

          <!-- 左边头像,右边个人介绍等(左边固定,右边自适应) -->
          <div class="flex-block">
            <h4>左边头像,右边个人介绍等</h4>
            <div class="user-info" flex="box:first cross:center">
              <div class="user-avatar">
                <div class="avatar" flex="main:center cross:center">
                  <img src="../../assets/logo.png" alt="">
                </div>
              </div>
              <div class="user-about">
                <h4>用户名</h4>
                <p>用户个人介绍</p>
              </div>
            </div>
          </div>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ViHeader from '@/components/ViHeader'
import LoadMore from '@/components/LoadMore'

export default {
  name:'flex-css',
  components: {
    'load-more': LoadMore,
    'vi-header':ViHeader
  },
  data(){
      return {
        pageTitle:'flex-css-page'
      }
  },
  computed: {
    ...mapGetters({
    })
  },
  mounted(){
    this.pageTitle = this.$route.meta.title
    
  },
  methods : {

  }
}
</script>
<style lang="scss" src="./flex-css.scss" scoped></style>
