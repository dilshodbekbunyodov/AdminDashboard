<script setup>
import {onMounted, reactive, ref} from "vue";
import store from "@/store/index.js";
import VPagination from "@hennge/vue3-pagination";
import {watchDebounced} from "@vueuse/core";
import AddEditModal from './addEdit.vue'
import Swal from "sweetalert2";
import {useToast} from "vue-toastification";

const toast = useToast()

const fields = reactive([
  {
    key: "id",
    label: "№",
    thClass: 'text-center',
    tdClass: 'text-center'
  },
  {
    key: "username",
    label: "Имя",
    thClass: 'text-center',
    tdClass: 'text-center'
  },
  {
    key: "full_name",
    label: "Фамилия",
    thClass: 'text-center',
    tdClass: 'text-center'
  },
  {
    key: "email",
    label: "Электронная почта",
    thClass: 'text-center',
    tdClass: 'text-center'
  },
  {
    key: "phone",
    label: "Номер телефона",
    thClass: 'text-center',
    tdClass: 'text-center'
  },
  {
    key: "actions",
    label: "ДЕЙСТВИЯ",
    thClass: 'text-center',
    tdClass: 'text-center'
  },
])
const params = reactive({
  page: 1,
  page_size: 5,
  search: null
})
const isBusy = ref(false)
const openShowModal = ref(false)
const modalValue = ref({})

onMounted(() => {
  refresh()
})

const refresh = async () => {
  try {
    isBusy.value = true
    await store.dispatch('reference/FETCH_USERS_LIST', params)
  } catch (e) {
    isBusy.value = false
    throw e
  }
  isBusy.value = false
}

const changePerPage = (e) => {
  params.page_size = e
  refresh()
}

const changePage = (e) => {
  params.page = e
  refresh()
}

const openModal = () => {
  modalValue.value = {}
  openShowModal.value = !openShowModal.value
}

const handleEdit = (value) => {
  modalValue.value = value
  openShowModal.value = !openShowModal.value
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
      store.dispatch("reference/DELETE_USERS", id)
          .then(() => {
            refresh()
            params.page = 1
            toast.success("Успешно удален");
          });
    }
  });
}

watchDebounced(() => params.search, function () {
  refresh()
}, {
  deep: true,
  debounce: 500,
  maxWait: 5000
})
</script>

<template>
  <div>
    <b-row>
      <b-col md="2">
        <b-form-group label="Поиск...">
          <b-form-input
              placeholder="Поиск..."
              v-model="params.search"
              type="search"
          />
        </b-form-group>
      </b-col>

      <b-col class="ml-auto text-right mt-4" md="2">
        <b-button
            @click="openModal"
            class="text-right"
            variant="success"
        >
          <i class="ri-add-line"></i>
          Добавить
        </b-button>
      </b-col>
    </b-row>

    <b-overlay :show="isBusy" rounded="sm">
      <b-card>
        <b-table
            responsive
            class="table-bordered cursor-pointer"
            show-empty
            :fields="fields"
            :items="store.state.reference.usersList.results"
        >
          <template #empty>
            <p class="text-center">Нет данных</p>
          </template>

          <template #cell(actions)="props">
            <b-button size="sm" class="rounded" variant="warning" @click="handleEdit(props.item)">
              <i class="ri-edit-2-line"/>
            </b-button>
            {{ " " }}
            <b-button size="sm" class="rounded" variant="danger" @click="handleDelete(props.item.id)">
              <i class="ri-delete-bin-6-line"/>
            </b-button>
          </template>
        </b-table>
      </b-card>

      <b-card v-if="store.state.reference.usersList.count">
        <b-row class="align-items-center">
          <b-col md="4">
            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-center mb-0">
                <small class="text-nowrap mr-05">Показать от 1 до</small>
                <b-form-select
                    v-model="params.page_size"
                    :options="[1, 5, 10, 15]"
                    @change="changePerPage"
                />
                <small class="text-nowrap ml-1">{{ store.state.reference.usersList.count }} строк ( 10 )</small>
              </div>
            </div>
          </b-col>

          <b-col class="ml-auto">
            <v-pagination
                v-model="params.page"
                :pages="Math.ceil(store.state.reference.usersList.count / params.page_size)"
                :range-size="1"
                :hideFirstButton="true"
                :hideLastButton="true"
                active-color="var(--primary)"
                @update:modelValue="changePage"
            />
          </b-col>
        </b-row>
      </b-card>
    </b-overlay>

    <AddEditModal
        :modalValue="modalValue"
        :openShowModal="openShowModal"
        @openModal="openModal"
        @refresh="refresh"
    />
  </div>
</template>
