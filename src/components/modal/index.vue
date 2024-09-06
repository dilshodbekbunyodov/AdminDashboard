<template>
    <div :class="showModal ? 'openCatalog menu' : 'defaultCatalog menu'">
        <div class="modal-title">
            <h5>{{ modalValue.id ? "Редактировать" : "Добавить" }}</h5>
            <button class="ri-close-line" @click="$emit('openShowModal')"/>
        </div>
        <form @submit.prevent="onSubmit">
            <div class="modal-body">
                <b-form-group>
                    <label>Test</label>
                    <b-form-input required/>
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
import {ref} from "vue";
import {useRoute} from "vue-router";

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

const dish = ref({
    dish: null,
    count_people: null
});

const onSubmit = () => {

};
</script>
