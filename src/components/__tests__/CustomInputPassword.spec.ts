import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CustomInputPassword from '@/components/CustomInputPassword.vue'

// Mock vue-i18n

const createError = (message: string) => ({
  $uid: Math.random().toString(36),
  $message: message,
  $propertyPath: 'password',
  $property: 'password',
  $validator: 'required',
  $params: {},
  $pending: false
})

describe('CustomInputPassword', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    vi.mock('vue-i18n', () => ({
      useI18n: () => ({
        t: (key: string) => key
      })
    }))

    wrapper = mount(CustomInputPassword, {
      props: {
        modelValue: 'password123',
        errors: []
      },
      global: {
        mocks: {
          $t: (msg: string) => msg
        }
      }
    })
  })

  it('renders the input with the correct initial value', () => {
    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('input[type="password"]')
    expect(input.element.value).toBe('password123')
  })

  it('updates the modelValue when the input changes', async () => {
    const input = wrapper.find('input[type="password"]')
    await input.setValue('newpassword')
    expect(wrapper.emitted()['update:modelValue']).toEqual([['newpassword']])
  })

  it('displays the error message when errors prop is passed', async () => {
    expect(wrapper.find('[data-testid="error-message-1"]').exists()).toBe(false)

    await wrapper.setProps({
      errors: [createError('Password is required')]
    })

    const errorMessage = wrapper.find('[data-test="error-message-"]')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('Password is required')
    expect(wrapper.find('[data-testid="error-message-0"]').classes('border-red-500')).toBe(true)
  })

  it('removes red border class when errors prop is not passed', async () => {
    await wrapper.setProps({
      errors: []
    })
    const input = wrapper.find('input[type="password"]')
    expect(input.classes()).not.toContain('border-red-500')
  })

  it('watches for modelValue prop changes and updates internal value', async () => {
    await wrapper.setProps({ modelValue: 'newpassword' })
    const input = wrapper.find('input[type="password"]')
    expect(input.element.value).toBe('newpassword')
  })
})
