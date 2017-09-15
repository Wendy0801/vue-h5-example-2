# Vue页面级

---

## 总览

- 目录规范,每个页面都需要一个单独的文件夹,文件夹和文件名名字一致,包括vue和scss文件,全部小写,多词用`-`隔开
    - pages/home/home.vue
    - pages/home/home.scss
- vue文件包括template模板和script逻辑,以及scss用链接方式引入
- 每个vue文件定义的全局事件,在离开页面时都需要清除,比如`addEventListener`,`setInterval`,`setTimeout`,`hashChange`等
- 书写顺序依照示例代码顺序(攘外安内,拟定方针,落到实处,天下归一)
    - tempalte
    - import 依赖库导入
    - name 页面name属性
    - components 依赖组件,显示调用,即声明键名和组件`{'component-a':ComponentA}` 而非`{ComponentA}`
    - props 父组件数据
    - data 需要能响应的数据都应该先声明
    - computed 计算属性
    - watch 数据检测
    - mounted 正式启动
    - methods 各种方法
    - beforeDestroy 页面销毁前执行
    
## 示例

```js
<template>
    <div class="page-home">

    </div>
</template>
<script>
import ... // 依赖文件导入
export default {
    'name':'home',
    'components':{
        'component-a':ComponentA
    },
    data(){
        return {

        }
    },
    computed:{
        'age':function(){

        }
    },
    watch:{
        'age':function(){

        }
    },
    mounted(){

    },
    methods:{

    },
    beforeDestroy(){

    }
}
</script>
```