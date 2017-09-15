// 运行平台相关
const platform = {
    ua: window.navigator.userAgent.toLowerCase(),
    is(platformName) {
        switch (platformName) {
            case 'wx':
                return this.isWx()
                break;
            case 'h5':
                return this.isH5()
                break;
            case 'app':
                return this.isApp()
                break;
            case 'android':
                return this.isAndroid()
                break;
            case 'ios':
                return this.isIos()
                break;
            case 'android-app':
                return this.isSmiAndroid()
                break;
            case 'android-ios':
                return this.isSmiIos()
                break;
            default:
                return false
                break;
        }
    },
    isWeb() { // 不是微信,不是app里的h5,才是web
        return !(this.isWx() || this.isAndroid() || this.isIos())
    },
    isH5() {
        return true
    },
    isApp() {
        return this.isSmiAndroid() || this.isSmiIos()
    },
    isWx() {
        return this.ua.indexOf('micromessenger') !== -1
    },
    isAndroid() {
        return this.ua.indexOf('android') !== -1
    },
    isIos() {
        return this.ua.indexOf('iphone') !== -1
    },
    isSmiAndroid() {
        return this.ua.indexOf('smi_android') !== -1
    },
    isSmiIos() {
        return this.ua.indexOf('smi_ios') !== -1
    }
}

export default platform