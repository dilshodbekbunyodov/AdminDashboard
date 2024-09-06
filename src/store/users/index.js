import axios from "../../@core/jwt/jwtService.js";

export default {
    namespaced: true,
    state: {
        usersList: {},
        role: [
            {
                title: 'Админ',
                value: 'admin'
            },
            {
                title: 'Дилшод',
                value: 'dilshod'
            },
        ],
        language: [
            {
                title: 'O\'zbek',
                value: 'uz'
            },
            {
                title: 'Узбек',
                value: 'oz'
            },
            {
                title: 'Русский',
                value: 'ru'
            },
        ],
    },
    actions: {
        FETCH_USERS_DATA(context, id) {
            return axios.get(`/users/users/${id}/`)
                .then((res) => {
                    context.state.usersList = res.data
                })
        },

        UPDATE_USERS_DATA(_, {id, data}) {
            return axios.patch(`/users/users/${id}/`, data)
        },
    }
}
