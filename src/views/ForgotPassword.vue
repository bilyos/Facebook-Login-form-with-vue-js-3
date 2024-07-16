<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg p-6 shadow-lg">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-4" data-testid="title">
        {{ t('forgotPassword') }}
      </h2>
      <p class="text-center text-gray-600 mb-3" data-testid="forget-header-text">
        {{ t('ForgotHeaderText') }}
      </p>
      <form @submit.prevent="submitLoginForm">
        <CustomInputEmail v-model="form.email" :errors="v$.email.$errors" />
        <div class="mt-4"></div>
        <CustomButton :label="t('sendResetLink')" type="primary" data-testid="submit" />
        <div class="mt-4">
          <router-link to="/" class="text-blue-600 font-bold">
            <div class="rounded-lg shadow-lg bg-gray-100 w-8 h-8 flex items-center justify-center">
              <i class="fa-solid fa-circle-arrow-left"></i>
            </div>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email as emailValidator, helpers } from '@vuelidate/validators'
import CustomButton from '../components/CustomButton.vue'
import CustomInputEmail from '../components/CustomInputEmail.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n({ useScope: 'global', inheritLocale: true })
const router = useRouter()

interface Form {
  email: String
}

const form = ref<Form>({
  email: ''
})

const rules = {
  email: {
    required: helpers.withMessage(t('requiredEmail'), required),
    email: helpers.withMessage(t('invalidEmail'), emailValidator)
  }
}

const v$ = useVuelidate(rules, form)

const submitLoginForm = async (): Promise<void> => {
  const isValid = await v$.value.$validate()
  if (!isValid) {
    console.log('Form is not valid')
    return
  }
  await router.push({ path: '/' })
}
</script>
