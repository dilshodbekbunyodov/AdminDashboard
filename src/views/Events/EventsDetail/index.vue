<template>
  <div>
    <b-overlay :show="show" rounded="sm">
      <b-row class="justify-content-between">
        <b-col lg="2">
          <b-button variant="secondary" @click="router.push('/events')">
            <i class="ri-arrow-go-back-line"/>
          </b-button>
          <b-button
              class="ml-05" variant="warning"
              @click="router.push(`/events-calculation/${route.params.id}`)"
          >
            Расчет
            <i class="ri-folder-open-line ml-05"/>
          </b-button>
        </b-col>
        <b-col lg="4" class="text-center">
          <h4 class="mb-0">{{ GET_EVENTS_DETAIL_DATA.name }}</h4>
        </b-col>
        <b-col md="2" class="text-right mb-3">
          <b-button
              class="rounded-pill mr-1 text-white"
              variant="info"
              v-b-tooltip.hover.v-info
              title="Продукты у которых количество и общая
                        стоимость равна 0, не будет считаться, а также не
                        будут отображаться в расчетах и закупе"
          >
            <i class="ri-information-line"/>
          </b-button>

          <b-button variant="primary" @click="openMenuModal">
            <i class="ri-add-line"></i>
            Добавить
          </b-button>
        </b-col>
      </b-row>

      <statistic-card/>

      <div class="wrapper">
        <div
            class="columns"
            v-for="(item, index) in GET_EVENTS_DETAIL_DATA.dishes"
            :key="index + 1"
        >
          <b-card style="cursor: pointer"
                  class="mb-0"
                  @click="router.push(`/events/${route.params.id}/dish/${item.id}/`)"
          >
            <div class="d__flex" @click.stop>
              <span class="text-warning">{{ item.dish }}</span>
              <b-button
                  variant="danger"
                  size="sm"
                  @click="handleDelete(item.id)"
              >
                <i class="ri-delete-bin-6-line"/>
              </b-button>
            </div>
            <div class="d__flex">
              <span>Расходы</span>
              <span>{{
                  new Intl.NumberFormat('ru-Ru', {
                    style: 'currency',
                    currency: 'UZS'
                  }).format(item.cost)
                }}</span>
            </div>
            <div class="d__flex">
              <span>Количество людей</span>
              <span>{{ item.count_people }}</span>
            </div>
          </b-card>
        </div>
      </div>
      <b-card v-if="!GET_EVENTS_DETAIL_DATA.dishes.length">
        <Empty/>
      </b-card>
    </b-overlay>

    <event-menu-modal :showModal="showModal" @openMenuModal="openMenuModal"/>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../../store/index.js";
import {useRoute, useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import EventMenuModal from "./eventMenuModal.vue";
import Swal from "sweetalert2";
import "../../../assets/event.css";
import Empty from "../../../components/Empty/index.vue";
import StatisticCard from "./statisticCard.vue";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const show = ref(false);
let showModal = ref(false);

onMounted(async () => {
  try {
    show.value = true;
    await store.dispatch("events/FETCH_EVENTS_DETAIL_DATA", {
      id: route.params.id,
    });
    await store.dispatch("reference/FETCH_MEALS_MENU", {page_size: 1000});
  } catch (error) {
    toast.error(error.message);
  }
  show.value = false;
});

const GET_EVENTS_DETAIL_DATA = computed(() => {
  return store.getters["events/GET_EVENTS_DETAIL_DATA"];
});

const openMenuModal = () => {
  showModal.value = !showModal.value;
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
    confirmButtonText: "Да, удалить!",
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("events/DELETE_EVENT_MENU", {
        id,
        event_id: route.params.id
      }).then(() => {
        toast.success("Успешно удален");
        store.dispatch("events/FETCH_EVENTS_DETAIL_DATA", {
          id: route.params.id,
        });
      });
    }
  });
};
</script>
