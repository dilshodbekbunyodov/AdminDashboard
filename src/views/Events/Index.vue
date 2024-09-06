<template>
  <div>
    <statistics/>

    <b-row>
      <b-col md="3">
        <b-form-group>
          <b-form-input
              type="search"
              v-model="params.search"
              placeholder="Поиск..."
          />
        </b-form-group>
      </b-col>

      <b-col md="3">
        <b-form-group>
          <b-input-group class="input-group-merge">
            <FlatPickr
                class="form-control"
                v-model="params.date"
                placeholder="Дата..."
                :config="{locale: Russian}"
            />
            <b-input-group-append
                is-text v-if="params.date"
                @click="params.date = null"
                class="ri-close-line cursor-pointer"
            />
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="3" class="ml-auto text-right">
        <b-button @click="openModal" class="text-right" variant="success">
          <i class="ri-add-line"/>
          Добавить
        </b-button>
      </b-col>
    </b-row>

    <b-card class="mb-3">
      <b-table
          responsive
          class="table-bordered cursor-pointer"
          show-empty
          :fields="fields"
          :items="GET_EVENTS_DATA.results"
          @row-clicked="myRowClickHandler"
      >
        <template #empty>
          <p class="text-center">Нет данных</p>
        </template>

        <template #cell(date)="props">
          {{ props.item.date }}
        </template>

        <template #table-busy>
          <div class="d-flex align-items-center flex-column p-3">
            <b-spinner
                variant="primary"
            />
            <span>Загрузка...</span>
          </div>
        </template>

        <template #cell(total_cost)="props">
          {{
            new Intl.NumberFormat('ru-Ru', {
              style: 'currency',
              currency: 'UZS'
            }).format(props.item.total_cost)
          }}
        </template>

        <template #cell(actions)="props">
          <b-button
              variant="success"
              @click="$router.push(`/events/${props.item.id}`)"
          >
            <i class="ri-arrow-right-s-line"></i>
          </b-button>
          {{ "" }}
          <b-button variant="warning" @click="handleEdit(props)">
            <i class="ri-edit-2-line text-white"/>
          </b-button>
          {{ " " }}
          <b-button variant="danger" @click="handleDelete(props.item.id)">
            <i class="ri-delete-bin-6-line"/>
          </b-button>
        </template>
      </b-table>

      <b-row v-if="GET_EVENTS_DATA.count">
        <b-col md="3">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center mb-0">
              <small class="text-nowrap mr-05">Показать от 1 до</small>
              <b-form-select
                  v-model="params.page_size"
                  :options="[1, 5, 10, 15]"
                  @change="changePerPage"
              />
            </div>
          </div>
        </b-col>

        <b-col class="ml-auto text-right">
          <v-pagination
              class="justify-content-end"
              v-model="params.page"
              :pages="Math.ceil(GET_EVENTS_DATA.count / params.page_size)"
              :range-size="1"
              active-color="var(--primary)"
              @update:modelValue="changePage"
          />
        </b-col>
      </b-row>
    </b-card>

    <AddEditModal
        @openModal="openModal"
        @refresh="refresh"
        :showModal="showModal"
        :modalValue="modalValue"
    />
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {watchDebounced} from "@vueuse/core";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import store from "../../store/index.js";
import json from "../json";
import VPagination from "@hennge/vue3-pagination";
import Swal from "sweetalert2";
import AddEditModal from "./addEditModal.vue";
import Statistics from "./statistics.vue";
import {Russian} from 'flatpickr/dist/l10n/ru.js';
import FlatPickr from "vue-flatpickr-component";

interface fieldsIns {
  key: string,
  label: string,
  thClass?: string,
  tdClass?: string
}

const fields = ref<fieldsIns[]>(json.fieldsEvent);
const toast = useToast();
const router = useRouter();
interface paramsIns {
  search: null | string,
  date: number,
  page: number,
  page_size: number,
}

let params = ref<paramsIns>({
  search: null,
  date: null,
  page: 1,
  page_size: 10,
});

interface modalIns {
  name: null | string,
  date: number | null,
  number_of_guests: number | null,
}

const modalValue = ref<modalIns>({date: null, name: "", number_of_guests: null});
const showModal = ref<boolean>(false)

onMounted(() => {
  refresh();
});

const refresh = async () => {
  try {
    await store.dispatch("events/FETCH_EVENTS_DATA", params.value);
  } catch (e) {
    toast.error('Ошибка')
  }
};

const openModal = () => {
  showModal.value = !showModal.value;
  modalValue.value = {date: null, name: "", number_of_guests: null};
};

const myRowClickHandler = (params) => {
  router.push(`/events/${params.id}`)
}

const handleEdit = (props) => {
  showModal.value = !showModal.value;
  modalValue.value = props.item;
};

const changePerPage = (page_size) => {
  params.value.page_size = page_size;
  params.value.page = 1;
  refresh();
};

const changePage = (value) => {
  params.value.page = value;
  refresh();
};

const handleDelete = (id) => {
  Swal.fire({
    title: "Вы уверены?",
    text: "Вы не сможете вернуть это!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7367F0",
    cancelButtonColor: "#EA5455",
    cancelButtonText: "Отменить",
    confirmButtonText: "Удалить!",
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("events/DELETE_EVENT_LIST", id).then(() => {
        refresh();
        toast.success("Успешно удален");
      });
    }
  });
};

interface eventIns {
  count: number,
  results: object[],
  next: null | number,
  previous: null | number
}

const GET_EVENTS_DATA = computed<eventIns>(() => {
  return store.getters["events/GET_EVENTS_DATA"];
});

watchDebounced(() => [params.value?.search, params.value.date], function () {
  refresh();
  },
    {
      deep: true,
      debounce: 500,
      maxWait: 5000,
    } as object
);
</script>
