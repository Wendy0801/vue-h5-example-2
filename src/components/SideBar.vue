<template>
  <div class="side-bar">
    <div class="side-control">
      <div class="menu-container" @click="popupVisible=true">
        <div class="menu-inner">
          <div class="menu-item menu-item-top"></div>
          <div class="menu-item menu-item-middle"></div>
          <div class="menu-item menu-item-bottom"></div>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="left">
      <div class="side-container">
        <ul class="side-list">
          <li class="side-item side-logo">
            <router-link to="/">
              <img src="../assets/logo.png" alt="">
            </router-link>
          </li>
          <li class="side-item">
            <router-link :to="{'name':'product-list','params':{'type':'New_Product'}}">
              <span>NEW PRODUCT</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </li>
          <li class="side-item">
            <router-link :to="{'name':'product-list','params':{'type':'STARLIGHT_BOTTLE'}}">
              <span>STARLIGHT BOTTLE</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </li>
          <li class="side-item">
            <router-link :to="{'name':'product-list','params':{'type':'STRING_LIGHT'}}">
              <span>STRING LIGHT</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </li>
          <li class="side-item">
            <router-link :to="{'name':'product-list','params':{'type':'GLOWING_GIFTS'}}">
              <span>GLOWING GIFTS</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </li>
          <li class="side-item">
            <router-link to="video">
              <span>VIDEO</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </li>
          <li class="side-item">
            <router-link to="about">
              <span>ABOUT US</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </li>
          <li class="side-item">
            <router-link to="accout">
              <span>CONTACT US</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>
<script>
export default {
  props: [

  ],
  data() {
    return {
      popupVisible:false
    }
  },
  mounted() {

  },
  methods: {
    closePanel(){
      this.popupVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../themes/_variable.scss';
@import '../themes/_basic.scss';
  .side-bar{
    position: absolute;
    left: 0;
    top:0;
  }
  .side-container{
    width:220px;  
    height:100vh;
    overflow-y: scroll;
  }
  .side-list{
    padding:10px 0;
  }
  .side-item{
    padding:10px;
    padding-left: 30px;
    border-bottom: 1px solid #e1e1e1;
    a {
      display: block;
      position: relative;
      font-size:14px;
      i{
        position: absolute;
        right: 0;
        top:1px;
        font-size: 24px;
      }
    }
  }
  .side-logo{
    text-align: center;
    padding-left: 10px;
    img{
      height: 40px;
    }
  }

  .router-link-active{
    color:$primary;
  }

  .menu-container{
    width:40px;
    height:40px;
    // background:pink;
    position: relative;
    .menu-inner{
      position: absolute;
      left:50%;
      top:50%;
      transform: translate3d(-50%,-50%,0);
    }
    .menu-item{
      width:20px;
      height:2px;
      background:#fff;
      margin:4px;
    }
  }
</style>
