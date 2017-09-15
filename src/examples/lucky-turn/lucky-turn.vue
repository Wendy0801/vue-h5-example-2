<template>
    <div class="lucky-turn-page">
        <header class="smi-header">
            <go-back></go-back>
            <h2>幸运大转盘</h2>
        </header>
        <main class="smi-content">
            <lucky-turntable :config="luckyTurntableConfig"></lucky-turntable>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import GoBack from '@/components/GoBack';
import LoadMore from '@/components/LoadMore.vue';
import LuckyTurntable from '@/components/LuckyTurntable'

export default {
    name: 'lucky-turn',
    components: {
        'load-more': LoadMore,
        'go-back': GoBack,
        'lucky-turntable': LuckyTurntable,
    },
    data() {
        return {
            luckyTurntableConfig: {
                data: [
                    {
                        prize_id: 1,
                        content: '<div class="col">星美通信</div><div class="col">流量<i>1024M</i></div>',
                        img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
                    },
                    {
                        prize_id: 2,
                        content: '<div class="col"><i>Aigo</i>立体声</div><div class="col">耳麦<i>A0707</i></div>',
                        img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
                    },
                    {
                        prize_id: 3,
                        content: '<div class="col"><i>Aigo</i></div><div class="col">蓝牙机<i>X7</i></div>',
                        img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
                    },
                    {
                        prize_id: 4,
                        content: '<div class="col"><i>Aigo</i></div><div class="col">复读机<i>V8</i></div>',
                        img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
                    },
                    {
                        prize_id: 5,
                        content: '<div class="col">联想<i>Pad</i></div>',
                        img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
                    },
                    {
                        prize_id: 6,
                        content: '<div class="col">星美影票</div>',
                        img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
                    },
                    {
                        prize_id: 7,
                        content: '<div class="col">中国红版</div><div class="col"><i>Iphone7p</i></div><div class="col"><i>256G</i></div>',
                        img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
                    },
                    {
                        prize_id: 8,
                        content: '<div class="col">星美通信</div><div class="col">流量<i>10M</i></div>',
                        img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
                    },
                    {
                        prize_id: 9,
                        content: '<div class="col">星美通信</div><div class="col">流量<i>100M</i></div>',
                        img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
                    },
                    {
                        prize_id: 10,
                        content: '<div class="col">星美通信</div><div class="col">流量<i>500M</i></div>',
                    },
                ],
                // colors:[
                //   '#fff','#FFF4D4'
                // ],
                // background:'',
                // pointer:''
            },
        }
    },
    computed: {
        ...mapGetters({
        }),
        'bgStyle': function () {
            var _rotateDeg = this.bgRotateData['block-' + this.blockNum];
            console.log(_rotateDeg)
            var _styleStr = `transform:rotate(${_rotateDeg}deg)`;
            return _styleStr;
        },
    },
    mounted() {

    },
    methods: {

    }
}
</script>
<style lang="scss" src="./lucky-turn.scss" scoped></style>
