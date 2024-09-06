<template>
  <b-row>
    <b-col>
      <b-card>
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex flex-column">
            <p class="mb-0 text-primary">{{ statistics.event_count ? statistics.event_count : 0 }}</p>
            <h6 class="mt-2">Количество событий</h6>
          </div>
          <b-avatar variant="primary">
            <i class="ri-flood-line"/>
          </b-avatar>
        </div>
      </b-card>
    </b-col>

    <b-col>
      <b-card>
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex flex-column">
            <p class="mb-0 text-primary">{{ statistics.past_events ? statistics.past_events : 0 }}</p>
            <h6 class="mt-2">Прошедшие</h6>
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
              {{statistics.unpast_events ? statistics.unpast_events : 0}}
            </p>
            <h6 class="mt-2">Не прошедшие</h6>
          </div>
          <b-avatar
              variant="danger"
          >
            <i class="ri-user-follow-line"/>
          </b-avatar>
        </div>
      </b-card>
    </b-col>

    <b-col>
      <b-card>
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex flex-column">
            <p class="mb-0 text-primary">
              {{statistics.all_event_cost ?
                new Intl.NumberFormat('ru-Ru', {
                  style: 'currency',
                  currency: 'UZS'
                }).format(statistics.all_event_cost) : 0
              }}
            </p>
            <h6 class="mt-2">Общая стоимость</h6>
          </div>
          <b-avatar
              variant="warning"
          >
            <i class="ri-money-dollar-circle-line"/>
          </b-avatar>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import {computed, onMounted} from "vue";
import store from "../../store/index.js";

onMounted(() => {
    store.dispatch('events/FETCH_EVENT_STATISTICS')
})

const statistics = computed(() => {
    return store.state.events.eventStatistics.results
})
</script>
