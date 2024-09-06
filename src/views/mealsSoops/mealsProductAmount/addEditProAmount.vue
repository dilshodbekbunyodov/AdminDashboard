<template>
    <div :class="showModal ? 'openCatalog menu' : 'defaultCatalog menu'">
        <div class="modal-title">
            <h5>{{ modalValue.id ? "Редактировать" : "Добавить" }}</h5>
            <button class="ri-close-line" @click="$emit('openShowModal')"/>
        </div>
        <form @submit.prevent="onSubmitAmount">
            <div class="modal-body">
                <b-form-group>
                    <label for="product">Продукт</label>
                    <v-select
                            id="product"
                            label="name"
                            :reduce="(p) => p.id"
                            v-model="data.product"
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
                    <label for="count">Количество</label>
                    <b-form-input id="count" v-model="data.amount" />
                    <small v-for="error in validate.amount.$errors"
                           :key="error.$uid"
                           class="whitespace-nowrap text-danger text-sm"
                    >
                        {{ $t(error.$message) }}
                    </small>
                </b-form-group>

                <b-form-group>
                    <label for="cost">Расходы</label>
                    <b-form-input id="cost" v-model="data.cost" />
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
                <b-button type="submit" variant="primary">Сохранить</b-button>
            </div>
        </form>
    </div>
    <div :class="showModal ? 'black__shadow' : ''"/>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useToast} from "vue-toastification";
import store from "../../../store/index.js";
import VSelect from "vue-select";
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

const route = useRoute()
const toast = useToast()
const data = ref({
    product: null,
    amount: null,
    cost: null,
})

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
const validate = useVuelidate(rules, data);

const GET_PRODUCTS_DATA = computed(() => {
    return store.state.reference.productList;
})

const onSubmitAmount = async () => {
    const success = await validate.value.$validate();
    if (!success) return;

    let req = {
        id: props.modalValue?.id,
        dish: route.params.id2,
        product: data.value.product?.id,
        amount: data.value.amount,
        cost: data.value.cost,
    }
    if (props.modalValue?.id) {
        store.dispatch('events/UPDATE_EVENTS_PRODUCT_AMOUNT', req)
            .then(() => {
                emit("refresh");
                emit("openShowModal");
                toast.success("Успешно");
            });
    } else {
        store.dispatch('events/CREATE_EVENT_DISH_MENU', {
            dish: route.params.id2,
            ...data.value
        }).then(() => {
            emit("refresh");
            emit("openShowModal");
            toast.success("Успешно");
        });
    }
}

watch(() => props?.modalValue.id, function (e) {
        if (e) {
            data.value = JSON.parse(JSON.stringify(props.modalValue))
            data.value.name = props.modalValue?.product?.name
        }
    }
);
</script>
