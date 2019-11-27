import Blog from '@/views/blog/index.vue'
export default {
    path: '/blog',
    name: 'blog',
    component: Blog,
    children: [
        {
            path: '/blog',
            redirect: 'ss'
        },
        {
            path: 'ss',
            component: () => import('@/views/blog/navs/ss')
        },
        {
            path: 'rz',
            component: () => import('@/views/blog/navs/rz')
        },
        {
            path: 'xc',
            component: () => import('@/views/blog/navs/xc')
        },
        {
            path: 'sp',
            component: () => import('@/views/blog/navs/sp')
        },
        {
            path: 'grzl',
            component: () => import('@/views/blog/navs/grzl')
        },
        {
            path: 'skill',
            component: () => import('@/views/blog/navs/skill')
        },
    ]
}