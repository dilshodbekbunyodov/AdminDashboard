<template>
  <div class="mt-3">
    <div class="text-right">
      <b-button
          @click="openModal"
          class="text-right mb-2"
          variant="success"
      >
        <i class="ri-add-line"></i>
        Добавить
      </b-button>
    </div>

    <b-card class="mb-3">
      <b-table
              responsive
          class="table-bordered"
          show-empty
          :fields="fieldsType"
          :items="GET_PRODUCT_TYPE"
      >
        <template #empty>
          <p class="text-center">Нет данных</p>
        </template>

        <template #cell(actions)="props">
          <b-button variant="warning" @click="handleEdit(props.item)">
            <i class="ri-edit-2-line text-white"/>
          </b-button>
          {{ " " }}
          <b-button variant="danger" @click="handleDelete(props.item.id)">
            <i class="ri-delete-bin-6-line"/>
          </b-button>
        </template>
      </b-table>
    </b-card>

    <AddEditModal
        @openModal="openModal"
        @refresh="refresh"
        :showModal="showModal"
        :modalValue="modalValue"
    />
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../../store/index.js";
import json from '../../json.ts'
import Swal from "sweetalert2";
import {useToast} from "vue-toastification";
import AddEditModal from './addEditModal.vue'

const fieldsType = ref(json.fieldsType)
const toast = useToast()
const showModal = ref(false)
const modalValue = ref({})

onMounted(() => {
  refresh()
})

const refresh = () => {
  store.dispatch('reference/FETCH_PRODUCT_TYPE')
}

const GET_PRODUCT_TYPE = computed(() => {
  return store.state.reference.productType
})

const openModal = () => {
  modalValue.value = {}
  showModal.value = !showModal.value
}

const handleEdit = (item) => {
  modalValue.value = item
  showModal.value = !showModal.value
}

const handleDelete = (id) => {
  Swal.fire({
    title: "Вы уверены?",
    text: "Вы не сможете вернуть это!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7367F0",
    cancelButtonColor: "#EA5455",
    cancelButtonText: "Отменить",
    confirmButtonText: "Да, удалить!",
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("reference/DELETE_PRODUCT_TYPE", id).then(() => {
        refresh()
        toast.success("Успешно удален");
      });
    }
  });
}

</script>
