<template>
  <div class="upload-page">
    <vi-header :title="pageTitle"></vi-header>
    <main class="smi-content">
      <div style="height:30px;"></div>
      <label for="img-upload-input" class="smi-btn upload-label">
        上传图片
        <input type="file" id="img-upload-input" @change="bindPicFileChange" multiple>
      </label>
      <ul>
        <li class="upload-result-item" v-for="(item,index) in uploadImgUrls" :key="index">
          <img v-if="item" :src="item" alt="">
          <input type="text" :value="item">
          <a :href="item" target="_blank">{{item}}</a>
        </li>
        <li class="upload-result-item" v-if="allPicStr!==''">
          <p>所有结果拼接</p>
          <input type="text" :value="allPicStr">
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ViHeader from '@/components/ViHeader'
import LoadMore from '@/components/LoadMore'
import {
  QINIU_BASE_URL
} from '@/services/config'

export default {
  name: 'upload',
  components: {
    'load-more': LoadMore,
    'vi-header': ViHeader
  },
  data() {
    return {
      pageTitle: this.$route.meta.title,

      qiniuUploadUrl: 'http://up-z2.qiniu.com/',
      qiniuToken: '',
      qiniuDomain: '',
      uploadImgUrls: [],
      uploadQueue: [], // 图片上传队列
      currentChunk: 0,
    }
  },
  computed: {
    ...mapGetters({
    }),
    'allPicStr':function(){
      return this.uploadImgUrls.join(',')
    }
  },
  mounted() {
    this.getQiniuToken()
  },
  methods: {
    getQiniuToken() {
      this.$_api.get({
        ext: QINIU_BASE_URL
      })
        .then(res => {
          if (res.result) {
            this.qiniuToken = res.uptoken
            this.qiniuDomain = res.domain
          }
        })
    },
    bindPicFileChange(ev) {
      this.uploadQueue = ev.target.files
      this.currentChunk = 0
      this.uploadImgUrl = []
      this.uploadPic()
    },
    uploadPic() {
      this.$_api.formPost({
        ext: this.qiniuUploadUrl,
        token: this.qiniuToken,
        file: this.uploadQueue[this.currentChunk]
      })
        .then(res => {
          this.uploadImgUrls.push(`${this.qiniuDomain}${res.hash}`)
          if (this.currentChunk < this.uploadQueue.length - 1) {
            this.currentChunk++
            this.uploadPic()
          }
        })
    },
  }
}
</script>
<style lang="scss" src="./upload.scss" scoped></style>
