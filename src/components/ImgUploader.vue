<template>
  <div class="upload-container">
    <div class="crop-container" ref="cropContainer">
      <canvas ref="imgBody"></canvas>
      <div v-show="!imgLoaded" class="imgload-tip">图片加载中,请稍后...</div>
      <div :style="{width:`${(winWidth-cropWidth)/2}px`}" class="mask-left mask" v-show="imgLoaded"></div>
      <div :style="{width:`${(winWidth-cropWidth)/2}px`}" class="mask-right mask" v-show="imgLoaded"></div>
    </div>
    <div class="scale-bar">
      <button @click="scaleImg(1)">+</button>
      <button @click="scaleImg(-1)">-</button>
    </div>
    <div class="action-bar">
      <button class="crop-cancel-btn action-btn smi-primary-btn mint-button--default is-plain" @click="cancelCrop">取消</button>
      <button v-show="imgLoaded" :disabled="uploadNow" class="submit-crop-btn action-btn" @click="submitCrop">确定</button>
    </div>
    <canvas ref="previewBody" width=120 height=120 class="preview-canvans"></canvas>
    <img :src="imgSource" ref="sourceImg" alt="" class="source-img">
  </div>
</template>

<script>
  export default {
    props:[
      'url',
      'token'
    ],
    data() {
      return {
        imgSource:null,
        imgLoaded : false,
        submitNow:false,
        uploadNow:false,
        zipImgUrl: '', // 用canvas压缩后的图片
        winWidth: 0,
        imgRatio:1, // 图片高宽比
        zipWidth: 0, // 不管怎样,让初始图片宽度为浏览器宽度,宽度同图片比例
        scale:1, // 缩放
        cropWidth: 120, // 裁剪的宽度,高度同
        cropImgUrl: '', // 确认裁剪后的图片
        startPos: {
          x: 0,
          y: 0
        },
        movePos: {
          x: 0,
          y: 0
        },
        prevPos: { // 初始图片位置
          x: 0,
          y: 0
        },
      }
    },
    mounted() {
      this.initBind();
      this.winWidth = document.documentElement.clientWidth;
      this.zipWidth = this.winWidth;
    },
    methods: {
      initBind() {
        var container = this.$refs.cropContainer;
        container.addEventListener('touchstart', (e) => {
          if(!this.imgLoaded||this.submitNow) return false ;
          var touch = e.touches[0];
          this.startPos.x = touch.clientX;
          this.startPos.y = touch.clientY;
          e.preventDefault();
        })
        container.addEventListener('touchmove', (e) => {
          if(!this.imgLoaded||this.submitNow) return false ;
          var touch = e.touches[0];
          this.movePos.x = touch.clientX - this.startPos.x;
          this.movePos.y = touch.clientY - this.startPos.y;
          this.moveImg();
          e.preventDefault();
        })
        container.addEventListener('touchend', (e) => {
          // 存储上次移动后的图片位移
          if(!this.imgLoaded||this.submitNow) return false ;
          this.prevPos.x += this.movePos.x;
          this.prevPos.y += this.movePos.y;
          this.cropZipImg();
          e.preventDefault();
        })
      },
      readAsDataURL() { // 将原图片转为base64
        this.imgLoaded = false ;
        var file = this.$parent.$refs.fileInput.files[0];
        if (!/image\/\w+/.test(file.type)) {
          return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.imgSource = e.target.result;
          this.zipImg();
        }
      },
      zipImg() { // 压缩加载的图片
        var img = new Image();
        img.src = this.imgSource;
        img.onload = (e) => {
          var _h = this.zipWidth / img.width * img.height;
          this.imgRatio = img.width/img.height;
          var canvas = this.$refs.imgBody;
          canvas.width = this.zipWidth;
          canvas.height = _h;
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, this.zipWidth, _h);
          ctx.drawImage(img, 0, 0, this.zipWidth, _h);
          this.imgLoaded = true ;
          this.cropZipImg();
        }
      },
      renderCanvasImg(img){
          if(img) {
             var _h = this.zipWidth / img.width * img.height;
          }
          else {
            img = this.$refs.sourceImg ;
            var _h = this.zipWidth / img.offsetWidth * img.offsetHeight;
          }
          var canvas = this.$refs.imgBody;
          canvas.width = this.zipWidth;
          canvas.height = _h;
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, this.zipWidth, _h);
          ctx.drawImage(img, 0, 0, this.zipWidth, _h);
          this.imgLoaded = true ;
          this.cropZipImg();
      },
      scaleImg(direction){
        var _scale = this.scale+direction*0.1;
        if(this.imgRatio>1) { // 宽度大于高度, 则以高度为限
          var _minScale = (this.cropWidth/this.winWidth)*this.imgRatio;
        }
        else {
          var _minScale = this.cropWidth/this.winWidth;
        }
        this.scale = Math.max(_scale,_minScale);
        this.zipWidth = this.winWidth*this.scale;

        this.renderCanvasImg();
      },
      moveImg() {
        let _x = this.prevPos.x + this.movePos.x;
        let _y = this.prevPos.y + this.movePos.y;
        this.$refs.imgBody.style.transform = `translate3d(${_x}px,${_y}px,0)`;
        this.$refs.imgBody.style.WebkitTransform = `translate3d(${_x}px,${_y}px,0)`;
      },
      cropZipImg() { // 裁剪已压缩的图片
        // 算出中间区域 ,相对于压缩的图片的位置
        var canvas = this.$refs.previewBody;
        var container = this.$refs.cropContainer;
        canvas.width = this.cropWidth;
        canvas.height = this.cropWidth;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, this.cropWidth, this.cropWidth);
        ctx.drawImage(
          this.$refs.imgBody,
          -this.prevPos.x + (container.offsetWidth / 2 - this.cropWidth / 2/*裁剪框原点x*/),-this.prevPos.y + (container.offsetHeight/2 - this.cropWidth / 2/*裁剪原点Y*/),
          this.cropWidth, this.cropWidth,
          0, 0, this.cropWidth, this.cropWidth);
      },
      cancelCrop(){
        this.$emit('onCancel');
        this.resetStatu();
      },
      submitCrop() { // 确定裁剪提交
        this.uploadNow = true ;
        this.$_api.showServeWait(true);
        this.submitNow = true ;
        var imgDataUrl = this.$refs.previewBody.toDataURL("image/jpg");
        var imgBlobData = this.data2blob(imgDataUrl)
        var form = new window.FormData();
        form.append('file', imgBlobData);
        // this.token = 'xozWSPMxkMjIVoHg2JyXq4-7-oJaEADLOKHVR0vU:Jl70IJmQWxe4ktw-ssCJJIdKXdE=:eyJzY29wZSI6Impzc2RrIiwiZGVhZGxpbmUiOjE0OTE4ODMwMzd9';
        this.url = 'http://up-z2.qiniu.com/'
        form.append('token', this.token);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.url);
        xhr.send(form);
        xhr.onreadystatechange = ()=> {
          if (xhr.readyState === 4) {
            if (xhr.status == 200) {
              let res = JSON.parse(xhr.responseText);
              if(res.key&&res.key!=='') {
                this.$_showtip('上传头像成功!');
                this.$emit('onSuccess',`http://ojv3htb4g.bkt.clouddn.com/${res.key}`);
                this.resetStatu();
              }
            } else {
              this.$_showtip('上传头像失败,请重试!');
              this.$emit('onFail');
              this.resetStatu();
            }
          }
        }
      },
      resetStatu(){
        this.startPos= {x: 0,y: 0};
        this.movePos= {x: 0,y: 0};
        this.prevPos= {x: 0,y: 0};
        this.imgLoaded = false ;
        this.zipImgUrl ='';
        this.uploadNow = false ;
        this.scale =1 ;
        this.submitNow = false ;
      },
      data2blob(data) {
        // dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
        data = data.split(',')[1];
        data = window.atob(data);
        var ia = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i);
        };
        return new Blob([ia], {
          type: "image/jpg"
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../themes/_basic.scss';
  @import '../themes/_variable.scss';
  .upload-container {
    background: rgba(51, 51, 51, .7);
    position: fixed;
    z-index:101;
    box-sizing: border-box;
    padding-top: 100px;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    overflow: hidden;
  }

  .crop-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ccc;
    overflow: hidden;
    .mask {
      background: rgba(241, 242, 243, 0.8);
      position: absolute;
    }
    .mask-left {
      width: 100px;
      height: 100%;
      left: 0;
      top: 0;
      &:before {
        content: '';
        position: absolute;
        right: -120px;
        top: 0;
        width: 120px;
        height: 50%;
        transform: translateY(-60px);
        background: rgba(241, 242, 243, 0.8);
      }
      &:after {
        content: '';
        position: absolute;
        right: -120px;
        bottom: 0;
        width: 120px;
        height: 50%;
        background: rgba(241, 242, 243, 0.8);
        transform: translateY(60px);
      }
    }
    .mask-right {
      width: 100px;
      height: 100%;
      right: 0;
      top: 0;
    }
  }

  img {
    max-width: 500px;
  }

  canvas {
    position: relative;
  }

  .preview-canvans {
    position: fixed;
    top:40px;
    right:0px;
    visibility:hidden;
  }

  .action-bar {
    position: absolute;
    left: 0;
    bottom: 30px;
    width:100%;
    height:50px;
    text-align:center;
    .action-btn {
      display:inline-block;
      vertical-align:middle;
      margin:0 10px;
      padding:0 30px ;
      color:#fff;
    }
    .crop-cancel-btn {
      border-color:#fff;
      position:relative;
      z-index:9999;
    }
    .submit-crop-btn {
      background:$mtc;
    }
  }
  .imgload-tip {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    line-height:300px;
    text-align:center;
  }
  .scale-bar {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:38px;
    padding-top:10px;
    text-align:right;
    button {
      width:36px;
      height:36px;
      line-height:36px;
      background:#fff;
      border-radius:50%;
      display:inline-block;
      margin-right:10px;
      font-size:2.8rem;
    }
  }
  .source-img {
    visibility:hidden;
    position:absolute;
  }
</style>
