<template>
    <div :class="showModal ? 'openCatalog menu' : 'defaultCatalog menu'">
        <div class="modal-title">
            <h5>{{ modalValue.id ? 'Редактировать' : 'Добавить' }} блюда</h5>
            <button class="ri-close-line" @click="$emit('openShowModal')"/>
        </div>

        <form @submit.prevent="onSubmit">
            <div class="modal-body">
                <b-form-group>
                    <label for="dish">Блюдо</label>
                    <b-form-input
                        id="dish"
                        v-model="meals.dish"
                    />
                    <small v-for="error in validate.dish.$errors"
                           :key="error.$uid"
                           class="whitespace-nowrap text-danger text-sm"
                    >
                        {{ $t(error.$message) }}
                    </small>
                </b-form-group>

                <b-form-group>
                    <label>Продукты</label>
                    <v-select
                        v-model="meals.products"
                        label="name"
                        multiple
                        :close-on-select="false"
                        :reduce="p => p.id"
                        :options="GET_PRODUCTS_DATA.results"
                    />
                    <small v-for="error in validate.products.$errors"
                           :key="error.$uid"
                           class="whitespace-nowrap text-danger text-sm"
                    >
                        {{ $t(error.$message) }}
                    </small>
                </b-form-group>

                <b-form-group>
                    <label for="count_people">Количество людей</label>
                    <b-form-input
                        id="count_people"
                        type="number"
                        v-model="meals.count_people"
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
                <b-button
                        @click="$emit('openShowModal')"
                        variant="secondary"
                >
                    Отменить
                </b-button>
                <b-button
                        type="submit"
                        variant="primary"
                >
                    Сохранить
                </b-button>
            </div>
        </form>
    </div>
    <div
            :class="showModal ? 'black__shadow' : ''"
    />
</template>

<script setup>
import {computed, ref, watch} from "vue";
import VSelect from "vue-select";
import store from "../../store/index.js";
import {useToast} from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

const emit = defineEmits(['openShowModal', 'refresh'])
const props = defineProps({
    showModal: {
        type: Boolean,
        default: () => false
    },
    modalValue: {
        type: Object,
        default: () => {
        }
    }
})

const toast = useToast()
const meals = ref({
    count_people: null,
    dish: null,
    products: []
})

const rules = computed(() => {
    return {
        count_people: {
            required: helpers.withMessage('Поле Количество людей обязательно для заполнения', required),
        },
        dish: {
            required: helpers.withMessage('Поле Блюдо обязательно для заполнения', required),
        },
        products: {
            required: helpers.withMessage('Поле Продукты обязательно для заполнения', required),
        },
    };
});
const validate = useVuelidate(rules, meals);

const GET_PRODUCTS_DATA = computed(() => {
    return store.state.reference.productList
})

const onSubmit = async () => {
    const success = await validate.value.$validate();
    if (!success) return;

    if (props.modalValue?.id) {
        store.dispatch('reference/UPDATE_MEALS_MENU', {
            id: props.modalValue?.id,
            ...meals.value
        })
            .then(() => {
                emit('refresh')
                emit('openShowModal')
                toast.success("Успешно");
            })
    } else {
        store.dispatch('reference/CREATE_MEALS_MENU', meals.value)
            .then(() => {
                emit('refresh')
                emit('openShowModal')
                toast.success("Успешно");
            })
    }
}

//watch
watch(() => props.modalValue?.id, function () {
        meals.value = JSON.parse(JSON.stringify(props.modalValue))
    },
    {deep: true}
);
</script>
