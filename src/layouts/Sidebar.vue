<script setup>
import {ref, onMounted, watch} from "vue";
import {PerfectScrollbar} from "vue3-perfect-scrollbar";
import {themeConfig} from '../../theme.config.js'
import {useRoute} from "vue-router";
import {useToast} from "vue-toastification";
import {check} from "./permissions/index.js";
import Navbar from "./components/Navbar.vue";
import Vertical from '../navigation/vertical'
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import "../assets/sidebar.css";

let currentItem = ref(null);
let route = useRoute();

const vertical = ref(Vertical)
const show = ref(false)
const toast = useToast();

const emit = defineEmits(['smallSidebar'])
const props = defineProps({
  small: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  currentItem.value = route?.path;
});

watch(() => route?.path, function () {
      currentItem.value = route.path;
    }
);

const changeListItem = (item) => {
  if (item && item.route) {
    show.value = !show.value
    currentItem.value = item;
  }
};

const showLayout = () => {
  show.value = !show.value
}
</script>

<template>
  <div :class="themeConfig.navType">
    <Navbar :small="small" :show="show" @showLayout="showLayout"/>

    <div :class="small ? 'small' : ''">
      <div class="head d-md-block d-lg-block" :class="show ? 'show_layout' : 'd-none'" :id="themeConfig.themeColor">
        <div @click="emit('smallSidebar')" class="small__arrow">
          <i :class="small ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'"/>
        </div>

        <div class="my-1 px-3 pt-3" :class="small ? '' : 'd-flex align-items-center'">
          <b-img v-if="themeConfig.appLogoImage" :src="themeConfig.appLogoImage"/>
          <h3 :class="small ? 'd-none' : 'ml-1'">{{ themeConfig.appName }}</h3>
        </div>

        <perfect-scrollbar class="h-100 px-3">
          <ul>
            <li
                v-for="(value, index) in vertical"
                :key="index"
                :class="{ activeListItem: currentItem === value.route }"
                @click.stop="changeListItem(value.route)"
            >
              <span
                  v-if="value.header"
                  class="header__other"
              >
                <svg
                    v-if="small" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-more-horizontal">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
                 <template v-else>{{ value.header }}</template>
              </span>

              <router-link
                  v-if="value.permissions && check(value.permissions)"
                  :to="value.route"
                  class="d-flex align-items-center"
              >
                <i :class="value.icon"/>
                <span class="ml-05">{{ value.title }}</span>
              </router-link>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
    </div>

    <div
        :class="show ? 'black__shadow' : ''"
        @click="showLayout"
    />
  </div>
</template>
