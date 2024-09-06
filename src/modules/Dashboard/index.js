import store from "./store/index.js";
import router from "./router";
import ProfileLayout from './views/index2.vue'

const localLayouts = {
    profile: ProfileLayout,
}

export {
    store,
    router,
    localLayouts
};
