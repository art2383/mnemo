import { describe, beforeEach, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStoreMnemonic } from '@/stores/mnemonic'

describe('Mnemonic Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active, so it's automatically picked up by any useStore() call; without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('has initial state of empty string', () => {
    const mnemonicStore = useStoreMnemonic()
    expect(mnemonicStore['mnemonic']).toBe('')
  })

  it('derives valid mnemonic correctly', () => {
    const mnemonicStore = useStoreMnemonic()
    mnemonicStore['mnemonic'] = 'father safe this pepper lava expand govern decrease alley major canoe addict'
    expect(mnemonicStore['derivations'][0]['addresses'][0]).toBe('19fGrM8Wm7mru9oXXfAxDvCN6oKpAcF6C')
    expect(mnemonicStore['derivations'][0]['addresses'][2]).toBe('1NzdVvbQbt5CZM7DKqcFPSZEpQbkNRYf87')
  })

  it('derives invalid mnemonic correctly', () => {
    const mnemonicStore = useStoreMnemonic()
    mnemonicStore['mnemonic'] = 'autumn possible similar garage donate elite raw move mix own color faith'
    expect(mnemonicStore['derivations'][1]['addresses'][0]).toBe('bc1qctp9hdevs7edddal9gv87ld8rnelv9exg2zwvu')
    expect(mnemonicStore['derivations'][1]['addresses'][2]).toBe('bc1quqkzwssnn45hycs77k0y8u9mwv59krrvj5khy8')
  })
})