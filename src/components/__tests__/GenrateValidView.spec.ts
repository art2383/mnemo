import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import GenerateValidView from '@/views/GenerateValidView.vue'

import { createPinia, setActivePinia } from 'pinia'

describe('GenerateValidView Component', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders properly', () => {
    const wrapper = mount(GenerateValidView, {
      global: {
        plugins: [pinia],
      }
    })

    expect(wrapper.text()).toContain('Mnemonic')
  })
})
