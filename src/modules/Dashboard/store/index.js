// import axios from '../../@core/jwt/jwtService.js'

export default {
    namespaced: true,
    state: {
        userData2: JSON.parse(localStorage.getItem("UserData")),
        productList: {
            results: []
        },
    },
    actions: {}
}
