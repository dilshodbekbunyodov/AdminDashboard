<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const route = useRoute()

type Category = {
  name: string,
  route: string
}

const category: Category[] = [
  {
    name: 'profile',
    route: 'profile',
  },
  {
    name: 'schedule',
    route: 'profile-schedule',
  },
  {
    name: 'services',
    route: 'profile-services',
  },
  {
    name: 'skills_and_languages',
    route: 'profile-skills',
  },
  {
    name: 'education',
    route: 'profile-education',
  },
  {
    name: 'work',
    route: 'profile-work',
  },
  {
    name: 'awards',
    route: 'profile-achievements',
  },
]

const goToPage = (item) => {
  if (!item.route) return
  router.push({name: item.route})
}
</script>

<template>
  <div v-for="(item, index) in category">
    <div>
      <div class="d-flex align-items-center justify-content-between p-3 cursor-pointer" @click="goToPage(item)">
        <span :class="item.route == route.name ? 'text-primary' : '' ">
          {{ $t(item.name) }}
        </span>
        <i class="ri-arrow-right-s-line" :class="item.route == route.name ? '#6354FF' : '#1D1D21'"></i>
      </div>
      <div v-if="index < category.length - 1" class="line"></div>
    </div>
  </div>
</template>
