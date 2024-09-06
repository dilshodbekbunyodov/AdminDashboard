<template>
    <div>
        <b-row class="mb-3">
            <b-col md="2">
                <b-button variant="secondary" @click="router.go(-1)">
                    <i class="ri-arrow-go-back-line"/>
                </b-button>
            </b-col>

            <b-col md="2" class="ml-auto text-right">
                <b-button
                        variant="success"
                        @click="downloadExcel"
                >
                    Excel
                    <i v-if="!load"
                       class="ri-file-excel-2-line ml-05"
                    />
                    <b-spinner v-else class="ml-05"
                    />
                </b-button>
            </b-col>
        </b-row>

        <b-col md="12">
            <b-card>
                <div class="d-flex align-items-center justify-content-between">
                    <h6 class="mb-3">Нужно купить</h6>
                    <h6 class="mb-3 text-right">Общая стоимость ( {{ totalCostPro }} )</h6>
                </div>

                <b-table
                        responsive
                        class="table-bordered"
                        show-empty
                        :items="array"
                        :fields="fields"
                >
                    <template #empty>
                        <p class="text-center">Нет данных</p>
                    </template>
                    <template #cell(total_cost)="props">
                        {{
                        getCost(props.item.total_cost)
                        }}
                    </template>
                    <template #cell(cost)="props">
                        <div class="d-flex align-items-center">
                            {{ getCost(props.item.cost) }}
                            <div v-if="props.item.new_cost">
                                <i class="ri-arrow-right-line mx-2"/>
                                {{ getCost(props.item.new_cost) }}
                            </div>
                        </div>
                    </template>
                    <template #cell(actions)="props">
                        <b-button
                                size="sm"
                                variant="warning"
                                @click="handleEdit(props.item)"
                        >
                            <i class="ri-edit-2-line text-white"/>
                        </b-button>
                        {{ "" }}
                        <b-button
                                size="sm"
                                variant="primary"
                                @click="onRowSelected(props.item, props.index)"
                        >
                            <i class="ri-arrow-right-s-line"/>
                        </b-button>
                    </template>
                </b-table>
            </b-card>

            <b-card>
                <div class="d-flex align-items-center justify-content-between">
                    <h6 class="mb-3">Куплено</h6>
                    <h6 class="mb-3">Общая стоимость ( {{ totalCostSelectedPro }} )</h6>
                </div>
                <b-table
                        responsive
                        class="table-bordered"
                        show-empty
                        :items="selected"
                        :fields="fields"
                >
                    <template #empty>
                        <p class="text-center">Нет данных</p>
                    </template>
                    <template #cell(total_cost)="props">
                        {{ getCost(props.item.total_cost) }}
                    </template>
                    <template #cell(cost)="props">
                        {{ getCost(props.item.cost) }}
                    </template>
                    <template #cell(actions)="props">
                        <b-button size="sm" variant="primary" @click="cancelItems(props.index, props.item)">
                            <i class="ri-arrow-left-s-line"/>
                        </b-button>
                    </template>
                </b-table>
            </b-card>
        </b-col>

        <AddEdit
                @refresh="refresh"
                @openModal="openModal"
                :openShowModal="openShowModal"
                :modalValue="modalValue"
        />
    </div>
</template>

<script setup>
import {useRouter, useRoute} from "vue-router";
import {computed, onMounted, reactive, ref} from "vue";
import store from "../../store/index.js";
import FIELDS from "./fields.js";
import AddEdit from './modal.vue'

const router = useRouter()
const route = useRoute()
const selected = ref([])
const array = ref([])
const load = ref(false)
const fields = ref(FIELDS.fields)
const totalCost = ref(0)
const totalCostSelected = ref(0)
const openShowModal = ref(false)
const modalValue = ref({})

onMounted(() => {
    refresh()
})


const openModal = () => {
    modalValue.value = {}
    openShowModal.value = !openShowModal.value
}

const handleEdit = (item) => {
    modalValue.value = item
    openShowModal.value = !openShowModal.value
}

const refresh = () => {
    store.dispatch('events/FETCH_PRODUCT_CALCULATION', {id: route.params.id})
        .then(() => {
            array.value = store.state.events.calculation?.results?.products
            let res = array.value

            for (let i = 0; i < res.length; i++) {
                const e = res[i];
                if (e?.is_buy) {
                    selected.value.push(e)
                    res.splice(i, 1)
                    i--
                }
            }
        })
        .then(() => {
            arrayCalc()
        })
        .then(() => {
            selectedCalc()
        })
}

const getCost = (cost) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'UZS'
    }).format(cost)
}

const totalCostPro = computed(() => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'UZS'
    }).format(totalCost.value)
})

const totalCostSelectedPro = computed(() => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'UZS'
    }).format(totalCostSelected.value)
})

const onRowSelected = (item, index) => {
    store.dispatch('events/UPDATE_PRODUCT_CALCULATION', {
        id: item.id,
        is_buy: true,
        amount: item.amount,
    }).then(() => {
        selected.value.unshift(item)
        array.value.splice(index, 1)

        selectedCalc()
        arrayCalc()
    })
}

const cancelItems = (index, item) => {
    store.dispatch('events/UPDATE_PRODUCT_CALCULATION', {
        id: item.id,
        is_buy: false,
        amount: item.amount,
    }).then(() => {
        store.state.events.calculation.results.products.unshift(item)
        selected.value.splice(index, 1)

        selectedCalc()
        arrayCalc()
    })
}

const downloadExcel = () => {
    load.value = true
    store.dispatch('events/FETCH_PRODUCT_EXCEL', {id: route.params.id})
        .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'file.xls')
            document.body.appendChild(link)
            link.click();
            load.value = false
        })
}

const selectedCalc = () => {
    let res = selected.value
    let result = 0
    for (let i = 0; i < res.length; i++) {
        const e = res[i]
        if (e?.total_cost) {
            result += Number(e.total_cost)
        }
    }
    return totalCostSelected.value = result
}

const arrayCalc = () => {
    let res = array.value
    let result = 0
    for (let i = 0; i < res.length; i++) {
        const e = res[i]
        if (e?.total_cost) {
            result += Number(e.total_cost)
        }
    }
    return totalCost.value = result
}
</script>
