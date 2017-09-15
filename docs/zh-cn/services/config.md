# 服务相关的配置信息

---

?> 通过运行的环境的不同(`dev`和`production`),定义不同的配置信息


名称 | 应用 |导出
---|---|---|
reqUrl | api请求的root地址 |API_ROOT
wxBaseUrl | 微信登录后相关接口地址,比如通过openid获取用户信息 |WX_BASE_URL
wxLoginBaseUrl | 获取微信跳转登录地址 |WX_LOGIN_BASEURL
wxOpenidByCode | 通过跳转微信登录返回后带的code获取openid调用接口地址 |WX_OPENID_BY_CODE
normalLoginBaseUrl | 微信登录后相关接口地址,比如通过openid获取用户信息 |NORAML_LOGIN_BASEURL
ticketBaseUrl | 票务优惠券地址 |TICKET_BASE_URL
qiniuBaseUrl | 获取七牛上传的token的配置地址 |QINIU_BASE_URL

!> 此文件未被挂载到vue上,所以不能通过`this.$_config`获取到文件内配置信息