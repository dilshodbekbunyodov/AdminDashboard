import axios from "../../@core/jwt/jwtService.js";

export default {
    async FETCH_EVENT_STATISTICS(context: { state: { eventStatistics: any; };}) {
        const res = await axios.get('/event/event/all_event_statistics/');
        context.state.eventStatistics = res.data;
    },

    async FETCH_EVENTS_DATA({commit}, params: object) {
        const res = await axios.get('/event/event/', {params});
        commit('SET_EVENTS_DATA', res.data);
    },

    DELETE_EVENT_LIST(_, id: number) {
        return axios.delete(`/event/event/${id}/`)
    },

    CREATE_EVENTS_DATA(_, data: object) {
        return axios.post('/event/event/', data)
    },

    UPDATE_EVENTS_DATA(_: any, data: { id: number; }) {
        return axios.patch(`/event/event/${data.id}/`, data)
    },

    async FETCH_EVENTS_DETAIL_DATA({commit}: any, params: { id: number; }) {
        const res = await axios.get(`/event/event/${params.id}/`);
        commit('SET_EVENTS_DETAIL_DATA', res.data);
    },

// /event/dish/
    CREATE_EVENTS_MENU(_: any, data: object) {
        return axios.post('/event/event-menu/', data)
    },

    DELETE_EVENT_MENU(_: any, data: { id: number; }) {
        return axios.delete(`/event/event-menu/${data.id}/`, {data})
    },

    async FETCH_EVENT_DISH_EVENT_MENU({commit}: any, params: object) {
        const res = await axios.get(`/event/event-menu/all_versions_this_dish/`, {params});
        commit('SET_EVENT_DIS_EVENT_MENU', res.data);
    },

    async FETCH_EVENT_DISH_EVENT_MENU2({commit}: any, params: { id: number }) {
        const res = await axios.get(`/event/event-menu/${params.id}/`);
        commit('SET_EVENT_DIS_EVENT_MENU2', res.data);
    },

    CREATE_EVENT_DISH_MENU(_: any, data: object) {
        return axios.post('/event/product-amount/', data)
    },

    UPDATE_EVENTS_PRODUCT_AMOUNT(_: any, data: { id: number }) {
        return axios.patch(`/event/product-amount/${data.id}/`, data)
    },

    DELETE_EVENT_PRODUCT_AMOUNT(_: any, id: number) {
        return axios.delete(`/event/product-amount/${id}/`)
    },

    DELETE_EVENT_DISH_MENU(_: any, id: number) {
        return axios.delete(`/event/event-menu/${id}/`)
    },

    DELETE_EVENT_DISH_MENU2(_: any, id: any) {
        return axios.delete(`/event/product-amount/${id}/`)
    },


    UPDATE_EVENTS_DISH_MENU(_: any, data: { id: number; }) {
        return axios.patch(`/event/event-menu/${data.id}/`, data)
    },

    // event detail

    async FETCH_STATISTIC_CARD(context: { state: { statisticCard: any; }; }, data: { id: number; }) {
        const res = await axios.get(`/event/event/${data.id}/event_statistics/`);
        context.state.statisticCard = res.data;
    },

    //calculation
    async FETCH_PRODUCT_CALCULATION(context: { state: { calculation: any; }; }, data: { id: number; }) {
        const res = await axios.get(`/event/product-amount/${data.id}/all_event_products/`);
        context.state.calculation = res.data;
    },

    UPDATE_PRODUCT_CALCULATION(_: any, data: { id: number }) {
        return axios.patch(`/event/product-amount/${data.id}/`, data)
    },

    FETCH_PRODUCT_EXCEL(_: any, params: { id: number }) {
        return axios.get(`/event/event/${params.id}/event_info/`, {
            timeout: 0,
            responseType: 'blob'
        })
    }
}
