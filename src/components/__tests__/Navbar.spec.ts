import NavBar from '@/components/NavBar.vue'
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

describe('NavBar Rendering', () => {
  it('renders properly', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.text()).toContain('Home')
  })
})
