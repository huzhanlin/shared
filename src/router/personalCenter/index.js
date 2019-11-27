export default {
    path: "/personalCenter",
    name: "personalCenter",
    component: () => import( /* webpackChunkName: "about" */ '../../views/personalCenter/index.vue'), // 不能添加一对大括号
    // children: [
    //     {
    //         path: '/memberLogin',
    //         redirect: 'login'
    //     },  // 这里必须先有这个对象，否则路由路径不正确
    //     // 应该是路由没有重置的话就找不到login的路径，所以在最上层暴露出来这个路由地址
    //     {
    //         path: 'login',
    //         component: () => import('@/views/memberLogin/login')
    //     },
    //     {
    //         path: 'register',
    //         component: () => import('@/views/memberLogin/register')
    //     },
    //     {
    //         path: 'updataPassword',
    //         component: () => import('@/views/memberLogin/updataPassword')
    //     },
    //     {
    //         path: 'activation',
    //         component: () => import('@/views/memberLogin/activation')
    //     }
    // ]
}

