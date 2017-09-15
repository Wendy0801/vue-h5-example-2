<template>
  <div>
    <div>
      <div class="cl tip-bar loading-tip">
        <div class="fl tip-bar-block">
          <mt-spinner :size="24" type="snake" v-show="loading" class="fl loding-spinner"></mt-spinner>
          <div class="fl">
            <span v-show="loading">加载更多中...</span>
            <span v-show="allLoaded">没有更多...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    'loading',
    'allLoaded'
  ]
}
</script>
<style scoped>
.fade-leave-active {
  opacity: 0;
  transition: all 0.5s ease
}

.tip-bar {
  text-align: center;
  line-height: 36px;
  color: #c1c1c1;
  padding-bottom: 10px;
}

.tip-bar-block {
  margin-left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}

.loding-spinner {
  margin-right: 10px;
}
</style>
