<template>
    <div>
        <b-row>
            <b-col>
                <b-card>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex flex-column">
                            <p class="mb-0 text-primary">{{ STATISTIC_CARD.number_dishes }}</p>
                            <h6 class="mt-2">Количество блюд</h6>
                        </div>
                        <b-avatar
                                variant="primary"
                        >
                            <i class="ri-flood-line"/>
                        </b-avatar>
                    </div>
                </b-card>
            </b-col>

            <b-col>
                <b-card>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex flex-column">
                            <p class="mb-0 text-primary">{{ STATISTIC_CARD.number_products }}</p>
                            <h6 class="mt-2">Количество продуктов</h6>
                        </div>
                        <b-avatar
                                variant="info"
                        >
                            <i class="ri-shopping-cart-fill"/>
                        </b-avatar>
                    </div>
                </b-card>
            </b-col>

            <b-col>
                <b-card>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex flex-column">
                            <p class="mb-0 text-primary">
                                {{STATISTIC_CARD.total_cost ?
                                    new Intl.NumberFormat('ru-Ru', {
                                        style: 'currency',
                                        currency: 'UZS'
                                    }).format(STATISTIC_CARD.total_cost) : 0
                                }}
                            </p>
                            <h6 class="mt-2">Общая стоимость</h6>
                        </div>
                        <b-avatar
                                variant="danger"
                        >
                            <i class="ri-money-dollar-circle-line"/>
                        </b-avatar>
                    </div>
                </b-card>
            </b-col>

            <b-col>
                <b-card>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex flex-column">
                            <p class="mb-0 text-primary">
                                {{STATISTIC_CARD.each ?
                                    new Intl.NumberFormat('ru-Ru', {
                                        style: 'currency',
                                        currency: 'UZS'
                                    }).format(STATISTIC_CARD.each) : 0
                                }}
                            </p>
                            <h6 class="mt-2">Расход на 1 человека</h6>
                        </div>
                        <b-avatar
                                variant="warning"
                        >
                            <i class="ri-user-follow-line"/>
                        </b-avatar>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import store from "@/store/index.js";
import {useRoute} from "vue-router";

const route = useRoute()

onMounted(() => {
    store.dispatch('events/FETCH_STATISTIC_CARD', {id: route.params.id})
})

const STATISTIC_CARD = computed(() => {
    return store.state.events.statisticCard.results
})
</script>
