<template>
    <div :class="showModal ? 'openCatalog menu' : 'defaultCatalog menu'">
        <div class="modal-title">
            <h5>{{ modalValue.id ? "Редактировать" : "Добавить" }}</h5>
            <button class="ri-close-line" @click="$emit('openShowModal')"/>
        </div>

        <form @submit.prevent="onSubmit">
            <div class="modal-body">
                <b-form-group>
                    <label for="product">Продукт</label>
                    <v-select
                            id="product"
                            label="name"
                            :reduce="(p) => p.id"
                            v-model="dish.product"
                            :options="GET_PRODUCTS_DATA.results"
                    />
                    <small v-for="error in validate.product.$errors"
                           :key="error.$uid"
                           class="whitespace-nowrap text-danger text-sm"
                    >
                        {{ $t(error.$message) }}
                    </small>
                </b-form-group>


                <b-form-group>
                    <label for="amount">Количество</label>
                    <b-form-input id="amount" v-model="dish.amount"/>
                    <small v-for="error in validate.amount.$errors"
                           :key="error.$uid"
                           class="whitespace-nowrap text-danger text-sm"
                    >
                        {{ $t(error.$message) }}
                    </small>
                </b-form-group>

                <b-form-group>
                    <label for="cost">Расходы</label>
                    <b-form-input id="cost" type="number" v-model="dish.cost"/>
                    <small v-for="error in validate.cost.$errors"
                           :key="error.$uid"
                           class="whitespace-nowrap text-danger text-sm"
                    >
                        {{ $t(error.$message) }}
                    </small>
                </b-form-group>
            </div>

            <div class="modal-footer">
                <b-button @click="$emit('openShowModal')" variant="secondary">
                    Отменить
                </b-button>
                <b-button type="submit" variant="primary"> Сохранить</b-button>
            </div>
        </form>
    </div>
    <div :class="showModal ? 'black__shadow' : ''"/>
</template>

<script setup>
import VSelect from "vue-select";
import {computed, reactive, watch} from "vue";
import store from "../../../store/index.js";
import {useRoute} from "vue-router";
import {useToast} from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import {required, helpers} from "@vuelidate/validators";

const emit = defineEmits(["openShowModal", "refresh"]);
const props = defineProps({
    showModal: {
        type: Boolean,
        default: false,
    },
    modalValue: {
        type: Object,
        default: () => {
        },
    },
});

const toast = useToast();
const route = useRoute();
let dish = reactive({});

const rules = computed(() => {
    return {
        product: {
            required: helpers.withMessage('Поле Продукт обязательно для заполнения', required),
        },
        amount: {
            required: helpers.withMessage('Поле Количество обязательно для заполнения', required),
        },
        cost: {
            required: helpers.withMessage('Поле Расходы обязательно для заполнения', required),
        },
    };
});
const validate = useVuelidate(rules, dish);

const GET_PRODUCTS_DATA = computed(() => {
    return store.state.reference.productList;
});

const onSubmit = async () => {
    const success = await validate.value.$validate();
    if (!success) return;

    let req = {
        amount: dish.amount,
        product: dish.product,
        event: Number(route.params.event),
        dish: Number(route.params.id),
        cost: dish.cost,
    };

    let patch = {
        amount: dish.amount,
        product: props.modalValue.product?.id,
        cost: dish.cost,
    };
    if (props.modalValue?.id) {
        store
            .dispatch("events/UPDATE_EVENTS_PRODUCT_AMOUNT", {
                id: props.modalValue?.id,
                ...patch,
            })
            .then(() => {
                emit("refresh");
                emit("openShowModal");
                toast.success("Успешно");
            });
    } else {
        store.dispatch("events/CREATE_EVENT_DISH_MENU", req).then(() => {
            emit("refresh");
            emit("openShowModal");
            toast.success("Успешно");
        });
    }
};

watch(
    () => props?.modalValue,
    function () {
        dish.amount = props.modalValue.amount;
        dish.product = props.modalValue.product;
        dish.cost = props.modalValue.cost;
    }
);
</script>
