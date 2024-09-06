export default [
    {
        path: "/test",
        name: "test",
        component: () => import("../Test/views/Test.vue"),
        meta: {
            layout: "MainLayout",
        },
    },
];
