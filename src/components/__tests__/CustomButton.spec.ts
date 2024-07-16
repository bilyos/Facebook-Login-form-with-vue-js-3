// tests/CustomButton.spec.ts

import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CustomButton from '@/components/CustomButton.vue'

describe('CustomButton', () => {

  it('renders the button with the correct label', () => {
    const wrapper = mount(CustomButton, {
      props: {
        label: 'Click Me'
      }
    })
    expect(wrapper.text()).toContain('Click Me')
  })

  it('applies the primary classes by default', () => {
    const wrapper = mount(CustomButton, {
      props: {
        label: 'Click Me'
      }
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-blue-600')
    expect(button.classes()).toContain('hover:bg-blue-700')
    expect(button.classes()).toContain('focus:ring-blue-500')
  })

  it('applies the secondary classes when type is secondary', () => {
    const wrapper = mount(CustomButton, {
      props: {
        label: 'Click Me',
        type: 'secondary'
      }
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-green-600')
    expect(button.classes()).toContain('hover:bg-green-700')
    expect(button.classes()).toContain('focus:ring-green-500')
  })
})
