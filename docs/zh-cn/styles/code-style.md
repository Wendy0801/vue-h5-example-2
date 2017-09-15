# 代码规范

## 函数篇

1. 函数的定义

> 如果是跨文件的函数, 参数较多(3个以上),那优先选择显示传入参数

```js

// good
function httpGet(data){
    let showWait = data._withWait || false
    let tokenNeed = data._withToken || false
}

// bad
function httpGet(data,showWait,tokenNeed){

}

```
