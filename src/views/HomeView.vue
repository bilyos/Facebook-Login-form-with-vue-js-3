<template>
  <div class="min-h-screen flex items-center justify-center md:bg-gray-100">
    <div
      class="container mx-auto flex flex-col lg:flex-row items-center justify-around mt-[-200px] lg:mt-0"
    >
      <div
        class="w-full lg:w-1/2 flex flex-col items-center text-center lg:text-left lg:items-start mb-10 lg:mb-0"
      >
        <h1 class="text-3xl font-bold text-blue-600 md:text-5xl md:mb-9">facebook</h1>
        <p class="hidden md:inline-block text-2xl text-gray-700">
          {{ t('GreetMessage') }}
        </p>
      </div>
      <div class="md:w-1/2 lg:w-1/4 bg-white p-6 rounded-lg max-w-80">
        <form @submit.prevent="submitForm" class="space-y-4">
          <div
            data-testid="error"
            v-if="errorMessage"
            class="text-red-600 mb-6 text-center bg-red-100 rounded-md shadow-sm p-4"
          >
            {{ t('errorMessage') }}
          </div>
          <CustomInputEmail v-model="form.email" :errors="v$.email.$errors" />
          <CustomInputPassword
            v-model="form.password"
            :errors="v$.password.$errors"
            :label="t('passwordLabel')"
          />
          <CustomButton :label="t('login')" type="primary" @click="submitForm" />
          <div class="mt-4 text-center">
            <router-link
              to="/forgot-password"
              class="text-blue-600 hover:underline"
              data-testid="forgot-password"
            >
              {{ t('forgotPassword') }}
            </router-link>
          </div>
          <div class="flex flex-row items-center justify-around my-2">
            <div class="flex-grow border-t border-gray-500"></div>
            <span class="mx-4 text-gray-500">or</span>
            <div class="flex-grow border-t border-gray-500"></div>
          </div>

          <CustomButton :label="t('createNewAccount')" type="secondary" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'
import { required, email as emailValidator, minLength, helpers } from '@vuelidate/validators'
import CustomButton from '../components/BaseButton.vue'
import CustomInputEmail from '../components/CustomInputEmail.vue'
import CustomInputPassword from '../components/CustomInputPassword.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global', inheritLocale: true })
const router = useRouter()

interface User {
  email: string
  password: string
}

interface Form {
  email: string
  password: string
}

const form = ref<Form>({ email: '', password: '' })
const errorMessage = ref<string>('')

const passwordCustomRule = helpers.withMessage(t('passwordSymbol'), (value: string) => {
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value)
  const isValidLength = value.length >= 6
  return hasSymbol && isValidLength
})

const rules = {
  email: {
    required: helpers.withMessage(t('requiredEmail'), required),
    email: helpers.withMessage(t('invalidEmail'), emailValidator)
  },
  password: {
    required: helpers.withMessage(t('requiredPassword'), required),
    minLength: helpers.withMessage(t('passwordLength'), minLength(6)),
    pattern: passwordCustomRule
  }
}

const v$ = useVuelidate(rules, form)

onMounted(() => {
  const storedUser: User = JSON.parse(localStorage.getItem('user') || '{}')
  if (storedUser.email) {
    form.value.email = storedUser.email
    form.value.password = storedUser.password
  }
})

const submitForm = async (): Promise<void> => {
  const isValid = await v$.value.$validate()
  if (!isValid) {
    return
  }

  const storedUsers: Record<string, User> = JSON.parse(localStorage.getItem('users') || '{}')
  const storedUser = storedUsers[form.value.email]

  if (storedUser && form.value.password !== storedUser.password) {
    errorMessage.value = t('errorMessage')
  } else {
    errorMessage.value = ''
    storedUsers[form.value.email] = {
      email: form.value.email,
      password: form.value.password
    }
    localStorage.setItem('users', JSON.stringify(storedUsers))
    localStorage.setItem(
      'user',
      JSON.stringify({ email: form.value.email, password: form.value.password })
    )
    await router.push({ path: '/welcome' })
  }
}
</script>
