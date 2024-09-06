export default [
    {
        path: 'events',
        name: 'events',
        component: () => import('../../views/Events/Index.vue'),
        meta: {
            layout: "MainLayout",
            title: 'Событие',
            authRequired: true,
            breadcrumb: [
                {
                    text: 'Событие',
                    active: false
                }
            ],
            permissions: ['dilshod']
        },
    },
    {
        path: 'events/:id',
        name: 'events/id',
        component: () => import('../../views/Events/EventsDetail/index.vue'),
        meta: {
            layout: "MainLayout",
            title: 'Событие меню',
            authRequired: true,
            breadcrumb: [
                {
                    text: 'Событие',
                    to: '/events'
                },
                {
                    text: 'событие меню'
                }
            ]
        },
    },
    {
        path: 'events/:event/dish/:id',
        name: 'events/id/dish/id',
        component: () => import('../../views/Events/EventsDishDetail/index.vue'),
        meta: {
            layout: "MainLayout",
            title: 'Событие меню деталь',
            authRequired: true,
            breadcrumb: [
                {
                    text: 'Событие',
                    to: '/events'
                },
                {
                    text: 'событие меню'
                },
                {
                    text: 'деталь'
                }
            ]
        },
    },


    ///calculation
    {
        path: 'events-calculation/:id',
        name: 'events-calculation-id',
        component: () => import('../../views/Calculation/index.vue'),
        meta: {
            layout: "MainLayout",
            title: 'Расчет',
            authRequired: true,
            breadcrumb: [
                {
                    text: 'Событие',
                    active: false,
                    to: '/events'
                },
                {
                    text: 'расчет',
                    active: false
                }
            ]
        },
    },
]
