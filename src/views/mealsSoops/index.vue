<template>
    <div class="mt-3">
        <b-row>
            <b-col md="3">
                <b-form-group>
                    <b-form-input
                        type="search"
                        placeholder="Поиск..."
                        v-model="params.search"
                    />
                </b-form-group>
            </b-col>

            <b-col md="3" class="ml-auto text-right">
               <b-form-group>
                   <b-button
                       class="text-right"
                       variant="success"
                       @click="openShowModal"
                   >
                       <i class="ri-add-line"/>
                       Добавить
                   </b-button>
               </b-form-group>
            </b-col>
        </b-row>

        <b-card>
            <b-table
                responsive
                class="table-bordered"
                show-empty
                :fields="fields"
                :items="GET_MEALS_MENU.results"
            >
                <template #empty>
                    <p class="text-center">Нет данных</p>
                </template>

                <template #table-busy>
                    <div class="d-flex align-items-center flex-column p-3">
                        <b-spinner
                            variant="primary"
                        />
                        <span>Загрузка...</span>
                    </div>
                </template>

                <template #cell(actions)="props">
                    <b-button
                        :disabled="!props.item.dish"
                        @click="router.push(`/reference-meals/${props.item.dish}/`)"
                        variant="success"
                    >
                        <i class="ri-arrow-right-s-line"/>
                    </b-button>
                    {{ " " }}
<!--                    <b-button-->
<!--                            variant="warning"-->
<!--                            @click="handleEdit(props.item)"-->
<!--                    >-->
<!--                        <i class="ri-edit-2-line text-white"/>-->
<!--                    </b-button>-->
<!--                    {{ " " }}-->
                    <b-button
                        variant="danger"
                        @click="handleDelete(props.item.id)"
                    >
                        <i class="ri-delete-bin-6-line"/>
                    </b-button>
                </template>
            </b-table>

            <b-row v-if="GET_MEALS_MENU.count">
                <b-col md="3">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex align-items-center mb-0">
                            <small class="text-nowrap mr-05">Показать от 1 до</small>
                            <b-form-select
                                v-model="params.page_size"
                                :options="['1', '5', '10', '15']"
                                @change="changePerPage"
                            />
                        </div>
                    </div>
                </b-col>

                <b-col class="ml-auto text-right">
                    <v-pagination
                        class="justify-content-end"
                        v-model="params.page"
                        :pages="Math.ceil(GET_MEALS_MENU.count / params.page_size)"
                        :range-size="1"
                        active-color="var(--primary)"
                        @update:modelValue="changePage"
                    />
                </b-col>
            </b-row>
        </b-card>

        <AddEditModal
                :showModal="showModal"
                :modalValue="modalValue"
                @openShowModal="openShowModal"
                @refresh="refresh"
        />
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import json from '../json.ts'
import store from "../../store/index.js";
import {watchDebounced} from "@vueuse/core";
import VPagination from "@hennge/vue3-pagination";
import Swal from "sweetalert2";
import {useToast} from "vue-toastification";
import AddEditModal from './addEditModal.vue'
import {useRouter} from "vue-router";

const fields = ref(json.fieldsMeals)
const showModal = ref(false)
const modalValue = ref({})
const toast = useToast()
const router = useRouter()
let params = ref({
    search: null,
    page: 1,
    page_size: 10
})

onMounted(async () => {
    try {
        await refresh()
        await store.dispatch('reference/FETCH_PRODUCT_LIST', {page_size: 1000})
    } catch (e) {
        console.log(e)
    }
})

const GET_MEALS_MENU = computed(() => {
    return store.state.reference.mealsMenu2
})

const refresh = async () => {
    try {
        await store.dispatch('reference/FETCH_MEALS_MENU2', params.value)
    } catch (e) {
        toast.error('Ошибка')
    }
}

const openShowModal = () => {
    showModal.value = !showModal.value
    modalValue.value = {}
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
            store.dispatch("reference/DELETE_MEALS_MENU", {
                id: id,
                all_delete: true
            }).then(() => {
                refresh()
                toast.success("Успешно удален");
            });
        }
    });
}

const changePerPage = (page_size) => {
    params.value.page_size = page_size
    params.value.page = 1
    refresh()
}

const changePage = (value) => {
    params.value.page = value
    refresh()
}

watchDebounced(() => params.value?.search, function () {
    refresh()
}, {
    deep: true,
    debounce: 500,
    maxWait: 5000
})
</script>
