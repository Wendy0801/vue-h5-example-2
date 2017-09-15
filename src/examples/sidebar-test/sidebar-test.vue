<template>
    <div class="sidebar-test-page">
        <header class="smi-header">
            <side-bar></side-bar>
            <h2>sidebar-test</h2>
        </header>
        <main class="smi-content">

        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import GoBack from '@/components/GoBack';
import LoadMore from '@/components/LoadMore';
import SideBar from '@/components/SideBar'

export default {
  name:'sidebar-test',
  components: {
    'load-more': LoadMore,
    'go-back': GoBack,
    'side-bar':SideBar,
  },
  data(){
      return {

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
<style lang="scss" src="./sidebar-test.scss" scoped></style>
