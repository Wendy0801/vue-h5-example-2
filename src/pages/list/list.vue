<template>
  <div>
    <ul>
      <li v-for="item1 in 100">
        <router-link :to="{'name':'detail',params:{id:item1}}">
          {{item1}}
        </router-link>
        <router-link :to="{'path':'home'}">
          首页
        </router-link>
      </li>
    </ul>
    <button @click="goPos">定位</button>
  </div>
</template>
<script>
export default {
  name: 'list',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getList()
    this.$_api.replacePage('home')
  },
  methods: {
    getList() {
      this.$_api.get({
        ext:'http://haokur.com/cross/test'
      })
      .then(res=>{
        console.log(res)
      })

      // this.$services.api.get({
      //   ext:`information/getInformation/1/0/1/10`
      // })
      // .then(res=>{
      //   if(res.code===1){
      //     this.list = this.list.concat(res.data.list)
      //   }
      // })
    },
    goPos() {
      document.body.scrollTop = 600
    }
  }
}
</script>
