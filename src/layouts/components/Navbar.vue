<template>
  <div class="navbar__nav d-flex align-items-center justify-content-between" :class="small ? 'small-nav' : ''">
    <div
        class="d-lg-none d-md-none mr-1"
        @click="emit('showLayout')"
    >
      <i class="ri-menu-line"/>
    </div>

    <app-breadcrumb
        class="flex-grow-1 d-none d-md-none d-lg-block"
    />

    <div class="d-flex align-items-center">
      <div class="mr-1" @click="openModal"
           v-if="themeConfig.moduleSearch"
      >
        <i
            class="ri-search-line  cursor-pointer"
            style="font-size: 20px"
        />
      </div>

      <Theme class="mr-1"/>

      <Language/>

      <div class="position-relative menu__sub">
        <b-dropdown
            class="btn__gr" size="sm"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
        >
          <template #button-content>
            <div class="d-flex align-items-center justify-content-end">
              <div class="d-sm-flex d-none user-nav align-items-end">
                <p class="mb-0">{{ UserData()?.first_name + " " + UserData()?.last_name }}</p>
                <small class="mb-0">{{ UserData()?.username }}</small>
              </div>
              <b-avatar
                  badge
                  badge-variant="success"
                  :src="UserData()?.photo ? profilePhoto + UserData().photo : emptyImage"
              />
            </div>
          </template>
          <b-dropdown-item
              href="#"
              @click="logout"
          >
            Выйти
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <SearchModal :openShowModal="openShowModal" @openModal="openModal"/>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import Language from '../locales/index.vue'
import Theme from '../theme/index.vue'
import AppBreadcrumb from "./AppBreadcrumb.vue";
import avatarImage from '../../assets/images/avatar.png';
import SearchModal from './SearchModal.vue'
import base_url from '../../../axios.config'
import {themeConfig} from "../../../theme.config.js";
import {UserData} from "@/@core/jwt/index.js";
import handleLogout from "@/@core/jwt/jwtService.js"

const router = useRouter();
const toast = useToast();

const openShowModal = ref(false)

const emit = defineEmits(['showLayout'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  }
})

const openModal = () => {
  openShowModal.value = !openShowModal.value
}

const profilePhoto = ref(base_url.baseURL)

const logout = () => {
  handleLogout()
  router.push("/login");
  toast.success("Успешно");
  let theme = document.getElementById('dark')
  theme.classList.remove('dark')
};

const emptyImage = computed(() => {
  return avatarImage;
})
</script>

<style>
@media only screen and (max-width: 600px) {
  .navbar__nav {
    width: 90% !important;
    margin: 1.3rem 1.5rem 0 !important;
  }
}

.btn__gr .dropdown-toggle {
  padding: 0 !important;
}
</style>
