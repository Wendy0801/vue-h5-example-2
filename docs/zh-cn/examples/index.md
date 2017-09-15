# 示例

---

## 普通样式
- 链接 [这是一个链接地址](https://unpkg.com/vue-amap/dist/index.js) 
- `底色` *斜体 `底色` 斜体*

?> 有底纹的块状

!> 带 `感叹号` 的块状

> 这是一段普通引用

## 表格
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
vid | String | 地图容器节点的ID。
amapManager| AMapManager | 地图管理对象。


## vue执行
执行一段vue示例
<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">
    <template>
        <div>
           <div class="name">{{name}}</div>
            <ul>
                <li v-for="item in 4">{{item}}</li>
            </ul>
        </div>
    </template>
    <style>
    .name{
        color:red;
    }
    </style>
    <script>
        module.exports = {
            data: function () {
                return { name: 'Vue' }
            }
        }
    </script>
</script>
