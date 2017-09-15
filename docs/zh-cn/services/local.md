# localStorage操作

---

> 在原localStorage的基础上,进一步添加了过期的功能,加一层编码,简化了操作

## set()

- **介绍**

在localStorage中存储一个值,值可以为字符串,对象等

- **参数**
    - data `object` 数据对象(必选)
    - expire `number` 过期时间,分钟为单位(可选)

- **示例**

```js
// 简写方式
this.$_local.set({
    userinfo:{
        name:'john'
    }
})
// 带过期时间
this.$_local.set({
    name:'john'
},24*60)
// 链式调用
this.$_local.data({
    name:'john'
})
.expire(24*60)
.store()
```
## get()

- **介绍**

获取到存储到localStorage中的值,在过期时,会返回null,并清空这条记录

- **参数**
    - key `string` localStorage的键名

- **示例**

```js
this.$_local.get('name') // john

this.$_local.get('userinfo') // 字符串的对象 '{name:"john"}'
```