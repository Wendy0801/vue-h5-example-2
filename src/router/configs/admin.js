// 管理后台路由
const adminConfig = [
    {
        path: '/admin/home',
        meta: {},
        component: resolve => require(['@/admin/home/home'], resolve)
    },
]

export default adminConfig