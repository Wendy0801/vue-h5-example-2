// 数据统计埋点
const analysis = {
    activityDetail({ label = '暂无描述', type = 'act', id, title }) { // 活动、咨讯、人物主页、视频
        // console.log(label, type, id, title)
        setTimeout(() => {
            window._XmAnalysisData.push([
                '_trackEvent',
                'ActivityDetail',
                'ActivityDetail',
                `args`,
                `type=${type}[]id=${id}[]title=${title}[]`,
            ]);
            // console.log('详情埋点成功')
        }, 1000)
    },
    showPage({ label = '暂无描述', type = 'act', id, title, actId, userId, userName }) {
        setTimeout(() => {
            window._XmAnalysisData.push([
                '_trackEvent',
                'ActivityDetail',
                'ActivityDetail',
                `args`,
                `type=${type}[]title=${title}[]id=actId-${actId}-userId-${userId}[]userName=${userName}`,
            ]);
            // console.log(`type=${type}[]title=${title}[]id=actId-${actId}-userId-${userId}[]userName=${userName}`)
            // console.log('详情埋点成功')
        }, 1000)
    },
    share({ label = '暂无描述', type = 'act', id, title }) { // 分享
        // __XmAnalysisData.push(['_trackEvent', category, action, label,value);
        // console.log(label, type, id, title)
        setTimeout(() => {
            window._XmAnalysisData.push([
                '_trackEvent',
                'shareLink',
                'shareLink',
                `args`,
                `type=${type}[]id=${id}[]title=${title}[]`
            ]);
            // console.log('分享埋点成功')
        })
    },
    vote({ actorId, channel}) {
        setTimeout(() => {
            window._XmAnalysisData.push([
                '_trackEvent',
                'WeiXinPublic',
                'WeiXinPublic',
                `args`,
                `location=mmaShow[]action=vote[]channel=${channel}[]actorId=${actorId}[]`
                // `type=${type}[]id=${id}[]title=${title}[]`
            ]);
            // console.log('分享埋点成功')
        })
    },
    sign({ channel, nickname, result }) {
        setTimeout(() => {
            window._XmAnalysisData.push([
                '_trackEvent',
                'WeiXinPublic',
                'WeiXinPublic',
                `args`,
                `location=mmaSignUp[]action=signUp[]channel=${channel}[]nickname=${nickname}[]result=${result}[]`
            ]);
            // console.log('报名埋点成功')
        })
    },
    signShow({ channel }) {
        setTimeout(() => {
            window._XmAnalysisData.push([
                '_trackEvent',
                'WeiXinPublic',
                'WeiXinPublic',
                `args`,
                `location=mmaShow[]action=signUp[]channel=${channel}[]`
            ]);
            // console.log('报名埋点成功')
        })
    },
    init() {
        window._XmAnalysisData = window._XmAnalysisData || [];
        if (process.env.NODE_ENV === 'development') {
            window._XmAnalysisData.push(['app_key', 'SmiComm_test']);
        }
        else if (process.env.NODE_ENV === 'production') {
            window._XmAnalysisData.push(['app_key', 'SmiComm']);
        }
        var analysisEl = document.getElementById('XM-analysis');
        if (analysisEl) {
            analysisEl.parentNode.removeChild(analysisEl);
        }

        var _scriptEl = document.createElement('script');
        _scriptEl.id = 'XM-analysis';
        _scriptEl.async = true;

        var ua = navigator.userAgent;
        if (window.location.href.indexOf('/app/') !== -1) {
            _scriptEl.src = 'http://log.smi170.com/smilogger/js/XmAnalysisAppWeb.min.js';
        }
        else {
            _scriptEl.src = 'http://log.smi170.com/smilogger/js/XmAnalysisPcWeb.min.js?SmiLife';
        }

        // if (ua.match(/SMI_FUNS/) || ua.match(/SMI_Android/) || (ua.match(/Android/) && getUrlParam("from") == 'app') || (ua.match(/Android/) && sessionStorage.getItem("platform") == 'app')) {//app端
        //     _scriptEl.src = 'http://log.smi170.com/smilogger/js/XmAnalysisAppWeb.min.js';
        // }
        // else {//移动端 pc端
        //     _scriptEl.src = 'http://log.smi170.com/smilogger/js/XmAnalysisPcWeb.min.js?SmiLife';
        // }

        var htmlHead = document.getElementsByTagName('head')[0];
        htmlHead.appendChild(_scriptEl);
    }
}

export default AnalysisService;
