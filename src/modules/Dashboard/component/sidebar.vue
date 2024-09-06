<script setup>
const emit = defineEmits(['update:isOpen'])
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: () => false
  }
})
</script>

<template>
  <div>
    <div :class="{'isSidebar': isOpen, 'defaultSidebar': !isOpen}" class="w-50">
      <header class="b-sidebar-header">
        <button @click="emit('update:isOpen', false)">
          <i class="ri-close-fill"/>
        </button>

<!--        <h5 class="ml-auto">title</h5>-->
      </header>
    </div>
    <div
        @click="emit('update:isOpen', false)"
        :class="isOpen ? 'black__shadow' : ''"
    />
  </div>
</template>

