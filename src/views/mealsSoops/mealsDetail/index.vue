<template>
    <b-overlay :show="show" rounded="sm">
        <b-row class="justify-content-between">
            <b-col md="2">
                <b-button variant="secondary" @click="router.push('/reference/meals')">
                    <i class="ri-arrow-go-back-line"/>
                </b-button>
            </b-col>
            <b-col md="3" class="text-center">
                <h4 class="mb-0">{{ $route.params.id }}</h4>
            </b-col>
            <b-col md="2" class="text-right">
                <b-button variant="primary" @click="openShowModal">
                    <i class="ri-add-line"></i>
                    Добавить
                </b-button>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col
                    md="3"
                    v-for="(item, index) in GET_EVENT_DISH_DETAIL.results"
                    :key="index"
            >
                <b-card class="mb-3" style="cursor: pointer"
                        @click="router.push(`/reference-meals/${route.params.id}/${item.id}`)">
                    <div class="text-right" @click.stop>
                        <b-button variant="danger" size="sm" @click="handleDelete(item.id)">
                            <i class="ri-delete-bin-6-line"/>
                        </b-button>
                        {{ "" }}
                        <b-button
                                variant="warning"
                                size="sm"
                                @click="editMenu(item)"
                        >
                            <i class="ri-edit-2-line text-white"/>
                        </b-button>
                    </div>
                    <div class="d__flex">
                        <span>Наименование</span>
                        <span>{{ item.dish }}</span>
                    </div>
                    <div class="d__flex">
                        <span>Количество людей</span>
                        <span>{{ item.count_people }}</span>
                    </div>
                </b-card>
            </b-col>

            <b-col md="12" v-if="!GET_EVENT_DISH_DETAIL.results?.length">
                <b-card>
                    <Empty/>
                </b-card>
            </b-col>
        </b-row>

        <b-col md="12" class="mt-5">
            <v-pagination
                    class="justify-content-center"
                    v-model="params.page"
                    :pages="Math.ceil(GET_EVENT_DISH_DETAIL.count / params.page_size)"
                    :range-size="1"
                    active-color="var(--primary)"
                    @update:modelValue="changePage"
            />
        </b-col>

        <AddEdit
                :showModal="showModal"
                :modalValue="modalValue"
                @openShowModal="openShowModal"
                @refresh="refresh"
        />
    </b-overlay>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import store from "../../../store/index.js";
import Empty from '../../../components/Empty/index.vue'
import '../../../assets/event.css'
import Swal from "sweetalert2";
import AddEdit from './addEdit.vue'
import VPagination from "@hennge/vue3-pagination";

const showModal = ref(false);
const modalValue = ref({});
const router = useRouter()
const route = useRoute()
const show = ref(false)
let params = ref({
    page: 1,
    page_size: 10
})

onMounted(async () => {
    try {
        show.value = true
        await refresh()
    } catch (e) {
        console.log(e)
    }
    show.value = false
})

const GET_EVENT_DISH_DETAIL = computed(() => {
    return store.getters['events/GET_EVENT_DISH_DETAIL']
})

const refresh = () => {
    store.dispatch('events/FETCH_EVENT_DISH_EVENT_MENU', {
        name: route.params.id,
        ...params.value
    })
}

const changePage = (value) => {
    params.value.page = value
    refresh()
}

const openShowModal = () => {
    showModal.value = !showModal.value;
    modalValue.value = {}
}

const editMenu = (item) => {
    showModal.value = !showModal.value;
    modalValue.value = item
}

function handleDelete(id) {
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
            store.dispatch("events/DELETE_EVENT_DISH_MENU", id).then(() => {
                refresh();
                toast.success("Успешно удален");
            });
        }
    });
}
</script>
