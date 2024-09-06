<template>
  <v-select
      :label="label"
      :reduce="reduce"
      :options="searchText ? localOptions : options.results"
      :getOptionLabel="getOptionLabel"
      :placeholder="placeholder"
      :multiple="multiple"
      v-model="selected"
      @open="onOpen"
      @close="onClose"
      @search="
      (val, loading) => {
        loading(true)
        fetchOptions(val).then(() => loading(false))
      }
    "
      @input="onSelected"
  >
    <template #list-footer>
      <li v-show="options.next" ref="load" class="loader">
        Loading more options...
      </li>
    </template>
  </v-select>
</template>

<script setup>
import {onMounted, reactive, watch, ref, nextTick} from "vue";
import VSelect from 'vue-select'

const emit = defineEmits(['input'])
const props = defineProps({
  state: {
    type: [Object, Array],
  },
  autoFetch: {
    type: Boolean,
    default() {
      return true
    },
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  options: {
    type: Object,
    required: false,
    default() {
      return {
        next: null,
        timer: null,
      }
    },
  },
  getOptionLabel: {
    type: Function,
    required: false,
  },
  reduce: {
    type: Function,
    required: false,
    default: v => v,
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
  lazyFetchData: {
    type: Function,
    required: false,
  },
  pageSize: {
    type: Number,
    required: false,
    default: 15,
  },
  search: {
    type: Function,
    required: false,
    default() {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve([]), 100)
      })
    },
  },
  value: {
    type: [Array, Object, String, Number],
  },
  filters: {
    type: Object,
    default() {
      return {}
    },
  },
})

let observer = reactive(null)
let selectLoading = reactive(false)
let localOptions = reactive([])
let searchText = reactive('')
let selected = reactive(null)

function onOpen() {
  nextTick(() => {
    if (ref.load) {
      observer.observe(ref.load)
    }
  })
}

const onSelected = (value) => {
  // this.$emit("input", this.selected);
  emit('input', value)
};

const onClose = () => {
  observer.disconnect()
};
const fetchOptions = (val) => {
  searchText = val
  if (props.timer) {
    clearTimeout(props.timer)
  }

  return new Promise((resolve, reject) => {
    props.timer = setTimeout(() => {
      if (!searchText) {
        return resolve()
      }
      props.lazyFetchData({...props.filters, search: val, page_size: 15})
          .then(data => {
            localOptions = data.results
          })
          .finally(() => {
            resolve()
          })
    }, 500)
  })
};


onMounted(() => {
  if (!props.options.results.length && props.autoFetch) {
    props.lazyFetchData({...props.filters, page_size: 15})
  }
  observer = new IntersectionObserver(
      async ([{isIntersecting, target}]) => {
        if (!isIntersecting || selectLoading) {
          return
        }
        if (!props.options?.next) {
          return
        }
        selectLoading = true
        const ul = target.offsetParent
        const scrollTop = target.offsetParent.scrollTop
        await props.lazyFetchData({
          ...props.filters,
          page: props.options.next,
          page_size: props.pageSize,
        })
        selectLoading = false
        await nextTick()
        ul.scrollTop = scrollTop
      },
  )
  selected = props.value
})

watch(() => props.value, function (newValue) {
  selected = newValue
})

</script>

<style scoped>
.loader {
  text-align: center;
  color: #bbbbbb;
}
</style>
