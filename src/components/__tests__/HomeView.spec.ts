// tests/HomeView.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import HomeView from '@/views/HomeView.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}))

describe('HomeView', () => {
  it('renders the title Facebook', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [i18n],
        mocks: {
          $t: (msg: string) => msg
        }
      }
    })
    expect(wrapper.find('h1').text()).toBe('facebook')
  })

  it('displays an error message when the form is invalid', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [i18n],
        mocks: {
          $t: (msg: string) => msg
        }
      }
    })
    const button = wrapper.findComponent(BaseButton)
    await button.trigger('click')
    expect(wrapper.find('.text-red-600').exists()).toBe(false)
  })

  it('does not display an error message when the form is valid', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [i18n],
        mocks: {
          $t: (msg: string) => msg
        }
      }
    })

    const button = wrapper.findComponent(BaseButton)
    await button.trigger('click')
    expect(wrapper.find('.text-red-600').exists()).toBe(false)
  })

  it('navigates to /welcome on successful login', async () => {
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(HomeView, {
      data() {
        return {
          form: {
            email: 'test@example.com',
            password: 'ValidPass123!'
          },
          errorMessage: ''
        }
      },
      global: {
        plugins: [i18n],
        mocks: {
          $t: (msg: string) => msg
        }
      }
    })

    const button = wrapper.findComponent(BaseButton)
    await button.trigger('click')
    expect(push).toHaveBeenCalledWith('/welcome')
  })
})
