<template>
  <button
    :class="[
      'w-full px-4 py-2 rounded-md text-white shadow-outline focus:outline-none focus:ring-2 focus:ring-offset-2',
      props.type === 'primary'
        ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
    ]"
    data-testid="submit"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'primary' }
})
</script>

<style scoped>
.shadow-outline {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
</style>
