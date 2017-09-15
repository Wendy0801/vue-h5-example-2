<template>
  <div class="video-player-wrap">
    <div class="video-intro">
      <div class="user-about">
        <div class="user-face">
          <img v-lazy="videoConfig.avatar" alt="">
        </div>
        <div class="user-name">
          <p>{{videoConfig.author}}</p>
          <p class="update-time">{{videoConfig.date}}</p>
        </div>
      </div>
    </div>
    <div class="video-container" v-if="videoConfig">
      <d-player :video="videoConfig" :loop="loop" :autoplay="autoplay" @play="play" ref="videoPlayer">
      </d-player>
      <!--<video ref="videoPlayer" controls :src="videoConfig.src" :poster="videoConfig.cover"></video>-->
      <h3 class="video-title">{{videoConfig.title}}</h3>
    </div>
    <button @click="closeVideo" class="video-close"></button>
  </div>
</template>
<script>

import VueDPlayer from 'vue-dplayer'
// import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    'd-player': VueDPlayer,
    // videoPlayer
  },
  props: [
    'videoConfig'
  ],
  data() {
    return {
      playerOptions: {
        // component options
        start: 0,
        playsinline: false,
        // videojs options
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: "http://ojv3htb4g.bkt.clouddn.com/Fgq8rrluCW_rIWhDOzKNvm1_25aR"
        }],
        poster: "/static/images/author.jpg",
      },
      // videoConfig: {
      //   url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
      //   pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
      // },
      autoplay: true,
      loop: false
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  mounted() {
    console.log(this.$refs.videoPlayer.player)
    // if()
    // this.$refs.videoPlayer.oncanplay = () => {
    //   this.$refs.videoPlayer.play();
    // }
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(){

    },
    onPlayerLoadeddata(){

    },
    onPlayerWaiting(){

    },
    onPlayerPlaying(){

    },
    onPlayerTimeupdate(){

    },
    onPlayerCanplay(){

    },
    onPlayerCanplaythrough(){

    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    },
    closeVideo() {
      const player = this.$refs.videoPlayer.dp
      player.pause();
      this.videoConfig.src = '';
      setTimeout(() => {
        this.$emit('onVideoClose');
      }, 200)
    },
    puaseVideo() {
      this.$refs.videoPlayer.pause();
    },
    play() {
      console.log('play callback')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../themes/_basic.scss';
@import '../themes/_variable.scss';

.video-player-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
  box-sizing: border-box;
  padding: 20px 0;
  z-index: 99999;
}

.user-about {
  margin: 20px 10px;
  line-height: 25px;
  .user-face {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    @extend %mid;
    img{
      min-width: 100%;
      min-height: 100%;
    }
  }
  .user-name {
    color: #878787;
    @extend %mid;
    .update-time {
      font-size: 1.3rem;
      color: #616564;
    }
  }
}

.video-container {
  background: #000;
  max-height: 400px;
  margin-top: 20px;
}

.dplayer {
  height: 220px;
  video {
    // width: 100vw;
    max-height: 400px;
  }
}

.video-title {
  margin: 10px;
  color: #616564;
}

.video-close {
  position: absolute;
  width: 46px;
  height: 46px;
  top: 10px;
  right: 10px;
  background: url("../assets/icons/close-guide.png") no-repeat center center;
  background-size: 26px auto;
}
</style>