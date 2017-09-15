# 地址或者类似地址的处理

---

?> 原生的search和replace都有针对单页面的#形式的实现,即`location.search` 对应#/?`page=1`

## search

> `searchStr`可以传入类似location.search的字符串进行处理,如`?a=1&b=2`

- **参数**
    - key `string|null`
    - searchStr `string|locaton.search`

- **介绍**

针对location的search部分进行处理,若传入key,则返回对应的值,若不传key,则是将转换后的对象返回;
如`?a=1&b=2`返回的则是形如`{a:1,b:2}`对象

- **示例**

```js
// 假如当前页面地址是 http://abc.com/?page=1&size=10

// 默认使用
this.$_url.search() // 返回{page:1,size:10}

// 传入key使用
this.$_url.search('page') // 返回1

// 传入key和searchStr
this.$_url.search('a','?a=100&b=200') // 返回100

// 仅传入searchStr,key需要占位
this.$_url.search(null,'?a=100&b=200') // 返回{a:100,b:200}

```

## hashSearch

- **参数**
    - key `string`
    - hashStr `string`

- **介绍**

针对#值后面的类似location.search的实现的字符转换对象

- **示例**

```js
// 假如当前地址是http://abc.com/?page=1&size=10#/?page=2&size=100
// 默认的hashStr则为 #/?page=2&size=100

// 默认使用
this.$_url.hashSearch() // 返回{page:2,size:200}

// 带key
this.$_url.hashSearch('page') // 返回2

```
!> 并不实现不区分location的search还是hash的search去转换获取,手动通过实现

```js
var result = this.$_url.search('key') ||this.$_url.hashSearch('key')
```

## replace

> 调用html5的history的新特性,替换当前页面地址,同时会改变历史记录中的当前地址.完成当前页面在前进后退的时候,转换成另外一个页面,但必须是同源替换,即http://baidu.com 不能replace成http://taobao.com,但可以替换成http://baidu.com/test/1213.html

- **参数**
    - replaceUrl `string`要替换的地址,形如/index.html或test/index.html等等

- **示例**

```js
// 若当前地址 http://abc.com
this.$_url.replace('test/123.html')
// 处理后的当前地址 http://abc.com/test/123.html , 并不会重载页面
```

## hashReplace

- **参数**
    - replaceHash `string` 形如list 或者 #/list 或#/test/123等

- **示例**

```js
// 若当前地址 http://abc.com/#/home
this.$_url.hashReplace('list')
// 处理后的当前地址 http://abc.com/#/list , 并不会重载页面
```

## cleanSearch

- **介绍**
将当前地址替换成一个纯净的去search值的地址,并不刷新页面

- **参数**
    - searchKey `string|可选`
    - urlNow `string|可选`

- **示例**
```js
// 若当前地址 http://abc.com/?page=1&size=100&a=1
this.$_url.cleanSearch('page') // 只清除page键 ,得http://abc.com/?size=100&a=1
this.$_url.cleanSearch() // 清除所有的search 得http://abc.com
```

## stringify

- **介绍**
序列化

- **参数**
    - data `object` 形如{a:1,b:2}
- **示例**
```js
var obj = {a:1,b:2}
this.$_url.stringify(obj) // a=1&b=2
```

## parse

- **介绍**
反序列化

- **参数**
    - str `string` 形如a=1&b=2
    - key `string|可选` 需要获取的key

- **示例**
```js
var str = 'a=1&b=2'
this.$_url.parse(str,'a') // 1
this.$_url.parse(str) // {a:1,b:2}
```