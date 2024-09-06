export default [
    {
        path: 'reference/meals',
        name: 'reference-meals',
        component: () => import('../../views/mealsSoops/index.vue'),
        meta: {
            layout: "MainLayout",
            title: 'Блюдо',
            authRequired: true,
            breadcrumb: [
                {
                    text: 'Блюдо',
                    to: '/reference/meals'
                }
            ],
            permissions: ['admin']
        },
    },
    {
        path: 'reference-meals/:id',
        name: 'reference-meals-id',
        component: () => import('../../views/mealsSoops/mealsDetail/index.vue'),
        meta: {
            layout: "MainLayout",
            title: 'Блюдо деталь',
            authRequired: true,
            breadcrumb: [
                {
                    text: 'Блюдо',
                    to: '/reference/meals'
                },
                {
                    text: 'Блюдо деталь',
                }
            ]
        },
    },

    {
        path: 'reference-meals/:id/:id2',
        name: 'reference-meals-id-id2',
        component: () => import('../../views/mealsSoops/mealsProductAmount/index.vue'),
        meta: {
            layout: "MainLayout",
            title: 'Блюдо деталь',
            authRequired: true,
            breadcrumb: [
                {
                    text: 'Блюдо',
                    to: '/reference/meals'
                },
                {
                    text: 'Блюдо деталь',
                },
                {
                    text: 'Блюдо деталь деталь',
                }
            ]
        },
    },
]
