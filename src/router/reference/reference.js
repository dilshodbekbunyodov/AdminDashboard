export default [
    {
        path: 'reference',
        name: 'reference',
        component: () => import('../../views/Reference/index.vue'),
        meta: {
            layout: "MainLayout",
            title: 'Справочник',
            authRequired: true,
            breadcrumb: [
                {
                    text: 'Справочник',
                }
            ]
        },
    },
    {
        path: '/user-detail',
        name: 'user-detail',
        component: () => import('@/views/profile/index.vue'),
        meta: {
            layout: "MainLayout",
            title: 'Справочник',
            authRequired: true,
            breadcrumb: [
                {
                    text: 'Управление пользовательями',
                }
            ]
        },
    },

    //users
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/Users/index.vue'),
        meta: {
            layout: "MainLayout",
            title: 'Пользователей',
            authRequired: true,
            breadcrumb: [
                {
                    text: 'Пользователей',
                }
            ]
        },
    }
]
