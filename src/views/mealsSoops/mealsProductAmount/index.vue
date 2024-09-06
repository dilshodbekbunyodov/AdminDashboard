<template>
    <b-overlay :show="show" rounded="sm">
        <b-row>
            <b-col md="2">
                <b-button variant="secondary" @click="router.go(-1)">
                    <i class="ri-arrow-go-back-line"/>
                </b-button>
            </b-col>

            <b-col>
                <b-col md="3" class="ml-auto text-right">
                    <b-button
                            class="text-right"
                            variant="success"
                            @click="openShowModal"
                    >
                        <i class="ri-add-line"/>
                        Добавить
                    </b-button>
                </b-col>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col
                    md="3"
                    v-for="(item, index) in GET_PRODUCT_AMOUNT.products"
                    :key="index"
            >
                <b-card class="mb-3">
                    <div class="text-right">
                        <b-button variant="danger" size="sm" @click="handleDelete(item.id)">
                            <i class="ri-delete-bin-6-line"/>
                        </b-button>
                        {{ "" }}
                        <b-button
                                @click="editProduct(item)"
                                variant="warning"
                                size="sm"
                        >
                            <i class="ri-edit-2-line text-white"/>
                        </b-button>
                    </div>
                    <div class="d__flex">
                        <span>Наименование</span>
                        <span>{{ item.product.name }}</span>
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

            <b-col md="12" v-if="!GET_PRODUCT_AMOUNT.products?.length">
                <b-card>
                    <Empty/>
                </b-card>
            </b-col>
        </b-row>

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
import {useRoute, useRouter} from "vue-router";
import '../../../assets/event.css'
import store from "../../../store/index.js";
import Empty from "../../../components/Empty/index.vue";
import Swal from "sweetalert2";
import AddEdit from "./addEditProAmount.vue";

const route = useRoute()
const router = useRouter()
const show = ref(false)
const showModal = ref(false);
const modalValue = ref({});

onMounted(async () => {
    try {
        show.value = true
        await refresh()
        await store.dispatch("reference/FETCH_PRODUCT_LIST", {page_size: 1000})
    } catch (e) {
        console.log(e)
    }
    show.value = false
})

const GET_PRODUCT_AMOUNT = computed(() => {
    return store.state.reference.productAmount
})

const refresh = () => {
    store.dispatch('reference/FETCH_PRODUCT_AMOUNT', {id: route.params.id2})
}

const openShowModal = () => {
    modalValue.value = {}
    showModal.value = !showModal.value;
}

const editProduct = (item) => {
    showModal.value = !showModal.value;
    modalValue.value = item
}

const format = (value) => {
    return new Intl.NumberFormat('ru-Ru', {
        style: 'currency',
        currency: 'UZS'
    }).format(value)
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
            store.dispatch("events/DELETE_EVENT_PRODUCT_AMOUNT", id).then(() => {
                refresh()
                toast.success("Успешно удален");
            });
        }
    });
}
</script>

