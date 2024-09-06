<template>
  <div :class="showModal ? 'openCatalog menu' : 'defaultCatalog menu'">
    <div class="modal-title">
      <h5>{{ modalValue.id ? 'Редактировать' : 'Добавить' }} единицы</h5>
      <button class="ri-close-line" @click="$emit('openModal')"/>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="modal-body">
        <label for="name">Наименование</label>
        <b-form-input
            id="name"
            v-model="name"
        />
        <small v-for="error in validate.name.$errors"
               :key="error.$uid"
               class="whitespace-nowrap text-danger text-sm"
        >
          {{ $t(error.$message) }}
        </small>
      </div>
      <div slot="footer" class="modal-footer">
        <b-button
            @click="$emit('openModal')"
            variant="secondary"
        >
          Отменить
        </b-button>
        <b-button
            type="submit"
            variant="primary"
        >
          Сохранить
        </b-button>
      </div>
    </form>
  </div>
  <div
      :class="showModal ? 'black__shadow' : ''"
  />
</template>

<script setup>
import {useToast} from "vue-toastification";
import {computed, ref, watch} from "vue";
import store from "../../../store/index.js";
import useVuelidate from "@vuelidate/core";
import {required, helpers} from "@vuelidate/validators";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: () => false
  },
  modalValue: {
    type: Object,
    default: () => {
    }
  }
})
const emit = defineEmits(['refresh', 'openModal'])
const toast = useToast()
const name = ref(null)

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Поле Наименование обязательно для заполнения', required),
    },
  };
});
const validate = useVuelidate(rules, {name});

const onSubmit = async () => {
  const success = await validate.value.$validate();
  if (!success) return;

  const payload = {
    name: name.value
  }

  try {
    if (props.modalValue?.id) {
      await store.dispatch('reference/UPDATE_UNIT', {
        id: props.modalValue?.id,
        ...payload
      })
    } else {
      await store.dispatch('reference/CREATE_UNIT', payload)
    }

    emit('refresh')
    emit('openModal')
    toast.success('Успешно')
  } catch (error) {
    toast.error(error)
  }
}

watch(() => props.showModal, function () {
      name.value = props.modalValue.name
    },
    {deep: true}
)

</script>
