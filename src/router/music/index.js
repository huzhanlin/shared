export default {
    path: "/music",
    name: "music",
    component: () => import(/* webpackChunkName: "about" */ '../../views/music'),
    children: [
        {
            path: "/music",
            redirect: 'artist'
        },
        {
            path: 'artist',
            name: 'artist',
            component: () => import('@/views/music/artist')
        },
        {
            path: 'artist/:id',
            name: 'artist_id',
            component: () => import('@/views/music/artist_id')
        },
        {
            path: 'search',
            name: 'search',
            component: () => import('@/views/music/searchPage')
        },
        {
            path: 'singmenu/:id',
            name: 'singmenu_id',
            component: () => import('@/views/music/singmenu_id')
        },
        {
            path: 'singDetail/:id',
            name: 'singDetail_id',
            component: () => import('@/views/music/singDetail_id')
        }     
    ]
}