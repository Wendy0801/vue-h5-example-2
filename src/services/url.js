// 地址的服务
import tool from './tool'
const url = {
    /**
     * 原始的search,可以用window.location.search获取http://localhost/?page=1&test=2
     * @param {搜索的key} key 
     * @param {搜索的源字符串,不传则默认是当前地址的search值} searchStr 
     */
    search(key = null, searchStr = window.location.search) {
        if (searchStr.trim() === '') {
            return key ? null : {}
        }
        searchStr = searchStr.substr(1)
        var searchArr = searchStr.split('&')
        var searchJson = {}
        tool.each(searchArr, item => {
            var oItem = item.split('=')
            let key = oItem[0]
            let value = oItem[1]
            searchJson[key] = value
        })
        return key ? searchJson[key] : searchJson
    },
    /**
     * #hash值后面的类query , http://localhost/#/home?page=1&test=2
     * @param {搜索的key,不传则是返回整个查询到的对象} key 
     * @param {搜索的源字符串,不传则默认是当前地址的hash值} hashStr 
     */
    hashSearch(key, hashStr = window.location.hash) {
        var queryIndex = hashStr.indexOf('?')
        var searchStr = hashStr.substr(queryIndex)
        // console.log(searchStr)
        return this.search(key, searchStr)
    },
    /**
     * 替换当前页面,但不重载页面
     * @param {要替换的地址} replaceUrl 
     * 可选形式1 replaceUrl = /index.html
     */
    replace(replaceUrl) {
        return new Promise((resolve, reject) => {
            var randomKey = new Date().getTime() + '_' + parseInt(Math.random() * 1000000)
            var state = {
                title: "页面替换" + randomKey,
                url: replaceUrl
            };
            history.replaceState(state, "", replaceUrl)
            setTimeout(() => {
                resolve(true);
            }, 400)
        })
    },
    /**
     * 
     * @param {要替换的hash值} replaceHash 
     * 可选形式1 replaceUrl = #/list
     * 可选形式2 replaceUrl = list
     */
    hashReplace(replaceHash) {
        var randomKey = new Date().getTime() + '_' + parseInt(Math.random() * 1000000)
        var _hashIndex = location.href.indexOf('#')
        // 去除hash值的纯url
        var _unHashUrl = (_hashIndex !== -1)
            ? location.href.substring(0, _hashIndex)
            : location.href
        // 要替换的完整地址
        var replaceUrl = (replaceHash.indexOf('#/') !== -1)
            ? _unHashUrl + `${replaceHash}?t=` + randomKey
            : _unHashUrl + `#/${replaceHash}?t=` + randomKey
        return this.replace(replaceUrl)
    },
    /**
     * 替换成一个纯净的去search值的地址
     */
    cleanSearch(searchKey = null, urlNow = window.location) {
        var cleanUrl = ''
        if (searchKey) { // 清除某个特定的search值
            var cleanStr = searchKey + '=' + this.search(searchKey)
            var cleanSearch = urlNow.search.replace(cleanStr, '')
            cleanUrl = urlNow.origin + urlNow.pathname + cleanSearch + urlNow.hash
        }
        else {  // 清除所有的search值
            cleanUrl = urlNow.origin + urlNow.pathname + urlNow.hash
        }
        this.replace(cleanUrl)
    },
    /**
     * 序列化,将 {a:1,b:2} => a=1&b=2
     */
    stringify(data){
        var resultArr = []
        var result = ''
        tool.each(data,(val,key)=>{
            resultArr.push(`${key}=${val}`)
        })
        result = resultArr.join('&')
        return result
    },
    /**
     * 反序列化,将 a=1&b=2 => 转成 {a:1,b:2}
     */
    parse(str,key=null){
        str = '?'+str
        return this.search(key,str)
    }
}

export default url