const _import = require('../_import_' + process.env.NODE_ENV);

let exampleConfig = [
    {
        path: '/examples/swiper',
        meta: {},
        component: resolve => require(['@/examples/swiper/swiper'], resolve)
    },
    {
        path: '/examples/lucky-turn',
        meta: {},
        component: resolve => require(['@/examples/lucky-turn/lucky-turn'], resolve)
    },
    {
        path: '/examples/sidebar-test',
        meta: {},
        component: resolve => require(['@/examples/sidebar-test/sidebar-test'], resolve)
    },
    {
        path: '/examples/upload',
        meta: {
            title:'上传栗子'
        },
        component: resolve => require(['@/examples/upload/upload'], resolve)
    },
    {
        path: '/examples/flex-css',
        meta: {
            title:'flex.css库示例'
        },
        component: resolve => require(['@/examples/flex-css/flex-css'], resolve)
    },
]

export default exampleConfig