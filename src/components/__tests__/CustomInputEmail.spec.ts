import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CustomInputEmail from '@/components/CustomInputEmail.vue'

const createError = (message: string | number) => ({
  $uid: Math.random().toString(36),
  $message: message,
  $propertyPath: 'email',
  $property: 'email',
  $validator: 'required',
  $params: {},
  $pending: false
})

describe('CustomInputEmail', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    vi.mock('vue-i18n', () => ({
      useI18n: () => ({
        t: (key: string) => key
      })
    }))

    wrapper = mount(CustomInputEmail, {
      props: { modelValue: 'test@example.com', errors: [] },
      global: {
        mocks: {
          $t: (msg: string) => msg
        }
      }
    })
  })

  it('renders the input with the correct initial value', () => {
    const input = wrapper.find('input[type="email"]')
    expect(input.element.value).toBe('test@example.com')
  })

  it('updates the modelValue when the input changes', async () => {
    const input = wrapper.find('input[type="email"]')
    await input.setValue('new@example.com')
    expect(wrapper.emitted()['update:modelValue']).toEqual([['new@example.com']])
  })

  it('displays the error message when errors prop is passed', async () => {
    await wrapper.setProps({ errors: [createError('Invalid email')] })
    const errorMessage = wrapper.find('[data-testid="error-message-0"]')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('Invalid email')
  })

  it('adds red border class when errors prop is passed', async () => {
    await wrapper.setProps({ errors: [createError('Invalid email')] })
    const input = wrapper.find('input[type="email"]')
    expect(input.classes()).toContain('border-red-500')
  })

  it('removes red border class when errors prop is not passed', async () => {
    await wrapper.setProps({ errors: [] })
    const input = wrapper.find('input[type="email"]')
    expect(input.classes()).not.toContain('border-red-500')
  })

  it('watches for modelValue prop changes and updates internal value', async () => {
    await wrapper.setProps({ modelValue: 'updated@example.com' })
    const input = wrapper.find('input[type="email"]')
    expect(input.element.value).toBe('updated@example.com')
  })
})
