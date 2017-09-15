# 项目结构

---

```html
root
├──.vscode/                        * vscode编辑器配置文件
├──build/                          * vue-cli生成开发打包配置文件
├──config/                         * vue-cli生成开发打包配置文件
├──dist/                           * 打包生成目录
├──docs/                           * 文档
├──node_modules/                   * 略过不表
├──src/                            * 主要业务代码目录
|   ├──assets/                     * 静态资源,图片等
|   ├──components/                 * 通用组件
|   ├──examples/                   * 示例页面
|   ├──filters/                    * 过滤器
|   ├──lang/                       * 国际化语言包
|   ├──libs/                       * 第三方库的引入以及扩展(包括vue)
|   ├──lodash/                     * 闲暇时研究的第三方库
|   ├──mock/                       * 数据模拟
|   ├──pages/                      * 主要应用的页面
|   ├──router/                     * 路由
|   ├──services/                   * 公用服务
|   |   ├──analysis.js             * 数据埋点
|   |   ├──api-resource.js         * vue-resource封装的数据请求
|   |   ├──api.js                  * axios封装的数据请求
|   |   ├──config.js               * 各种地址及其他的配置文件
|   |   ├──db.js                   * indexDB数据库操作封装
|   |   ├──local.js                * localStorage操作
|   |   ├──platform.js             * 应用平台
|   |   ├──socail.js               * 微信分享
|   |   ├──tool.js                 * 参考lodash抽离出的个别方法
|   |   ├──url.js                  * 对地址栏的一些操作
|   |   └──validate.js             * 数据校验
|   ├──store/                      * vuex状态管理
|   ├──themes/                     * 全局样式主题
|   ├──App.vue/                    * 应用入口
|   └──main.js                     * webpack入口
├──static/                         * webpack不会进一步处理的静态资源
├──test/                           * 测试
├──create.js/                      * 命令行生成代码文件
├──index.html                      * 不表
├──package.json                    * 不表
└──README.md                       * 不表
```
