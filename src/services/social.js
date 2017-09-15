import { WX_SHARE_SIGNURL } from './config.js'
import api from '@/services/api';
import cookie from '@/services/cookie'

window['wxVerify'] = false; // 微信是否通过验证,可以调用jssdk
const jsApiList = [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'hideMenuItems',
    'showMenuItems',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'onVoicePlayEnd',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'previewImage'
];

const social = {
    init() {
        var _sdkScriipt = document.createElement('script');
        _sdkScriipt.src = 'http://m.fans.smi170.com/static/lib/jweixin-1.0.0.js';
        document.body.appendChild(_sdkScriipt);
        _sdkScriipt.onload = () => {
            this.verify();
        }
    },
    getChannelType: function () {
        var fromType = '';
        var origin = location.origin
        if (origin === 'http://xmlife.smi170.com') {
            fromType = 'SMI_LIFE'
        }
        else {
            fromType = 'SMI_COMMUNICATION'
        }
        return fromType
    },
    verify: function () {
        if (!wxVerify) {
            let link = encodeURIComponent(window.location.href.split('#')[0]);
            api.post({
                'ext': WX_SHARE_SIGNURL,
                'appId': this.getChannelType(),
                'url': link,
            }).then(res => {
                // alert('配置微信分享')
                window['wx'].config({
                    'debug': false,
                    'appId': res.entity.appid,
                    'timestamp': res.entity.timestamp,
                    'nonceStr': res.entity.nonceStr,
                    'signature': res.entity.signature,
                    'jsApiList': jsApiList
                });

                window['wx'].ready(function () {
                    window['wxVerify'] = true;
                });

                window['wx'].error(function (res) {
                    console.log('验证失败')
                    window['wxVerify'] = false;
                });
            })
                .catch(error => {
                    console.log(error)
                    console.log('出错了')
                })
        }
    },
    share: function (data) {
        let type = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]; // 默认需要设置的分享类别
        // console.log(cookie)
        // cookie.set({
        //     type:'SMI_COMMUNICATION'
        // })
        var fromType = '';
        if (window.location.href.indexOf('type') > -1) {
            fromType = wxCommon.getQueryStringRegExp('type').split('#')[0];
        } else if (window.location.href.indexOf('state') > -1) {
            fromType = wxCommon.getQueryStringRegExp('state').split('#')[0];
        } else {
            fromType = cookie.get('type') || 'SMI_COMMUNICATION';
        }
        data.link = data.link + '?type=' + this.getChannelType()

        if (window.wx) {  // 微信 分享
            console.log(data)
            window['wx'].ready(function () {
                for (let attr of type) {
                    window['wx'][attr](data);
                }
            });
        }
        if (window.setShareInfo) {  // qq 分享
            window.setShareInfo({
                title: data.title,
                summary: data.desc,
                pic: data.imgUrl,
                url: data.link
            });
        }
    },
    signService: function () { },
    // 查看图片
    previewImage(pCurrent, pUrls) {
        window['wx'].previewImage({
            'current': pCurrent, // 当前显示图片的http链接
            'urls': pUrls // 需要预览的图片http链接列表
        });
    }
}

export default social
