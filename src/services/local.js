// localstorage操作封装
const default_expires_minute = 24 * 60; // 默认cookie存储24个小时
const default_offset_timeZone = 8 * 60; // 时区偏移分钟

const local = {
  _data: null,
  data(data) {
    this._data = data;
    return this;
  },
  expire(expire) {
    // expire单位为分钟
    var date = new Date();
    expire += default_offset_timeZone; // 添加时区偏移分钟
    date.setTime(date.getTime() + expire * 60 * 1000);
    var expireTime = date.toGMTString();
    for (var attr in this._data) {
      let _val = this._data[attr];
      if (typeof _val === "object") {
        _val = JSON.stringify(_val);
      }
      _val = encodeURIComponent(_val);
      this._data[attr] = expire ? _val + `;expires=${expireTime}` : _val;
    }
    return this;
  },
  store() {
    // console.log(this._data)
    for (var attr in this._data) {
      localStorage.setItem(attr, this._data[attr]);
    }
    this._data = null;
  },
  set(data, expire) {
    this.data(data)
      .expire(expire)
      .store();
  },
  get(key) {
    var _cache = localStorage.getItem(key);
    if (!_cache) {
      return null;
    }
    // 如果未设置过期时间
    var _expireIndex = _cache.indexOf(";expires=");
    if (_expireIndex === -1) {
      return decodeURIComponent(_cache);
    }
    // 对缓存数据进行格式化,如果过期,则返回null,并删除,如果未过期,返回去掉expires的部分
    return this.format(_cache, key);
  },
  format(cacheStr, key) {
    var _formatData = cacheStr.split(";expires=");
    var _cacheSource = _formatData[0];
    var _cacheExpire = _formatData[1];

    var _dateNow = new Date().getTime();
    var _dateExpire = new Date(_cacheExpire).getTime();

    if (_dateNow > _dateExpire) {
      // 已经过期
      localStorage.removeItem(key);
      return null;
    } else {
      return decodeURIComponent(_cacheSource);
    }
  }
};

export default local;
