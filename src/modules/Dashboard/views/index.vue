<script setup>
import SidebarTest from '../component/sidebar.vue'
import {ref} from "vue";

const isOpen = ref(false)
const inputVal = ref(null)
const fileInput = ref(null);

const changeFile = (e) => {
  const file = e.target.files[0]
  fileInput.value = e.target.value

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      inputVal.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}
</script>

<template>
  <div class="position-relative">
    <div>
      <img :src="inputVal" alt="ds">
      <label for="inputt" class="btn btn-success">
        {{ fileInput ? fileInput : 'File' }}
      </label>
      <b-button v-if="inputVal" variant="danger" size="sm" class="p-25" @click="inputVal = null"><i
          class="ri-close-line"/></b-button>
      <input class="visually-hidden" type="file" id="inputt" @input="changeFile">
    </div>
    <br>
    <b-button
        @click="isOpen = !isOpen"
        variant="primary"
    >
      Open Sidebar
    </b-button>

    <SidebarTest
        v-model:isOpen="isOpen"
    />
  </div>
</template>
