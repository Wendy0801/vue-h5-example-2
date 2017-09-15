
# node-sass 
> 版本升级在window上会有点问题,可以用一个固定可用的版本
- 下载地址: https://git.coding.net/haokuer/node-sass.git

## todos
- 黏性顶部条组件
- 加载更多的通用组件

## 国际化使用

- /src/lang => 语言包

```javascript
{
  home: {
      title: 'title',
      search:'Search Product'
  }
}
```

- 引入库 => import { i18n } from '@/lang'
- vue实例添加 

```javascript
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
```

- dom中使用

```vue
{{$t('home.search')}}
```

## 文档的适用
- 全局安装docsify
`npm install docsify-cli -g`
`docsify serve ./docs`