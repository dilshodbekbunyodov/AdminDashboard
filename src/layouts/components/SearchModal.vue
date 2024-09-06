<template>
  <div :class="openShowModal ? 'openCatalog menu' : 'defaultCatalog menu'">
    <div class="modal-title">
      <h5>Поиск</h5>
      <button class="ri-close-line" @click="emit('openModal')"/>
    </div>

    <div class="modal-body">
      <b-form-group>
        <b-form-input
            v-model="searchPage"
            placeholder="Поиск..."
        />
      </b-form-group>

      <div :style="array?.length === 10 ? 'height: 200px' : ''" class="overflow-auto">
        <perfect-scrollbar class="h-100">
          <div v-for="(item, index) in array"
               :key="index"
          >
            <div
                v-if="item.route"
                class="p-2 rounded border cursor-pointer mb-2"
                @click="changeRoute(item)"
            >
              {{ item.title }}
            </div>
          </div>
        </perfect-scrollbar>
      </div>
    </div>

    <div class="modal-footer">
      <b-button
          @click="emit('openModal')"
          variant="secondary"
      >
        Отменить
      </b-button>
    </div>
  </div>
  <div
      :class="openShowModal ? 'black__shadow' : ''"
      @click="$emit('openModal')"
  />
</template>

<script setup>
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import Vertical from "@/navigation/vertical.js";
import {PerfectScrollbar} from "vue3-perfect-scrollbar";

const router = useRouter()
const props = defineProps({
  openShowModal: {
    type: Boolean,
    default: () => false
  }
})
const emit = defineEmits(['openModal'])

let searchPage = ref(null)
let array = ref([])
const searchOptions = ref(Vertical)

function changeRoute(item) {
  router.push(item.route)
  emit('openModal')
}

watch(searchPage, (value) => {
  if (value) {
    array.value = searchOptions.value.filter(el => {
      return el.title?.toLowerCase().indexOf(value.toLowerCase()) >= 0
    })
  } else {
    array.value = searchOptions.value
  }
})

</script>
