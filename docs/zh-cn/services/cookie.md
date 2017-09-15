# cookie操作

---

### 默认配置
- 默认存储时间 `24 * 60`分钟即1天
- 默认时区偏移 `8*60`分钟即8小时 

## set(data,config)

- 参数表

名称 | 类型 | 默认|说明
---|---|---|---|
data | object |{} |要存储的数据
data.key | string |- |要存储的数据的key
data.value | string |- |要存储的数据的值
config | object |{} |存储的数据的配置对象
config.expire | number |24*60(分钟) |cookie过期时间
config.path | string |/ |cookie存储的路径
config.domain | string |当前域名 |cookie存储的域名下

- 用法:

传入一个对象即可,数据的值,必须是字符串的形式;可选是否自定义配置传第二参数,

```js

// vue实例链式调用,data和store为必选,domain,path,expire不必须,前后顺序不限
this.$_cookie
    .data({
        'name':'abc'
    })
    .domain('http://abc.com')
    .path('/')
    .expire(24*60)
    .store();

// 内部实现实则是调上面的链式调用
this.$_cookie.set({
    'name':'abc'
})

this.$_cookie.set({
    'name':'abc'
},24*60,'/','http://abc.com')

```


## get(cookieName)

- 参数
    - cookieName: `string`

- 详细

通过传入键,查询cookie中的相应的值,若值不存在则返回null

- 示例

```js
this.$_cookie.get('name')
```
