import axios from "../../@core/jwt/jwtService.js";

export default {
    namespaced: true,
    state: {
        productList: {
            results: []
        },
        eventUnit: [],
        eventType: [],
        productType: [],
        mealsMenu: {
            results: []
        },
        mealsMenu2: {
            results: []
        },

        productAmount: {
            products: []
        },

        usersList: {
            count: 0,
            results: []
        }
    },
    actions: {
        CREATE_PRODUCT_DATA(_, data) {
            return axios.post('/event/product/', data)
        },

        UPDATE_PRODUCT_DATA(_, data) {
            return axios.patch(`/event/product/${data.id}/`, data)
        },

        async FETCH_PRODUCT_LIST(context, params) {
            return axios.get('/event/product/', {params})
                .then((res) => {
                    context.state.productList = res.data
                })
            // const {data} = await axios.get('/event/product/', {params})
            // context.state.productList = data
        },

        DELETE_PRODUCT_DATA(_, id) {
            return axios.delete(`/event/product/${id}/`)
        },

        FETCH_EVENT_UNIT(context, params) {
            return axios.get('/event/unit/', {params})
                .then((res) => {
                    context.state.eventUnit = res.data
                })
        },

        UPDATE_UNIT(_, data) {
            return axios.patch(`/event/unit/${data.id}/`, data)
        },

        CREATE_UNIT(_, data) {
            return axios.post('/event/unit/', data)
        },

        DELETE_UNIT(_, id) {
            return axios.delete(`/event/unit/${id}/`)
        },

        FETCH_EVENT_TYPE(context) {
            return axios.get('/event/product-type/')
                .then((res) => {
                    context.state.eventType = res.data
                })
        },


        // product typeProduct
        CREATE_PRODUCT_TYPE(_, data) {
            return axios.post('/event/product-type/', data)
        },

        UPDATE_PRODUCT_TYPE(_, data) {
            return axios.patch(`/event/product-type/${data.id}/`, data)
        },

        DELETE_PRODUCT_TYPE(_, id) {
            return axios.delete(`/event/product-type/${id}/`)
        },

        FETCH_PRODUCT_TYPE(context, params) {
            return axios.get('/event/product-type/', {params})
                .then((res) => {
                    context.state.productType = res.data
                })
        },

        // meals soops

        FETCH_MEALS_MENU(context, params) {
            return axios.get('/event/event-menu/all_unique_dishes_name/', {params})
                // return axios.get('/event/event-menu/all_unique_count_people/', {params})
                .then((res) => {
                    context.state.mealsMenu = res.data
                })
        },


        FETCH_MEALS_MENU2(context, params) {
            return axios.get('/event/event-menu/all_unique_dishes_name/', {params})
                .then((res) => {
                    context.state.mealsMenu2 = res.data
                })
        },

        DELETE_MEALS_MENU(_, params) {
            return axios.delete(`/event/event-menu/${params.id}/`, {params})
        },

        CREATE_MEALS_MENU(_, data) {
            return axios.post('/event/event-menu/', data)
        },

        UPDATE_MEALS_MENU(_, data) {
            return axios.patch(`/event/event-menu/${data.id}/`, data)
        },


        /////product-amount
        FETCH_PRODUCT_AMOUNT(context, params) {
            return axios.get(`/event/event-menu/${params.id}/`)
                .then((res) => {
                    context.state.productAmount = res.data
                })
        },

        async FETCH_USERS_LIST(context, params) {
            const {data} = await axios.get('/users/users/', {params})
            context.state.usersList = data
        },

        CREATE_USERS(_, data) {
            return axios.post('/users/users/', data)
        },

        UPDATE_USERS(_, data) {
            return axios.patch(`/users/users/${data.id}`, data)
        },

        DELETE_USERS(_, id) {
            return axios.delete(`/users/users/${id}`)
        }
    }
}
