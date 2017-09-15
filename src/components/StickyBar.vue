<template>
  <div>
    <transition name="showSticky">
      <div class="sticky-bar-fixed" :class="{'sticky-bar-show':isShow}">
        <div class="show-tabbar card" v-if="tabType">
          <ul class="tabbar-list cl">
            <li class="tabbar-item fl has-right-border" :class="{'active':tabType==='hotRank'}" @click="tabShowList('hotRank')">
              <div class="tabbar-item-inner">
                人气最高
              </div>
            </li>
            <li class="tabbar-item no-right-border fl" :class="{'active':tabType==='newRank'}" @click="tabShowList('newRank')">
              <div class="tabbar-item-inner">
                最新加入
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: [

  ],
  data() {
    return {
      isShow: false,
    }
  },
  mounted() {
    document.addEventListener('scroll', this.bindWindowScroll)
  },
  methods: {
    bindWindowScroll() {
      // var staticSticky = this.$refs.staticSticky;
      let t = this.$refs.staticSticky.getBoundingClientRect().top
      if (t < 0) {
        self.isShow = true
      }
      else if (t > 0) {
        self.isShow = false
      }
    }
  },
  beforeDestroy() {
    for (var i = 0; i < this.playerList.length; i++) {
      this.playerList[i].countDown = 0;
      clearInterval(this.playerList[i].countDownTimer);
    }
  }
}
</script>
<style lang="scss" scoped>
.showSticky-enter-active,
.showSticky-leave-active {
  -webkit-transition: all .3s;
  transition: all .3s;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.showSticky-enter,
.showSticky-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

.sticky-bar-fixed {
  position: fixed;
  visibility: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: #fff;
  opacity: 0;
  transform: translate3d(0, -100%, 0);
  transition: all .3s;
  .show-tabbar {
    background: #fff;
  }
  .tabbar-list {
    background: #fff;
  }
  .tab-item {
    background: #fff;
  }
  p {
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
}

.sticky-bar-show {
  visibility: visible;
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
</style>
