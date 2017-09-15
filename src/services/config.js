let reqUrl = ''
let wxBaseUrl = ''
var wxShareSignUrl = '' // 获取微信jssdk验证地址
let wxLoginBaseUrl = '' // 微信获取自动登录地址
let wxOpenidByCode = '' // 通过跳转 wxLoginBaseUrl 地址处理后返回地址中有code .利用code取得openid
let normalLoginBaseUrl = '' // 通用的账号密码登录地址
let ticketBaseUrl = '' // 电影票优惠券

let qiniuBaseUrl = ''
var env = process.env.NODE_ENV

const VERSION = 'V1'
if (env === 'development') { // 本地调试接口
  reqUrl = `http://192.168.68.25:33001/api-client/${VERSION}/`

  // 微信相关地址
  wxBaseUrl = `http://testmall.xingmeihui.com/smiweb/api/`
  wxShareSignUrl = 'http://testsmi.assets.smi170.com/communication/wx/getWXShare'
  wxLoginBaseUrl = 'http://testsmi.assets.smi170.com/communication/wx/getWXCodeURLEncoder'
  wxOpenidByCode = 'http://testsmi.assets.smi170.com/communication/wx/getWXOpenid'

  normalLoginBaseUrl = `http://login.xingmeihui.com/login.html`
  qiniuBaseUrl = `http://192.168.68.25:30001/api/V1/common/resource/qiniu/config`
  ticketBaseUrl = 'http://192.168.20.50:8042/voucher_list.html'

}
else if (env === 'production') {  // 线上接口
  reqUrl = `http://testmall.xingmeihui.com/api-client/${VERSION}/`
  
  switch (window.location.origin) {
    case 'http://testws.xingmeihui.com': // 星美生活测试
      wxBaseUrl = `http://testws.xingmeihui.com/smiweb/api/`
      wxLoginBaseUrl = 'http://testws.xingmeihui.com/smiweb/api/wx/getWXCode'
      wxOpenidByCode = 'http://testws.xingmeihui.com/smiweb/api/wx/getWXOpenid'
      wxShareSignUrl = 'http://testws.xingmeihui.com/smiweb/api/wx/getWXShare'
      break;
    case 'http://testsmi.assets.smi170.com': // 星美通信测试
      wxBaseUrl = `http://testsmi.assets.smi170.com/smiweb/api/`
      wxLoginBaseUrl = 'http://testsmi.assets.smi170.com/communication/wx/getWXCodeURLEncoder'
      wxShareSignUrl = 'http://testsmi.assets.smi170.com/communication/wx/getWXShare'
      wxOpenidByCode = 'http://testsmi.assets.smi170.com/communication/wx/getWXOpenid'
      break;
    case 'http://m.smi170.com': // 星美生活生产环境
      wxBaseUrl = `http://m.smi170.com/smiweb/api/`
      wxLoginBaseUrl = 'http://m.smi170.com/smiweb/api/wx/getWXCode'
      wxOpenidByCode = 'http://m.smi170.com/smiweb/api/wx/getWXOpenid'
      wxShareSignUrl = 'http://m.smi170.com/smiweb/api/wx/getWXShare'
      break;
    case 'http://10049.smi170.com': // 星美通信生产环境
      wxBaseUrl = `http://10049.smi170.com/smiweb/api/`
      wxLoginBaseUrl = 'http://10049.smi170.com/communication/wx/getWXCodeURLEncoder'
      wxShareSignUrl = 'http://10049.smi170.com/communication/wx/getWXShare'
      wxOpenidByCode = 'http://10049.smi170.com/communication/wx/getWXOpenid'
      wxShareSignUrl = 'http://10049.smi170.com/communication/wx/getWXShare'
      break;
    default:
      break;
  }
  
  normalLoginBaseUrl = `http://login.xingmeihui.com/login.html`
  qiniuBaseUrl = `http://192.168.68.25:30001/api/V1/common/resource/qiniu/config`
  ticketBaseUrl = 'http://192.168.20.50:8042/voucher_list.html'
}

export const API_ROOT = reqUrl
export const CONTENT_TYPE = 'application/x-www-form-urlencoded'
export const MOCK_TRY = true // 正常接口返回失败时是否尝试用模拟数据模式

/**
 * 微信相关地址
 */
// 跳转到微信自动登录地址
export const WX_LOGIN_BASEURL = wxLoginBaseUrl
//微信获取信息地址
export const WX_BASE_URL = wxBaseUrl 
// 根据code获取openid
export const WX_OPENID_BY_CODE = wxOpenidByCode
// 微信分享地址
export const WX_SHARE_SIGNURL = wxShareSignUrl


// 正常登录地址
export const NORAML_LOGIN_BASEURL = normalLoginBaseUrl
//七牛地址
export const QINIU_BASE_URL = qiniuBaseUrl
// 票务优惠券页面
export const TICKET_BASE_URL = ticketBaseUrl