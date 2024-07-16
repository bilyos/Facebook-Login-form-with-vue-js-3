<template>
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700 text-left">
      {{ t('emailLabel') }}
    </label>
    <input
      data-testid="email"
      v-model="internalValue"
      @input="updateValue"
      type="email"
      id="email"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      :class="{ 'border-red-500': errors.length }"
    />
    <p v-for="(error, i) in errors" :key="error.$uid">
      <span
        v-if="error.$message"
        class="text-red-500 text-sm mt-1 text-left"
        :data-testid="'error-message-' + `${i}`"
      >
        {{ error.$message }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">

import { ref, watch, type PropType } from 'vue'
import type { ErrorObject } from '@vuelidate/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global', inheritLocale: true })

const props = defineProps({
  modelValue: { type: String, required: true },
  errors: {
    type: Array as PropType<ErrorObject[]>,
    default: () => []
  }
})

const emits = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  }
)

const updateValue = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>