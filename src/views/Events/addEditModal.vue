<template>
  <div :class="showModal ? 'openCatalog menu' : 'defaultCatalog menu'">
    <div class="modal-title">
      <h5>{{ modalValue.id ? 'Редактировать' : 'Добавить' }} событие</h5>
      <button class="ri-close-line" @click="$emit('openModal')"/>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="modal-body">
        <b-form-group>
          <label for="name">Наименование</label>
          <b-form-input
              id="name"
              v-model="events.name"
          />
          <small v-for="error in validate.name.$errors"
                 :key="error.$uid"
                 class="whitespace-nowrap text-danger text-sm"
          >
            {{ $t(error.$message) }}
          </small>
        </b-form-group>

        <b-form-group>
          <label for="date">Дата</label>
          <FlatPickr
              id="date"
              class="form-control"
              v-model="events.date"
              :config="{locale: Russian}"
          />
          <small v-for="error in validate.date.$errors"
                 :key="error.$uid"
                 class="whitespace-nowrap text-danger text-sm"
          >
            {{ $t(error.$message) }}
          </small>
        </b-form-group>

        <b-form-group>
          <label for="count">Количество гостей</label>
          <b-form-input
              id="count"
              v-model="events.number_of_guests"
          />
          <small v-for="error in validate.number_of_guests.$errors"
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
      :class="showModal ? 'black__shadow' : ''"
  />
</template>

<script setup lang="ts">
import {computed, Ref, ref, watch} from 'vue'
import store from "../../store/index.js";
import {useToast} from "vue-toastification";
import FlatPickr from 'vue-flatpickr-component';
import {Russian} from 'flatpickr/dist/l10n/ru.js';
import useVuelidate, {Validation} from "@vuelidate/core";
import {required, helpers} from "@vuelidate/validators";

interface Props {
  showModal: boolean,
  modalValue?: object
}

const props = defineProps<Props>()


const emit = defineEmits(['refresh', 'openModal'])

interface eventsIns {
  name: null | string,
  date: number | null,
  number_of_guests: number | null,
}

const toast = useToast()
const events = ref<eventsIns>({
  name: null,
  date: null,
  number_of_guests: null,
})

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Поле Наименование обязательно для заполнения', required),
    },
    date: {
      required: helpers.withMessage('Поле Дата обязательно для заполнения', required),
    },
    number_of_guests: {
      required: helpers.withMessage('Поле Количество гостей обязательно для заполнения', required),
    },

  };
});


const validate: Ref<Validation> = useVuelidate(rules, events);
const onSubmit = async () => {
  const success = await validate.value.$validate();
  if (!success) return;

  try {
    if (props.modalValue.id) {
      await store.dispatch('events/UPDATE_EVENTS_DATA', {
        id: props.modalValue?.id,
        ...events.value
      })
    } else {
      await store.dispatch('events/CREATE_EVENTS_DATA', events.value)
    }

    emit('refresh')
    emit('openModal')
    toast.success('Успешно')
  } catch (error) {
    toast.error(error)
  }
}

//watch
watch(() => props.modalValue, function () {
      if (props.modalValue?.id) {
        events.value = JSON.parse(JSON.stringify(props.modalValue))
      } else {
        return events.value = {date: null, name: "", number_of_guests: null}
      }
    },
    {deep: true} as object
);
</script>
