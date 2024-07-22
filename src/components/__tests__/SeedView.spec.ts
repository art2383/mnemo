// import { vi } from 'vitest'
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SeedView from '@/views/SeedView.vue'

import { createPinia, setActivePinia } from 'pinia'

// vi.mock('vue-router', () => ({
//   resolve: vi.fn(),
// }))

describe.skip('SeedView Component', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders properly', () => {
    const wrapper = mount(SeedView, {
      global: {
        plugins: [pinia],
      }
    })

    expect(wrapper.text()).toContain('Mnemonic')
  })
})
