// import configs from '../../../axios.config.js'
//
// import axios from 'axios'
// import store from "../../store/auth/index.js";
// import router from "../../router/index.js";
// import {useToast} from "vue-toastification";
//
// const toast= useToast()
//
// export const backendPath = configs.baseURL
//
// const axiosIns = axios.create({
//     baseURL: configs.baseURL + '/api/v1',
//     timeout: 20000,
// })
//
//
// axiosIns.interceptors.request.use((config) => {
//         const token = store.actions.getToken()
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         } else {
//             config.headers.Authorization = ''
//         }
//         return config
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._isRetry && !originalRequest.login) {
//             originalRequest._isRetry = true;
//             try {
//                 const accessToken = await refreshAccessToken();
//
//                 // Retry the original request with the new access token
//                 originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//                 return axiosIns.request(originalRequest);
//             } catch (err) {
//                 // Handle error refreshing access token or retrying the request
//                 console.error('Error refreshing access token or retrying request:', err);
//                 throw err;
//             }
//         }
//         return Promise.reject(error);
//     }
// );
//
// axiosIns.interceptors.response.use((config) => {
//     return config
// }, async (error) => {
//     const originalRequest = error.config
//     if (error.response?.status === 401 && error.config && !error.config._isRetry && !error.config.login) {
//         originalRequest._isRetry = true
//         try {
//             const response = await fetch(backendPath, {
//                 withCredentials: true
//             })
//
//             if (response.status === 200) {
//                 const data = await response.json()
//
//                 store.commit('auth/setToken', data.data?.accessToken)
//                 store.commit('auth/setUserData', data.data?.user || {})
//
//                 return axiosIns.request(originalRequest)
//             }
//         } catch (err) {
//             return axiosIns.request(originalRequest)
//         }
//     }
//     return Promise.reject(error)
// })
//
// axiosIns.interceptors.response.use(function (response) {
//         return response
//     },
//     async function (error) {
//
//         if (error.response && error.response.status === 401) {
//
//             localStorage.removeItem("UserData");
//             localStorage.removeItem("access");
//             localStorage.removeItem("refresh");
//             localStorage.removeItem("nightMode");
//
//             await router.push('/login')
//         } else if (error.response && error.response.status === 500) {
//             toast.error('Error from server!')
//         }
//
//
//         return Promise.reject(error)
//     },
// )
//
// async function refreshAccessToken() {
//     try {
//         alert('access')
//         const response = await axios.post('/api/v1/refresh-token', {
//             refreshToken: store.state.auth.refreshToken // Assuming the refresh token is stored in the jwt store module
//         });
//
//         const {accessToken} = response.data;
//
//         // Update the access token in the store
//         store.commit('auth/setToken', accessToken);
//
//         // Return the new access token
//         return accessToken;
//     } catch (error) {
//         // Handle error
//         console.error('Error refreshing access token:', error);
//         throw error;
//     }
// }
//
// export default axiosIns
import configs from '../../../axios.config.js';
import axios from 'axios';
import store from "../../store/auth/index.js";
import router from "../../router/index.js";
import {useToast} from "vue-toastification";
import {ref} from "vue";

const toast = useToast();
const subscribers = ref([])
export const backendPath = configs.baseURL;

const axiosIns = axios.create({
    baseURL: `${configs.baseURL}/api/v1`,
    timeout: 20000,
});

// Request interceptor to add authorization header
axiosIns.interceptors.request.use(
    (config) => {
        const token = store.actions.getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        else config.headers.Authorization = '';
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
axiosIns.interceptors.response.use(
    (response) => response,
    async (error) => {
        const {config, response} = error;
        // store.mutations.setTokenA('dilshod')
        if (!response) {
            toast.error('Network error!');
            return Promise.reject(error);
        }

        if (response.status === 401 && !config._isRetry && !config.login) {
            config._isRetry = true;
            // handleLogout();
            refreshAccessToken()
                .then((accessToken) => {
                    config._isRetry = true;
                    config.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosIns(config);
                })
                .catch((refreshError) => {
                    console.error('Error refreshing access token:', refreshError);
                    handleLogout();
                })
        } else if (response.status === 500) {
            toast.error('Error from server!');
        }

        return Promise.reject(error);
    }
);

async function refreshAccessToken() {
    try {
        const response = await axios.post(`${configs.baseURL}/api/v1/users/refresh`, {
            refresh: store.state.auth.refreshToken
        });
        const {access} = response.data;
        // store.mutations.setTokenA(access);
        await store.dispatch('auth/GET_TOKEN', access)
        console.log(access, 'refreshAccessToken refreshAccessToken refreshAccessToken')
        await onAccessTokenFetched(access)
        return access;
    } catch (error) {
        throw error;
    }
}

async function onAccessTokenFetched(accessToken) {
    alert('onAccessTokenFetched')
    console.log(accessToken, 'onAcs')
    subscribers.value = subscribers.value.filter((callback) => callback(accessToken));
}

function handleLogout() {
    let keys = ["UserData", "access", "refresh", "nightMode", "userAbilities"]

    for (let i = 0; i < keys.length; i++) {
        localStorage.removeItem(keys[i])
    }
    router.push('/login');
}

export default axiosIns;
