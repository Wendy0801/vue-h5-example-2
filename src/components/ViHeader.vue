<template>
  <div>
    <header class="vi-header">
      <slot name="left">
        <go-back></go-back>
      </slot>
      <slot name="title">
        <h2 class="vi-header-title">{{title}}</h2>
      </slot>
      <slot name="right">
      </slot>
    </header>
  </div>
</template>
<script>
import GoBack from '@/components/GoBack'
export default {
  components: {
    'go-back': GoBack
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import '../themes/_variable.scss' ;
@import '../themes/_basic.scss';
.vi-header{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    max-width: 640px;
    height:40px;
    line-height:40px;
    background:$mtc;
    // box-shadow: 0 2px 5px 0 rgba(0,0,0,0.24);
    z-index:9;
    color:#fff;
    .vi-header-mid {
        width:70%;
        margin:0 auto;
    }
    h2 {
        @extend %ell ;
        text-align:center;
        font-size:1.6rem;
    }
}
</style>
