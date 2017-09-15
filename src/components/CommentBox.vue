<template>
    <div>
        <div v-show="showCommentText" class="smi-mask smi-full-mask"></div>
        <div class="textarea-wrap" :class="{'smi-textarea':!isApp,'smi-app-textarea':isApp,'hidden-textarea':!showCommentText}">
            <textarea v-model="commentContent" :placeHolder="commentPlaceHolder" ref="commentInput"></textarea>
            <div class="comment-action">
                <span class="fl comment-count">
                    <i :class="{'count-error':commentContent.length>120}">{{commentContent.length}}</i>
                    /
                    <b>120</b>
                </span>
                <button @click="cancelComment">取消</button>
                <button class="reply-btn" :disabled="submitNow" @click="replyNow()">回复</button>
            </div>
        </div>
        <div class="action-bar" :class="{'hidden-input':showCommentText}">
            <div class="action-bar-inner cl">
                <input type="text" @focus="comment" placeholder="说点什么吧" class="fl comment-bridge">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'showCommentText',
            'commentPlaceHolder',
            'isApp',
            'submitNow'
        ],
        data() {
            return {
                commentContent: ''
            }
        },
        watch: {
            'showCommentText': function () {
                if (this.showCommentText) {
                    this.commentContent = '';
                    this.$refs.commentInput.focus();
                }
            }
        },
        methods: {
            cancelComment() {
                this.$emit('onCancel');
            },
            replyNow() {
                let _comment = this.commentContent.trim();
                if (_comment.length > 120) {
                    this.$_showtip('评论内容不能超过120个字!', 'error', this.isApp);
                    return false;
                }
                if (this.commentContent.trim() === '') {
                    this.$_showtip('评论内容不能为空!', 'error', this.isApp);
                    return false;
                }
                else {
                    this.$emit('onReply', this.commentContent);
                }
            },
            comment() {
                if(!this.isApp) {
                  this.$store.dispatch('toggleShowDownGuide');
                  return false ;
                }
                this.$emit('onComment');
            }
        }
    }

</script>
<style lang="scss">
    @import "../themes/_variable.scss";
    .fade-leave-active {
        opacity: 0;
        transition: all 0.5s ease
    }
    .textarea-wrap {
        width: 100%;
        position: fixed;
        left: 0;
        z-index: 99;
        background: #fff;
        padding: 10px 0;
    }

    .smi-textarea {
        top: 40px;
    }

    .smi-app-textarea {
        top: 56px;
    }

    .hidden-textarea {
        top: -200px;
    }

    textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        height: 120px;
        border: none;
        font-size: 1.7rem;
        line-height: 1.4;
        letter-spacing: .8;
    }

    .comment-action {
        text-align: right;
        padding-right: 10px;
        button {
            display: inline-block;
            margin-right: 10px;
            font-size: 1.4rem;
            color: #333;
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
        }
        .reply-btn {
            background: $mtc;
            color: #fff;
        }
        .comment-count {
            font-size: 1.3rem;
            color: $sfc;
            line-height: 30px;
            padding-left: 10px;
        }
        .count-error {
            color: red;
        }
    }
    .action-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        .action-bar-inner {
            height: 36px;
            padding: 5px 10px;
            position: relative;
        }
        .comment-bridge {
            width: 100%;
            height: 36px;
            text-align: left;
            font-size: 1.4rem;
            border: 1px solid #999;
            padding-left: 10px;
            box-sizing: border-box;
            color: #999;
            border-radius: 2px;
        }
    }
    .hidden-input {
        visibility: hidden;
    }
</style>
