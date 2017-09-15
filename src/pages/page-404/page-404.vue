<template>
    <div class="page-404-page">
        <vi-header :title="pageTitle"></vi-header>
        <main class="smi-content">
            <div class="main-wrap">
                404
            </div>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ViHeader from '@/components/ViHeader'
import LoadMore from '@/components/LoadMore.vue';

export default {
  name:'page-404',
  components: {
    'load-more': LoadMore,
    'vi-header':ViHeader
  },
  data(){
      return {
        pageTitle: this.$route.meta.title,
        
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
<style lang="scss" src="./page-404.scss" scoped></style>
