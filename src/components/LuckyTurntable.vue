<template>
    <div>
    
        <div class="lucky-turntable">
            <div class="lucky-turntable-wrap" ref="luckyTable" v-if="config&&config.data">
    
                <div class="lucky-turntable-bg" :class="{'lucky-turntable-odd':petalNum%2===1}">
                    <ul class="skew-list" :style="bgStyle">
                        <li class="skew-col" v-for="(item,index) in petalNum" :key="index" :style="`transform: rotate(${item*(360/petalNum)}deg) skew(${90-(360/petalNum)}deg);`">
                        </li>
                    </ul>
                </div>
    
                <div class="lucky-turntable-content">
                    <div class="lucky-block" v-for="(item,index) in config.data" :key="index" :style="`transform:translateX(-50%) rotate(${(index)*(360/petalNum)}deg)`">
                        <div v-html="item.content"></div>
                        <img v-if="item.img" class="lucky-block-icon" :src="item.img" alt="">
                    </div>
                </div>
            </div>
            <div class="lucky-turntable-point" @click="luckyRun()"></div>
        </div>
        <!-- <input type="text" v-model="timeout"> -->
    </div>
</template>
<script>
export default {
    name: 'lucky-turntable',
    props: [
        'config'
    ],
    data() {
        return {
            bgRotateData: {
                'block-12': 45,
                'block-11': 10,
                'block-10': 0,
                'block-9': 31,
                'block-8': 25,
                'block-7': 16,
                'block-6': 0,
                'block-5': 58,
                'block-4': 45
            },
            rotateDeg: 0,
            toRotateDeg: 1800,
            rotateTime: 7000,
            runNow: false,
            timeout: 6600
        }
    },
    computed: {
        'bgStyle': function () {
            if (!this.config || !this.config.data) {
                return '';
            }
            var _rotateDeg = this.bgRotateData['block-' + this.config.data.length];
            var _styleStr = `transform:rotate(${_rotateDeg}deg)`;
            return _styleStr;
        },
        'petalNum': function () {
            if (this.config.data) {
                return this.config.data.length;
            }
            else {
                return 1
            }
        }
    },
    mounted() {
        console.log(this.config)
    },
    methods: {
        luckyRun() {
            if (this.runNow) {
                return
            }
            this.runNow = true
            this.getLuckyResult()

            this.$refs.luckyTable.className = 'lucky-turntable-wrap wait-result'
            this.$refs.luckyTable.style.transform = `rotate(1800deg)`

            // 等待结果返回
            var waitRunTimer = setTimeout(() => {
                this.$refs.luckyTable.style.transform = `rotate(${this.toRotateDeg}deg)`
                clearTimeout(waitRunTimer)
            }, this.timeout)

            // 结果返回,开始转结果的圈
            var resultRunTimer = setTimeout(() => {
                this.$refs.luckyTable.className = 'lucky-turntable-wrap'
                this.$refs.luckyTable.style.transform = `rotate(${this.toRotateDeg % 360}deg)`
                this.runNow = false
                clearTimeout(resultRunTimer)
            }, 14000)


        },
        getLuckyResult() {
            this.$_api.post({
                'ext': 'http://192.168.68.23:8101/api/activity/lottery/getUserLotteryResult/V1',
                'token': 'MmY1YzYzMzItZTkxNC00N2I2LThkYzctM2VkNzQ5NzI5MWI2'
            })
                .then(res => {
                    // this.toRotateDeg = 2100
                    if (res.code === 1) {
                        var prize_id = res.entry.prize_id
                        this.toRotateDeg = 1800 + 360 - (prize_id - 1) * (360 / this.petalNum)
                    }
                })
                .catch(err => {

                })
        }
    }
}
</script>
<style lang="scss">
.lucky-turntable {
    position: relative;
    background: #FFBF00;
    width: 320px;
    box-sizing: border-box;
    border-radius: 50%;
    overflow: hidden;
    padding: 10px;
    transform-origin: 50% 50%;
    .lucky-turntable-wrap {
        width: 300px;
        height: 300px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
    }

    .wait-result {
        transition-property: transform;
        transition-timing-function: cubicubic-bezier(.08, .82, .17, 1);
        transition-duration: 7s;
    }
    .lucky-turntable-bg {
        .skew-list {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transform-origin: 50% 50%;
        }
        .skew-col {
            width: 150px;
            height: 150px;
            position: absolute;
            transform-origin: 100% 100%;
        }
        .skew-col:nth-of-type(n) {
            background: #fff;
        }
        .skew-col:nth-of-type(2n) {
            background: #FFF4D4;
        }
    }
    .lucky-turntable-odd {
        .skew-col:last-child {
            background: orange;
        }
    }

    .lucky-turntable-content {
        .lucky-block {
            box-sizing: border-box;
            height: 150px;
            position: absolute;
            left: 50%;
            top: 0;
            display: inline-block;
            transform-origin: 50% 100%;
            padding-bottom: 30px;
            padding-top: 10px;
            background-position: bottom center;
            background-size: 100% auto;
            background-repeat: no-repeat;
        }
        .col {
            font-size: 10px;
            letter-spacing: 0;
            width: 14px;
            text-align: center;
            display: inline-block;
            vertical-align: middle;
        }
        .lucky-block-icon {
            position: absolute;
            bottom: 40px;
            width: 18px;
            left: 50%;
            transform: translateX(-50%);
        }
        i {
            writing-mode: vertical-rl;
        }
    }

    .lucky-turntable-point {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 70px;
        height: 76px;
        background: url("../assets/turnplate-pointer.png") no-repeat center center;
        background-size: auto 100%;
        z-index: 2;
        transform: translate3d(-50%, -50%, 0);
    }
}
</style>

