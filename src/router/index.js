import { createRouter, createWebHistory } from 'vue-router'
import { isUserLoggedIn } from './utils'
import events from "./events/events.js";
import reference from "./reference/reference.js";
import meals from "./meals/meals.js";
import Test from '@/modules/Test/router.js'
import Dashboard from '@/modules/Dashboard/router.js'

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/login',
            name: 'login',
            meta: { authRequired: false },
            children: [
                { path: '', component: import('../views/Login.vue'), meta: { authRequired: false } },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            meta: { authRequired: false },
            component: import('../components/errorsPages/404.vue'),
        },
        {
            path: '/',
            component: import('../layouts/MainLayout.vue'),
            redirect: {
                name: 'main',
            },
            children: [
                ...Test,
                ...Dashboard,
                ...events,
                ...reference,
                ...meals
            ]
        },
    ],
})

router.beforeEach(async (to, from, next) => {
    const isLoggedIn = isUserLoggedIn()

    if (to.meta.authRequired && !isLoggedIn) {
        next('/login')
    } else {
        next()
    }
})

router.afterEach((to) => {
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none'
    }

    // Set page title
    const DEFAULT_TITLE = 'DISH'
    document.title = to.meta.title || DEFAULT_TITLE;
})

export default router
