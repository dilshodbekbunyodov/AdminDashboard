<template>
  <div :class="openShowModal ? 'openCatalog menu' : 'defaultCatalog menu'">
    <div class="modal-title">
      <h5>{{ modalValue.id ? 'Редактировать' : 'Добавить' }} пользователя</h5>
      <button class="ri-close-line" @click="$emit('openModal')"/>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="modal-body">
        <b-form-group>
          <label for="name">Имя пользователя</label>
          <b-form-input
              id="name"
              v-model="users.first_name"
          />

          <small v-for="error in validate.first_name.$errors"
                 :key="error.$uid"
                 class="whitespace-nowrap text-danger text-sm"
          >
            {{ $t(error.$message) }}
          </small>
        </b-form-group>

        <b-form-group>
          <label for="name">Фамилия</label>
          <b-form-input
              id="name"
              v-model="users.last_name"
          />
          <small v-for="error in validate.last_name.$errors"
                 :key="error.$uid"
                 class="whitespace-nowrap text-danger text-sm"
          >
            {{ $t(error.$message) }}
          </small>
        </b-form-group>

        <b-form-group>
          <label for="name">Имя</label>
          <b-form-input
              id="name"
              v-model="users.username"
          />
          <small v-for="error in validate.username.$errors"
                 :key="error.$uid"
                 class="whitespace-nowrap text-danger text-sm"
          >
            {{ $t(error.$message) }}
          </small>
        </b-form-group>
      </div>

      <div class="modal-footer">
        <b-button
            @click="closeModal"
            variant="secondary"
        >
          Отменить
        </b-button>
        <b-button
            type="submit"
            :variant="modalValue?.id ? 'warning' : 'primary'"
        >
          {{ modalValue?.id ? 'Редактировать' : 'Сохранить' }}
        </b-button>
      </div>
    </form>
  </div>
  <div
      :class="openShowModal ? 'black__shadow' : ''"
  />
</template>

<script setup>
import {computed, reactive, watch} from "vue";
import {useToast} from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import {required, helpers} from "@vuelidate/validators";
import store from "@/store/index.js";

const props = defineProps({
  openShowModal: {
    type: Boolean,
    default: () => false
  },
  modalValue: {
    type: Object,
    default: () => {
    }
  }
})

let users = reactive({
  first_name: null,
  last_name: null,
  username: null,
  phone_number: 998990893954,
  email: 'director@gmail.com',
})

const emit = defineEmits(['refresh', 'openModal'])
const toast = useToast()


const rules = computed(() => {
  return {
    first_name: {
      required: helpers.withMessage('Поле обязательно для заполнения', required),
    },
    username: {
      required: helpers.withMessage('Поле обязательно для заполнения', required),
    },
    last_name: {
      required: helpers.withMessage('Поле обязательно для заполнения', required),
    },
  };
});
const validate = useVuelidate(rules, users);


const onSubmit = async () => {
  const success = await validate.value.$validate();
  if (!success) return

  try {
    let req = {
      id: props.modalValue?.id,
      ...users
    }

    let val = props.modalValue?.id
        ? await store.dispatch('reference/UPDATE_USERS', req)
        : await store.dispatch('reference/CREATE_USERS', users)

    if (val) {
      emit('refresh')
      emit('openModal')
      props.modalValue?.id ? toast.warning('Успешно') : toast.success('Успешно')
      validate.value.$reset();
    }
  } catch (error) {
    toast.error(error)
    throw error
  }
};

const closeModal = () => {
  emit('openModal')
  validate.value.$reset();
}

watch(() => props.modalValue?.id, function () {
  users.first_name = props.modalValue.first_name
  users.last_name = props.modalValue.last_name
  users.username = props.modalValue.username
})

</script>
