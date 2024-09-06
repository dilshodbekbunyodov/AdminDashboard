<template>
    <div class="mt-3">
        <b-row class="mb-2">
            <b-col md="3">
                <b-form-group>
                    <b-form-input
                        type="search"
                        v-model="params.search"
                        placeholder="Поиск..."
                    />
                </b-form-group>
            </b-col>
            <b-col class="ml-auto">
                <div class="text-right">
                    <b-button
                            class="text-right mb-2"
                            variant="success"
                            @click="openModal"
                    >
                        <i class="ri-add-line"/>
                        Добавить
                    </b-button>
                </div>
            </b-col>
        </b-row>

        <b-card class="mb-3">
            <b-table
                responsive
                class="table-bordered"
                show-empty
                :fields="fields"
                :items="EVENT_UNIT"
            >
                <template #empty>
                    <p class="text-center">Нет данных</p>
                </template>

                <template #cell(actions)="props">
                    <b-button variant="warning" @click="handleEditUnit(props.item)">
                        <i class="ri-edit-2-line text-white"/>
                    </b-button>
                    {{ " " }}
                    <b-button variant="danger" @click="handleDelete(props.item.id)">
                        <i class="ri-delete-bin-6-line"/>
                    </b-button>
                </template>
            </b-table>
        </b-card>

        <add-edit
            @openModal="openModal"
            @refresh="refresh"
            :showModal="showModal"
            :modalValue="modalValue"
        />
    </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import store from "../../../store/index.js";
import AddEdit from "./addEdit.vue";
import Swal from "sweetalert2";
import {watchDebounced} from "@vueuse/core";

let params = ref({
    search: null,
})
const showModal = ref(false)
const modalValue = ref({})
const fields = reactive([
    {
        key: 'id',
        label: '№',
        thClass: 'text-center',
        tdClass: 'text-center'
    },
    {
        key: 'name',
        label: 'НАИМЕНОВАНИЕ',
        thClass: 'text-center',
        tdClass: 'text-center'
    },
    {
        key: 'actions',
        label: 'ДЕЙСТВИЯ',
        thClass: 'text-center',
        tdClass: 'text-center'
    },
])

onMounted(() => {
    refresh()
})

const EVENT_UNIT = computed(() => {
    return store.state.reference.eventUnit
})

const refresh = () => {
    store.dispatch('reference/FETCH_EVENT_UNIT', params.value)
}

const openModal = () => {
    showModal.value = !showModal.value
    modalValue.value = {}
}

const handleEditUnit = (item) => {
    showModal.value = !showModal.value
    modalValue.value = item
}

const handleDelete = id => {
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
            store.dispatch("reference/DELETE_UNIT", id).then(() => {
                refresh()
                toast.success("Успешно удален");
            });
        }
    });
}

//watch
watchDebounced(() => params.value?.search, function () {
    refresh()
}, {
    deep: true,
    debounce: 500,
    maxWait: 5000
})
</script>

