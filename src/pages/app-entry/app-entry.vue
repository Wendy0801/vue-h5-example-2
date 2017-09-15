<template>
    <div class="app-entry-page">
        app入口
    </div>
</template>
<script>

export default {
    name: 'app-entry',
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
    },
    watch: {
        '$route': function() {
            this.init()
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            // 程序入口,做各种分发跳转处理
            // 如果是微信登录跳回,因为不可带#值,hash字段为标识
            if (this.$_platform.is('wx')) {
                // 如果地址栏中有hash的参数,表示上一步操作是跳去登录了,此处要跳转回去,并清空hash值
                var redirectHash = this.$_url.search('hash')
                redirectHash = redirectHash ? redirectHash + '?t='+this.$_tool.getRandom() : redirectHash
                if (redirectHash && redirectHash !== '') { //'' 跳到对应的hash地址
                    this.wxRedirectHash(redirectHash)
                }
                else {
                    this.goHome()
                }
            }
            else {
                this.goHome()
            }
        },
        wxRedirectHash(redirectHash) {  // 因为微信登录地址带#会出问题,所有用hash=hash值代替,登录返回需重定向
            this.$_url.cleanSearch('hash')
            // 替换了当前地址,所以需要重新验证微信分享
            this.$_social.init()
            this.$router.replace({
                path: redirectHash
            })
        },
        goHome() { // 正常定向到首页
            this.$router.replace({
                path: '/home'
            })
        }
    }
}
</script>
<style lang="scss" src="./app-entry.scss" scoped></style>
