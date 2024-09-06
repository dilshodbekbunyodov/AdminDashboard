<template>
  <div>
    <b-tabs pills vertical class="tabs__2">
      <b-tab active>
        <template #title>
          <div class="d-flex align-items-center">
            <i class="ri-user-line"/>
            <span class="ml-05">Общий</span>
          </div>
        </template>
        <Usernames/>
      </b-tab>

      <b-tab>
        <template #title>
          <div class="d-flex align-items-center">
            <i class="ri-lock-2-line"/>
            <span class="ml-05">Изменить пароль</span>
          </div>
        </template>
        <Passwords/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script setup>
import Usernames from './usernames.vue'
import Passwords from './passwords.vue'
</script>
