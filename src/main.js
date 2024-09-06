import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

import('./assets/main.css')
import('./assets/@core/modal.css')
import('./assets/@core/sidebar.css')
import ('./assets/@core/$colors.css')
import ('./assets/@core/$font-family.css')

import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';

import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

import('../src/assets/@core/vue-select.css')
// css
import 'remixicon/fonts/remixicon.css'
import '../src/assets/@core/transitions.css'

import "vue-toastification/dist/index.css";
import Toast, {POSITION} from "vue-toastification";

import {BootstrapVue3} from 'bootstrap-vue-3'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import i18n from "./plugins/i18n/index.js";


const app = createApp(App)

app.use(i18n)
app.use(store)
app.use(router)
app.use(Toast, {position: POSITION.BOTTOM_RIGHT});
app.use(BootstrapVue3)
app.use("v-select", vSelect)
app.mount("#app");

