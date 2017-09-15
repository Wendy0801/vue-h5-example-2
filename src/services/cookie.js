const default_expires_minute = 24 * 60; // 默认cookie存储24个小时
const default_offset_timeZone = 8 * 60; // 时区偏移分钟

const cookie = {
  _data: null,
  data(sourceData) {
    this._data = [];
    // 将json对象拼接成key=value的数组
    for (var attr in sourceData) {
      let _val = sourceData[attr];
      if (typeof _val === "object") {
        _val = JSON.stringify(_val);
      }
      _val = encodeURIComponent(_val);
      this._data.push(`${attr}=${_val}`);
    }
    return this;
  },
  domain(domain = "") {
    this._data = this._data.map(item => {
      return item + `;domain=${domain}`;
    });
    return this;
  },
  path(path = "/") {
    this._data = this._data.map(item => {
      return item + `;path=${path}`;
    });
    return this;
  },
  expire(expire = default_expires_minute) {
    // expire单位为分钟
    var date = new Date();
    expire += default_offset_timeZone; // 添加时区偏移分钟
    date.setTime(date.getTime() + expire * 60 * 1000);
    var expireTime = date.toGMTString();
    this._data = this._data.map(item => {
      return item + `;expires=${expireTime}`;
    });
    return this;
  },
  store() {
    console.log(this._data);
    this._data.forEach(item => {
      document.cookie = item;
    });
    this._data = null;
  },
  /**
   *
   * @param {*cookie键值式的对象} data
   * @param {*cookie过期时间(分钟为单位),默认为一天(24*60分钟)} expireMinutes
   * @param {*cookie的存储路径,默认为网址当前路径,例如要存在根域名,则传'/'} cookiePath
   * @param {*cookie的存储域名} cookieDomain
   * cookie机制,子域,根域同名cookie可共存,不同路径的cookie可共存不同路径彼此不可见
   */
  set(data, expireMinutes = default_expires_minute, cookiePath, cookieDomain) {
    this.data(data)
      .expire(expireMinutes)
      .domain(cookieDomain)
      .path(cookiePath)
      .store()
  },
  get(cookieName) {
    if (!cookieName) {
      return null;
    }
    if (document.cookie.indexOf(cookieName) !== -1) {
      var cs = document.cookie.split(";"),
        i = 0,
        len = cs.length;
      for (; i < len; i++) {
        if (cs[i].split("=")[0].trim() === cookieName) {
          return decodeURIComponent(cs[i].split("=")[1]);
        }
      }
    }
    return null;
  },
  clearAll(path, domain) {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = 0; i < keys.length; i++) {
        var keyStr = keys[i];
        var cookieData = {};
        cookieData[keys[i]] = this.getCookie(keys[i]);
        this.set(cookieData, -24 * 60, path, domain);
      }
    }
  }
};

export default cookie;
