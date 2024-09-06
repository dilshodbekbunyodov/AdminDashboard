<template>
  <div :class="showModal ? 'openCatalog menu' : 'defaultCatalog menu'">
    <div class="modal-title">
      <h5>Добавить меню</h5>
      <button class="ri-close-line" @click="$emit('openMenuModal')"/>
    </div>

    <form @submit.prevent="onSubmitMenu">
      <div class="modal-body">
        <b-form-group>
          <label for="dish">Блюда</label>
          <div class="d-flex align-items-center">
            <v-select
                multiple
                class="w-100"
                id="dish"
                :reduce="p => p.id"
                label="dish"
                v-model="dishes.dish_id"
                :options="GET_MEALS_MENU.results"
                @search="searchPro($event)"
            />
            <b-button
                @click="openShowModall"
                class="ml-1"
                variant="success"
            >
              <i class="ri-add-line"></i>
            </b-button>
          </div>
        </b-form-group>

        <div class="modal-footer">
          <b-button @click="$emit('openMenuModal')" variant="secondary">
            Отменить
          </b-button>
          <b-button type="submit" variant="primary">Сохранить</b-button>
        </div>
      </div>
    </form>
  </div>
  <div :class="showModal ? 'black__shadow' : ''"/>

  <add-edit-modal
      :showModal="showModal1"
      :modalValue="modalValue1"
      @openShowModal="openShowModall"
  />
</template>

<script setup>
import {computed, ref, watch} from "vue";
import VSelect from "vue-select";
import store from "@/store/index.js";
import AddEditModal from '../../mealsSoops/addEditModal.vue'
import {useRoute} from "vue-router";
import {useToast} from "vue-toastification";

const emit = defineEmits(["openMenuModal"]);
const showModal1 = ref(false)
const modalValue1 = ref({})

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const dishes = ref({dish_id: []});


const route = useRoute();
const toast = useToast();

const GET_MEALS_MENU = computed(() => {
  return store.state.reference.mealsMenu
})

const openShowModall = () => {
  showModal1.value = !showModal1.value
  modalValue1.value = {}
  store.dispatch('reference/FETCH_PRODUCT_LIST')
}

const searchPro = async (search) => {
  if (search) {
    await store.dispatch("reference/FETCH_MEALS_MENU", {search: search})
  }
}

const onSubmitMenu = () => {
  if (!dishes.value.dish_id?.[0]) {
    toast.error('Ошибка')
  } else {
    store.dispatch("events/CREATE_EVENTS_MENU", {
      event_id: Number(route.params.id),
      dish_id: dishes.value.dish_id
    })
        .then(() => {
          store.dispatch("events/FETCH_EVENTS_DETAIL_DATA", {
            id: route.params.id,
          }).then(() => {
            emit("openMenuModal");
          })
          toast.success("Успешно");
        });
  }
};


watch(() => props?.showModal, function () {
      dishes.value = {
        dish_id: null,
      };
    }
);
</script>
