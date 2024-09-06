<template>
    <div :class="showModal ? 'openCatalog menu' : 'defaultCatalog menu'">
        <div class="modal-title">
            <h5>{{ modalValue.id ? "Редактировать" : "Добавить" }}</h5>
            <button class="ri-close-line" @click="$emit('openShowModal')"/>
        </div>
        <form @submit.prevent="onSubmit">
            <div class="modal-body">
                <b-form-group>
                    <label>Наименование</label>
                    <b-form-input
                        disabled type="text"
                        v-model="route.params.id"
                    />
                </b-form-group>
                <b-form-group>
                    <label>Количество людей</label>
                    <b-form-input
                        type="text"
                        v-model="dish.count_people"
                    />

                    <small v-for="error in validate.count_people.$errors"
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
import {computed, ref, watch} from "vue";
import {useToast} from "vue-toastification";
import store from "../../../store/index.js";
import {useRoute} from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

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
const route = useRoute()

const dish = ref({
    dish: null,
    count_people: null
});

const rules = computed(() => {
    return {
        count_people: {
            required: helpers.withMessage('Поле Количество людей обязательно для заполнения', required),
        },
    };
});
const validate = useVuelidate(rules, dish);

const onSubmit = async () => {
    const success = await validate.value.$validate();
    if (!success) return;

    let patch = {
        dish: route.params.id,
        count_people: dish.value.count_people
    };
    if (props.modalValue?.id) {
        store
            .dispatch("events/UPDATE_EVENTS_DISH_MENU", {
                id: props.modalValue?.id,
                ...patch
            })
            .then(() => {
                emit("refresh");
                emit("openShowModal");
                toast.success("Успешно");
            });
    } else {
        store.dispatch('events/CREATE_EVENTS_MENU', patch)
            .then(() => {
                emit("refresh");
                emit("openShowModal");
                toast.success("Успешно");
            });
    }
};

watch(
    () => props?.modalValue,
    function () {
        dish.value = JSON.parse(JSON.stringify(props.modalValue))
    }
);
</script>
