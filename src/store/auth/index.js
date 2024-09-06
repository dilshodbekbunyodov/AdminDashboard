import axios from '../../@core/jwt/jwtService.js'
import Login from "@/views/Login.vue";

const ACCESS_KEY = 'access'
const REFRESH_KEY = 'refresh'
const USER_DATA = 'UserData'

export default {
    namespaced: true,
    state: {
        accessToken: '',
        userData: JSON.parse(localStorage.getItem("UserData")),
        auth: {
            refreshToken: localStorage.getItem("refresh")
        }
    },

    mutations: {
        setToken(state, data) {
            localStorage.setItem(ACCESS_KEY, data?.accessToken)
            localStorage.setItem(REFRESH_KEY, data?.refreshToken)
            state.auth.refreshToken = data?.refreshToken
        },
        setTokenA(data, state) {
            alert()
            console.log(data, 'accessToken keldi keldi keldi keldi')

            localStorage.setItem(ACCESS_KEY, data)
            localStorage.setItem(REFRESH_KEY, data)
            state.auth.refreshToken = data
        },
        setUserData(state, data) {
            state.userData = data
            localStorage.setItem(USER_DATA, JSON.stringify(data))
        },
    },

    actions: {
        async LOGIN({ commit }, payload) {
            const response = await axios.post('/users/login', payload, { login: true })
            commit('setUserData', response?.data?.user_data)
            commit('setToken', {
                accessToken: response?.data?.access,
                refreshToken: response?.data?.refresh
            })

            localStorage.setItem('nightMode', JSON.stringify(false))
            localStorage.setItem('smallSidebar', JSON.stringify(false))
        },

        getToken() {
            return localStorage.getItem(ACCESS_KEY)
        },

        async GET_TOKEN({ commit }, toke) {
            console.log(toke, 'data keldi actga')
            commit('setTokenA', toke)
        },
    },
}
