import Vue from "vue";
import axios from "axios";
import tool from "./tool";
import { API_ROOT, CONTENT_TYPE, MOCK_TRY } from "./config";
// const httpReg = new RegExp("https?://", "g");
const REQUEST = axios.create();
REQUEST.defaults.baseURL = API_ROOT;
REQUEST.defaults.headers.post["Content-Type"] = CONTENT_TYPE;
// REQUEST.defaults.transformResponse = function (data) {
//   console.log(data)
//   return {};
// }

// 数据加密
import Hashes from "jshashes";
import cookie from "./cookie";
import jsonp from "jsonp";
import { MessageBox, Indicator } from "mint-ui";

const api = {
  auth({ force = true }) {
    return new Promise((resolve, reject) => {
      var userInfo = cookie.get("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        resolve(userInfo);
      } else {
        if (force) {
          // 是否强制登录
          this.jumpLogin();
        }
        reject("用户未登录");
      }
    });
  },
  jumpLogin: function() {
    MessageBox({
      // title: '登录提示',
      title: "",
      message: "请先登录!",
      confirmButtonText: "去登录",
      showCancelButton: true
    }).then(action => {
      if (action === "confirm") {
        if (window.app_config.isSmiApp) {
          window.location = "smilife://login";
        } else {
          window.location.href =
            `${NORAML_LOGIN_BASEURL}?returnUrl=` +
            encodeURIComponent(window.location.href);
        }
        return false;
      }
    });
  },
  get(sourceData) {
    return this.request("get", sourceData);
  },
  post(sourceData) {
    return this.request("post", sourceData);
  },
  /**
   * 数据格式化,相当于适配器,适配以前的传入参数方式
   * @param {发送请求的源数据} data
   * 职能:1.解析出正确的请求url地址
   * 2.分解出要发送的数据,并清理值为null或者undefined的数据
   * 3.分解出配置信息
   */
  dataFormat(data) {
    let { ext, _withToken = false, _withWait = false } = data;
    let url = this.getRealRequestUrl(ext);
    let cleanData = {};
    // 附带token信息,如果是true,则取cookie的值,字符串则传字符串的值
    if (_withToken) {
      if (typeof _withToken === "string") {
        cleanData.token = _withToken;
      } else if (_withToken === true) {
        let _token = cookie.get("token");
        if (_token) {
          cleanData.token = _token;
        }
      }
    }
    // 清除为空的数据
    for (var attr in data) {
      if (data[attr] || data[attr] === 0) {
        cleanData[attr] = data[attr];
      }
    }
    // 删除多余的数据(配置字段)
    delete cleanData.ext;
    delete cleanData._withToken;
    delete cleanData._withWait;

    return {
      url: data.ext,
      data: cleanData,
      _withWait
    };
  },
  request(method, sourceData) {
    let { url, data, _withWait } = this.dataFormat(sourceData);
    let config = {
      url,
      method
    };

    method === "get"
      ? Object.assign(config, { params: data })
      : Object.assign(config, { data: this.dataStringify(data) });

    _withWait && this.handleWait();

    return REQUEST(config)
      .then(result => this.handleSucc(result))
      .catch(error => this.handleError(error, method, sourceData));
  },
  jsonp(url) {
    return new Promise((resolve, reject) => {
      jsonp(url, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  formPost(data) {
    // formdata方式提交
    let _requrl = this.getRealRequestUrl(data.ext);
    delete data.ext;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let formData = new FormData();
      tool.each(data, (val, key) => {
        formData.append(key, val);
      });
      xhr.open("POST", _requrl, true);
      xhr.send(formData);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            let res = JSON.parse(xhr.responseText);
            resolve(
              this.handleSucc({
                data: res
              })
            );
          } else {
            reject(this.handleError("请求出错"));
          }
        }
      };
    });
  },
  mock(method, data) {
    // console.log('模拟')
    console.log(method);
    console.log(data);
    return axios[method](data.ext, data)
      .then(result => this.handleSucc(result))
      .catch(error => {});
  },
  getRealRequestUrl(url) {
    // var isFullUrl = httpReg.test(url)
    var isFullUrl =
      url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
    return isFullUrl ? url : API_ROOT + url;
  },
  dataStringify(data) {
    var _dataArr = [];
    for (var attr in data) {
      _dataArr.push(`${attr}=${data[attr]}`);
    }
    return _dataArr.join("&");
  },
  handleWait() {
    console.log("请求中..");
    Indicator.open();
  },
  handleSucc(result) {
    // console.log(result)
    console.log("请求结束..");
    return result.data;
  },
  handleError(error, method, data) {
    // console.log('请求错误..')
    // 在请求失败的时候,如果开启mock模拟尝试模式,则调用mock
    if (MOCK_TRY) {
      return this.mock(method, data);
    } else {
      Vue.prototype.$_showtip("请求错误,请稍后重试", "error");
      throw {
        msg: "请求错误",
        type: "user"
      };
    }
  },
  md5(str) {
    var md5Helper = new Hashes.MD5();
    var str = md5Helper.hex(str);
    md5Helper = null;
    return str;
  },
  sha1(str) {
    var sha1Helper = new Hashes.SHA1();
    var str = sha1Helper.hex(str);
    sha1Helper = null;
    return str;
  },
};

export default api;
