<template>
  <transition :name="themeConfig.routerTransition">
    <router-view/>
  </transition>
</template>

<script setup>
import {themeConfig} from "../../theme.config.js";
</script>
