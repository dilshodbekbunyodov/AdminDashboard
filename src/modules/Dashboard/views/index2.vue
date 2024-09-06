<script setup>
import ProfileMenu from '../component/Layout.vue'
import MainLayout from "@/layouts/MainLayout.vue";
</script>

<template>
 <div>
   <div class="w-100 d-flex align-content-start gap-3">
     <div class="card w-25">
       <ProfileMenu />
     </div>
     <div class="w-75">
       <slot />
     </div>
   </div>
 </div>
</template>
