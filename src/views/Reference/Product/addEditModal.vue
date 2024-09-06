<template>
  <div :class="openShowModal ? 'openCatalog menu' : 'defaultCatalog menu'">
    <div class="modal-title">
      <h5>{{ modalValue.id ? 'Редактировать' : 'Добавить' }} продукты</h5>
      <button class="ri-close-line" @click="$emit('openModal')"/>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="modal-body">
        <b-form-group>
          <label for="name">Наименование</label>
          <b-form-input
              id="name"
              v-model="product.name"
          />
          <small v-for="error in validate.name.$errors"
                 :key="error.$uid"
                 class="whitespace-nowrap text-danger text-sm"
          >
            {{ $t(error.$message) }}
          </small>
        </b-form-group>

        <b-form-group>
          <label for="name">Единица</label>
          <v-select
              id="name"
              required
              label="name"
              :options="EVENT_UNIT"
              v-model="product.unit"
          />
          <small v-for="error in validate.unit.$errors"
                 :key="error.$uid"
                 class="whitespace-nowrap text-danger text-sm"
          >
            {{ $t(error.$message) }}
          </small>
        </b-form-group>

        <b-form-group>
          <label for="name">Тип</label>
          <v-select
              id="name"
              required
              label="name"
              :options="EVENT_TYPE"
              v-model="product.type"
          />
          <small v-for="error in validate.type.$errors"
                 :key="error.$uid"
                 class="whitespace-nowrap text-danger text-sm"
          >
            {{ $t(error.$message) }}
          </small>
        </b-form-group>
      </div>

      <div class="modal-footer">
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
      :class="openShowModal ? 'black__shadow' : ''"
      @click="$emit('openModal')"
  />
</template>

<script setup>
import {computed, ref, watch} from "vue";
import VSelect from 'vue-select'
import store from "../../../store/index.js";
import {useToast} from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import {required, helpers} from "@vuelidate/validators";

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
const emit = defineEmits(['refresh', 'openModal'])
const toast = useToast()
const product = ref({})


const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Поле Наименование обязательно для заполнения', required),
    },
    unit: {
      required: helpers.withMessage('Поле Единица обязательно для заполнения', required),
    },
    type: {
      required: helpers.withMessage('Поле Тип обязательно для заполнения', required),
    },
  };
});
const validate = useVuelidate(rules, product);


const EVENT_UNIT = computed(() => {
  return store.state.reference.eventUnit
})
const EVENT_TYPE = computed(() => {
  return store.state.reference.eventType
})

const onSubmit = async () => {
  const success = await validate.value.$validate();
  if (!success) return;

  const payload = {
    name: product.value?.name,
    unit: product.value.unit.id,
    type: product.value.type.id,
  };

  try {
    if (props.modalValue?.id) {
      await store.dispatch('reference/UPDATE_PRODUCT_DATA', {
        id: props.modalValue?.id,
        ...payload
      });
    } else {
      await store.dispatch('reference/CREATE_PRODUCT_DATA', payload);
    }

    emit('refresh');
    emit('openModal');
    toast.success('Успешно');
  } catch (error) {
    toast.error(error)
  }
};

watch(() => props.openShowModal, function () {
      if (props.openShowModal || props.modalValue?.id) {
        store.dispatch('reference/FETCH_EVENT_UNIT')
        store.dispatch('reference/FETCH_EVENT_TYPE')
        product.value = JSON.parse(JSON.stringify(props.modalValue))
      } else {
        product.value = {}
      }
    },
    {deep: true}
);
</script>
