<template>
  <div :class="small ? 'small-footer' : 'footer'" v-if="themeConfig.footer">
    <p class="mb-0">
      COPYRIGHT
      <span class="text-primary text-decoration-underline">© {{ getYear }} {{ themeConfig.footerCompanyName }}</span>
      All rights Reserved
    </p>
  </div>
</template>

<script setup>
import {themeConfig} from '../../../theme.config.js'
import {computed} from "vue";

const props = defineProps({
  small: {
    type: Boolean,
    default: false
  }
})

const getYear = computed(() => {
  return new Date().getFullYear();
})
</script>

<style scoped>
.footer {
  right: 0;
  position: fixed;
  width: calc(100% - 4rem - 196px);
  padding: 0.8rem 1rem;
  bottom: 0;
  background: #fff;
  box-shadow: 13px -7px 24px 0 rgb(34 41 47 / 10%);
  transition: all .3s;
}

.small-footer {
  right: 0;
  position: fixed;
  padding: 0.8rem 1rem;
  bottom: 0;
  background: #fff;
  box-shadow: 13px -7px 24px 0 rgb(34 41 47 / 10%);
  width: calc(100% - 4rem - 16px);
  transition: all .3s;
}

.footer p {
  font-size: 14px;
  color: #6e6b7b;
  margin-left: 18px;
}

@media only screen and (max-width: 600px) {
  .footer {
    width: 100%;
  }
}
</style>
