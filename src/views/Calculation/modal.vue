<template>
    <div :class="openShowModal ? 'openCatalog menu' : 'defaultCatalog menu'">
        <div class="modal-title">
            <h5>{{ modalValue.id ? 'Редактировать' : 'Добавить' }} расчет</h5>
            <button class="ri-close-line" @click="emit('openModal')"/>
        </div>

        <form @submit.prevent="onSubmit">
            <div class="modal-body">
                <b-form-group>
                    <label for="name">Наименование</label>
                    <b-form-input
                        id="name"
                        required
                        v-model="obj.new_cost"
                    />
                </b-form-group>
            </div>

            <div class="modal-footer">
                <b-button
                    @click="$emit('openModal')"
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
        :class="openShowModal ? 'black__shadow' : ''"
    />
</template>

<script setup>
import {ref, watch} from "vue";
import {useToast} from "vue-toastification";
import store from "../../store/index.js";

const props = defineProps({
    openShowModal: {
        type: Boolean,
        default: () => false
    },
    modalValue: {
        type: Object,
        default: () => {
        }
    }
})
const emit = defineEmits(['refresh', 'openModal'])

const toast = useToast()
const obj = ref({
    new_cost: null
})

const onSubmit = () => {
    store.dispatch('events/UPDATE_EVENTS_PRODUCT_AMOUNT', {
        id: props.modalValue.id,
        ...obj.value
    }).then(() => {
        emit('refresh')
        emit('openModal')
        toast.success("Успешно");
    })
}

watch(() => props.openShowModal, function () {
        if (props.modalValue?.id) {
            obj.value.new_cost = JSON.parse(JSON.stringify(props.modalValue.cost))
        }
    },
    {deep: true}
);
</script>
