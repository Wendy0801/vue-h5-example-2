# HTTP请求库封装

---

## 基本的配置信息

- 第三方请求库axios
- 请求地址根路径API_ROOT,请求失败模拟数据模式MOCK_TRY

!> 例子API_ROOT为http://abc.com

## 第三方库

- 数据加密,主要用于前端md5加密-> jshashes
- jsonp数据请求
- mint-ui的弹窗和等待窗口服务

## 一些通用服务

- 用户登录验证
```javascript
// 默认强制登录,未登录跳转登录
this.$_api.auth()
    .then((userInfo)=>{
        // 已登录的逻辑
    })
    .catch(()=>{
        // 未登录的逻辑
    })
    .finally(()=>{
        // 不管是否登录的逻辑
    })
// 非强制登录
this.$_api.auth({force:false})
    .then((userInfo)=>{

    })
    .catch(()=>{

    })
```
- 弹窗提示登录跳转

## http请求

?> get和post的请求都是调用request方法,最终通过传入参数的不同,进行不同类型的请求


### get()
> 所有的参数都将参与拼接在地址里,如http://abc.com/test?page=1&pageSize=10

```javascript
this.$_api.get({
    ext:'test', // 必填字段,API_ROOT+ext,表示访问不带参数的请求路径
    page:1, // 其他参数,非必须
    pageSize:10, // 其他参数
})
.then(res=>{
    // 成功返回.200状态
})
.catch(err=>{
    // 请求出错,非200状态,服务器错误或404错误等
})
```

### post()
> 基本类似get的请求方式,请求地址只在API_ROOT添加上ext,其他作为数据提交http://abc.com/test/

```javascript
this.$_api.post({
    ext:'test', // 必填字段,API_ROOT+ext,表示访问不带参数的请求路径
    page:1,
    pageSize:10
})
.then(res=>{
    // 成功返回.200状态
})
.catch(err=>{
    // 请求出错,非200状态,服务器错误或404错误等
})
```
### request()

> http请求核心实现,get和post请求都经由此方法

?> 帮助方法-> dataFormat(),实现解析出正确的请求url,清除null和undefined以及空的整洁的参数表,以及是否附加登录信息token,是否请求过程中添加请求加载中提示等

1. 格式化请求数据->dataFormat方法
2. 根据method,区分不同的请求类型.
3. 根据参数是否展示请求加载中提示
4. 返回一个promise对象

!> ext字段是支持完整的http地址的,如果是完整地址,则不对请求地址进行拼接,直接调用ext为请求地址

### jsonp() => 跨域请求

> 基于第三方库jsonp实现

```javascript
this.$_api.jsonp('http://abc/com')
    .then(res=>{
        // 成功返回
    })
    .catch(err=>{
        // 请求出错
    })
```

### formPost() => FormData方式提交数据,常用于文件上传

> 参数格式类似于get和post请求

```javascript
var fileSource = ev.files[0] // 文件资源
this.$_api.formPost({
    ext:'upload',
    file:fileSource
})
.then(res=>{
// 成功返回
})
.catch(err=>{
// 请求出错
})
```

### mock() => 数据模拟提交

!> 在打开MOCK_TRY且在正常请求出错之后,会自动进入数据模拟方法

## 一些其他的小方法

- dataStringify(), 将{a:'1',b:'2'}转化成a=1&b=2
