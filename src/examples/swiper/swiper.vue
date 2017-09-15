<template>
    <div class="swiper-page">
        <header class="smi-header">
            <go-back></go-back>
            <h2>swiper</h2>
        </header>
        <main class="smi-content">
            <swiper :options="swiperOption" class="swiper-box">
                <swiper-slide class="swiper-item">
                    <img src="http://www.osnic.com/images/201708/thumb_img/1444_thumb_G_1502306174764.jpg" alt="">
                </swiper-slide>
                <swiper-slide class="swiper-item">
                    <img src="http://www.osnic.com/images/201708/thumb_img/1439_thumb_G_1502306502416.jpg" alt="">
                </swiper-slide>
                <swiper-slide class="swiper-item">
                    <img src="http://www.osnic.com/images/201708/thumb_img/1442_thumb_G_1502306307892.jpg" alt="">
                </swiper-slide>
                <swiper-slide>
                    <div class="cl relate-wrap">
                        <h4>相似推荐</h4>
                        <div class="relate-product fl">
                            <img src="http://www.osnic.com/images/201708/thumb_img/1442_thumb_G_1502306307892.jpg" alt="">
                        </div>
                        <div class="relate-product fl">
                            <img src="http://www.osnic.com/images/201708/thumb_img/1442_thumb_G_1502306307892.jpg" alt="">
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import GoBack from '@/components/GoBack';
import LoadMore from '@/components/LoadMore.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name:'swiper-page',
  components: {
    'load-more': LoadMore,
    'go-back': GoBack,
    'swiper':swiper,
    'swiper-slide':swiperSlide
  },
  data(){
      return {
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'vertical',
                slidesPerView: 1,
                // height: '568',
                // effect:'coverflow',
                paginationClickable: true,
                mousewheelControl: true
            },
      }
  },
  computed: {
    ...mapGetters({
    })
  },
  mounted(){

  },
  methods : {

  }
}
</script>
<style lang="scss" src="./swiper.scss" scoped></style>
