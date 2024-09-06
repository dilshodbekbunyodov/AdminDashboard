<template>
  <div class="d-flex">
    <Sidebar
        @smallSidebar="smallSidebar"
        :small="small"
    />
    <div :class="small ? 'small-content' :  'content'" id="content">
      <component :is="layouts[route.meta.layout] || EmptyLayout">
        <router-view></router-view>
      </component>
    </div>

    <Footer :small="small" />
  </div>
</template>
<script setup>

import Sidebar from "./Sidebar.vue";
import Footer from "./components/Footer.vue";
import {ref} from "vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
// import localLayouts from "@/modules/Dashboard";
import {useRoute} from "vue-router";

const route = useRoute()
let small = ref(JSON.parse(localStorage.getItem('smallSidebar')) || false)
const smallSidebar = () => {
  small.value = !small.value

  localStorage.setItem('smallSidebar', small.value)
}

const layouts = {
  EmptyLayout: EmptyLayout,
  // ...localLayouts
};
</script>

<style scoped>
.content {
  width: 100%;
  padding: 7.75rem 1.6rem 0;
  margin-left: 267px;
  margin-bottom: 65px;
  transition: all .3s;
  //height: 93.1vh;
}

.small-content {
  width: 100%;
  padding: 7.75rem 1.6rem 0;
  margin-left: 90px;
  margin-bottom: 65px;
  transition: all .3s;
}

.fadeInBottom {
  animation-name: fadeInBottom;
  animation-duration: 1s;
  animation-fill-mode: both;
}

@media only screen and (max-width: 600px) {
  .content {
    margin-left: 0;
  }
}
</style>
