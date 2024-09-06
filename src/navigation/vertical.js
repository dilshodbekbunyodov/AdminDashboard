export default [
    {
        header: 'ПАНЕЛИ МОНИТОРИНГА',
    },
    {
        title: 'Событие',
        route: '/events',
        icon: 'ri-calendar-event-line',
        permissions: ['admin']
    },
    {
        title: 'Блюда',
        route: '/reference/meals',
        icon: 'ri-store-2-line',
        permissions: ['dilshod'],
    },
    {
        title: 'Справочник',
        route: '/reference',
        icon: 'ri-tools-line',
        permissions: ['admin'],
    },

    {
        header: "АДМИНИСТРИРОВАНИЕ",
    },
    {
        title: 'Управление пользовательями',
        route: '/user-detail',
        icon: 'ri-user-settings-line',
        permissions: ['admin'],
    },
    {
        title: 'Пользователей',
        route: '/users',
        icon: 'ri-user-add-line',
        permissions: ['admin'],
    },
    {
        title: 'Video Strem',
        route: '/test',
        icon: 'ri-user-add-line',
        permissions: ['admin'],
    },

]
