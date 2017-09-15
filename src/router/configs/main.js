const _import = require('../_import_' + process.env.NODE_ENV);

let mainConfig = [
    {
        path: '/',
        meta: {},
        component: _import('app-entry')
    },
    {
        path: '/home',
        name: 'home',
        meta: {},
        component: resolve => require(['@/pages/home/home'], resolve)
    },
    {
        path: '/list',
        name: 'list',
        meta: {
            storePostion: true,
            storeWhenGo: ['detail'],
        },
        component: _import('list')
    },
    {
        name: 'detail',
        path: '/detail/:id',
        meta: {},
        component: _import('detail')
    },
    {
        name: 'not-found',
        path: '*',
        meta: {
            title:'页面找不到'
        },
        component: _import('page-404')
    }
]

export default mainConfig