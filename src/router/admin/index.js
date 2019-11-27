export default {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../../views/admin/index.vue'),
    children: [
        {
            path: '/admin',
            redirect: 'ss'
        },
        {
            path: 'ss',
            component: () => import('@/views/admin/ss')
        },
        {
            path: 'rz',
            component: () => import('@/views/admin/rz')
        },
        {
            path: 'xc',
            component: () => import('@/views/admin/xc')
        },
        {
            path: 'sp',
            component: () => import('@/views/admin/sp')
        },
        {
            path: 'zl',
            component: () => import('@/views/admin/zl')
        },
        {
            path: 'bk',
            component: () => import('@/views/admin/bk')
        },
        {
            path: 'skill',
            component: () => import('@/views/admin/skill')
        }
    ]

}