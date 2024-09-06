<template>
  <b-form-select v-model="$i18n.locale" class="mr-2 cursor-pointer text-dark" @input="changeLocale">
    <option v-for="(locale, i) in locales"
            :key="`locale-${i}`"
            :value="locale.locale"
    >
      {{ locale.title }}
    </option>
  </b-form-select>
</template>

<script setup>
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {useToast} from "vue-toastification";

const i18n = useI18n()
const toast = useToast()
const locales = ref([
  {
    title: 'O\'zbek',
    locale: 'uz'
  },
  {
    title: 'Узбек',
    locale: 'oz'
  },
  {
    title: 'Русский',
    locale: 'ru'
  },
])

const changeLocale = (event) => {
  let lang = JSON.parse(localStorage.getItem('UserData'))
  lang.language = event

  localStorage.setItem('UserData', JSON.stringify(lang))
  toast.success("Успешно изменен")
}
</script>
