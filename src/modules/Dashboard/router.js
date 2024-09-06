export default [
    {
        path: "/",
        name: 'main',
        component: () => import("./views/index2.vue"),
        meta: {
            layout: "profile",
        },
    },
    {
        path: "/profile",
        name: 'profile',
        component: () => import("./pages/profile.vue"),
        meta: {
            layout: "profile",
        },
    },
    {
        path: "/profile-schedule",
        name: 'profile-schedule',
        component: () => import("./pages/schedule.vue"),
        meta: {
            layout: "profile",
        },
    },
];
