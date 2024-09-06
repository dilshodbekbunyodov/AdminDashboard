<template>
    <b-overlay :show="show" rounded="sm">
        <b-row class="justify-content-between">
            <b-col md="2">
                <b-button variant="secondary" @click="router.go(-1)">
                    <i class="ri-arrow-go-back-line"/>
                </b-button>
            </b-col>

            <b-col md="3">
                <h4 class="mb-0">{{ GET_EVENT_DISH_DETAIL.dish }}</h4>
            </b-col>

            <b-col md="2" class="text-right">
                <b-button variant="success" @click="openShowModal">
                    <i class="ri-add-line"></i>
                    Добавить
                </b-button>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col
                    md="3"
                    v-for="(item, index) in GET_EVENT_DISH_DETAIL?.products"
                    :key="index"
            >
                <b-card>
                    <div class="d__flex" @click.stop>
                        <span class="text-warning">{{ item.product.name }}</span>
                        <div class="d-flex align-items-center">
                            <b-button variant="warning" size="sm" @click="editItem(item)">
                                <i class="ri-edit-2-line text-white"/>
                            </b-button>

                            <b-button class="ml-05" variant="danger" size="sm" @click="handleDelete(item)">
                                <i class="ri-delete-bin-6-line"/>
                            </b-button>
                        </div>
                    </div>
                    <div class="d__flex">
                        <span>тип</span>
                        <span>{{ item.type }}</span>
                    </div>
                    <div class="d__flex">
                        <span>Стоимость</span>
                        <span>{{ format(item.cost) }}</span>
                    </div>
                    <div class="d__flex">
                        <span>Количество</span>
                        <span>{{ item.amount }} {{ item.unit }}</span>
                    </div>
                    <div class="d__flex">
                        <span>Общая стоимость</span>
                        <span>{{ format(item.total_cost) }}</span>
                    </div>
                </b-card>
            </b-col>
        </b-row>

        <b-card v-if="!GET_EVENT_DISH_DETAIL.products?.length">
            <Empty/>
        </b-card>

        <AddEdit
                :showModal="showModal"
                :modalValue="modalValue"
                @openShowModal="openShowModal"
                @refresh="refresh"
        />
    </b-overlay>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../../store/index.js";
import {useRoute} from "vue-router";
import "../../../assets/event.css";
import router from "../../../router/index.js";
import AddEdit from "./AddEdit.vue";
import Swal from "sweetalert2";
import Empty from "../../../components/Empty/index.vue";

const route = useRoute();
const show = ref(false);
const showModal = ref(false);
const modalValue = ref({});

onMounted(async () => {
    try {
        show.value = true;
        await refresh();
        await store.dispatch("reference/FETCH_PRODUCT_LIST", {page_size: 1000});
    } catch (e) {
        console.log(e);
    }
    show.value = false;
});

const GET_EVENT_DISH_DETAIL = computed(() => {
    return store.getters["events/GET_EVENT_DISH_DETAIL2"];
});

const refresh = () => {
    store.dispatch("events/FETCH_EVENT_DISH_EVENT_MENU2", {
        id: route.params.id,
    });
};

const format = (value) => {
    return new Intl.NumberFormat('ru-Ru', {
        style: 'currency',
        currency: 'UZS'
    }).format(value)
}

const handleDelete = (item) => {
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
            store.dispatch("events/DELETE_EVENT_DISH_MENU2", item.id).then(() => {
                refresh();
                toast.success("Успешно удален");
            });
        }
    });
};

const editItem = (item) => {
    showModal.value = !showModal.value;
    modalValue.value = item;
};

const openShowModal = () => {
    showModal.value = !showModal.value;
    modalValue.value = {}
};
</script>
