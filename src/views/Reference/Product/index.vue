<template>
    <div class="mt-3">
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

            <b-col md="3" class="ml-auto text-right">
               <b-form-group>
                   <b-button
                       @click="openModal"
                       class="text-right"
                       variant="success"
                   >
                       <i class="ri-add-line"></i>
                       Добавить
                   </b-button>
               </b-form-group>
            </b-col>
        </b-row>

        <b-card class="mb-3">
            <b-table
                responsive
                class="table-bordered"
                show-empty
                :fields="fields"
                :items="GET_PRODUCTS_DATA.results"
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

                <template #cell(unit)="props">
                    <span>{{ props.item.unit?.name }}</span>
                </template>

                <template #cell(type)="props">
                    <span>{{ props.item.type?.name }}</span>
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

            <b-row v-if="GET_PRODUCTS_DATA.count">
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
                        :pages="Math.ceil(GET_PRODUCTS_DATA.count / params.page_size)"
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
                :openShowModal="openShowModal"
                :modalValue="modalValue"
        />
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {watchDebounced} from "@vueuse/core";
import store from "../../../store/index.js";
import json from '../../json.ts'
import VPagination from "@hennge/vue3-pagination";
import AddEditModal from './addEditModal.vue'
import Swal from "sweetalert2";
import {useToast} from "vue-toastification";

const fields = ref(json.fieldsReferenceProduct)
let params = ref({
    search: null,
    page: 1,
    page_size: 10
})
const toast = useToast()
const openShowModal = ref(false)
const modalValue = ref({})

onMounted(() => {
    refresh()
})

//methods
const refresh = async () => {
    try {
        await store.dispatch('reference/FETCH_PRODUCT_LIST', { ...params.value })
    } catch (e) {
        toast.error('Ошибка')
    }
}

const openModal = () => {
    modalValue.value = {}
    openShowModal.value = !openShowModal.value
}

const handleEdit = (item) => {
    modalValue.value = item
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
            store.dispatch("reference/DELETE_PRODUCT_DATA", id).then(() => {
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

//computed
const GET_PRODUCTS_DATA = computed(() => {
    return store.state.reference.productList
})

//watch
watchDebounced(() => params.value?.search, function () {
    refresh()
}, {
    deep: true,
    debounce: 500,
    maxWait: 5000
})
</script>
