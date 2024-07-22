import { describe, beforeEach, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMnemonicStore } from '@/stores/mnemonic'

describe('Mnemonic Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active, so it's automatically picked up by any useStore() call; without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('has initial state of empty strings', () => {
    const mnemonicStore = useMnemonicStore()
    expect(mnemonicStore['mnemonic']).toBe('')
    expect(mnemonicStore['passphrase']).toBe('')
  })

  it('derives from valid mnemonic with passphrase for Bitcoin key #0', () => {
    const mnemonicStore = useMnemonicStore()
    mnemonicStore['mnemonic'] = 'father safe this pepper lava expand govern decrease alley major canoe addict'
    mnemonicStore['passphrase'] = 'asd'

    expect(mnemonicStore['derivations'][0]['privateKeysReadable'][0]).toBe('L5f7UoFrwbWyfnobTKd2iCmxPMsXtDs4qkMckxhW1Sim3t7SKxj8')
    expect(mnemonicStore['derivations'][0]['publicKeysReadable'][0]).toBe('03ae32b52be0f362259ac8fc4b03eb11bf9b2d262c79d58c8922fd99bcab66c37c')
    expect(mnemonicStore['derivations'][0]['addresses'][0]).toBe('13CNds1y6sJgYWDyBYexsgDk4zyTS4jq54')
  })

  it('derives from valid mnemonic with passphrase for Bitcoin key #1', () => {
    const mnemonicStore = useMnemonicStore()
    mnemonicStore['mnemonic'] = 'father safe this pepper lava expand govern decrease alley major canoe addict'
    mnemonicStore['passphrase'] = 'asd'

    expect(mnemonicStore['derivations'][0]['privateKeysReadable'][1]).toBe('KwgpoXmFU2EjZwxXMrowSQPVFRpoAVAvwH1Up2Rgd7RUWY5ptY5v')
    expect(mnemonicStore['derivations'][0]['publicKeysReadable'][1]).toBe('02dda9dc5abadbc8faf7e2773b2f8760e50af1a4e662e52c059f20545618f9c961')
    expect(mnemonicStore['derivations'][0]['addresses'][1]).toBe('15MhYJsUUisTx9EkFdEqK9bR6C6TN9JmCp')
  })

  it('derives from valid mnemonic with passphrase for Bitcoin SegWit key #0', () => {
    const mnemonicStore = useMnemonicStore()
    mnemonicStore['mnemonic'] = 'father safe this pepper lava expand govern decrease alley major canoe addict'
    mnemonicStore['passphrase'] = 'asd'

    expect(mnemonicStore['derivations'][1]['privateKeysReadable'][0]).toBe('KyAhk55VE8ncZNbDKWHFxviY3wQTsXanyzqbuMeuddX6VpSR41cr')
    expect(mnemonicStore['derivations'][1]['publicKeysReadable'][0]).toBe('0304747c0c17e08facc5f83ec39c562a5cac5714d5655252aee4fcc037a0838e1c')
    expect(mnemonicStore['derivations'][1]['addresses'][0]).toBe('bc1qf02n7xmdkzgstfzxgdfup8dn2dlt659v386ljw')
  })

  it('derives from valid mnemonic with passphrase for Bitcoin SegWit key #1', () => {
    const mnemonicStore = useMnemonicStore()
    mnemonicStore['mnemonic'] = 'father safe this pepper lava expand govern decrease alley major canoe addict'
    mnemonicStore['passphrase'] = 'asd'

    expect(mnemonicStore['derivations'][1]['privateKeysReadable'][1]).toBe('L4Uoh3nDFjAeAZ5uZNnyUhJiBx51w6yA85vz9D2zuDVY3QDNubYf')
    expect(mnemonicStore['derivations'][1]['publicKeysReadable'][1]).toBe('03346ad4d55c3a9eb1b50b7c76a452ec36d2767d605f64833ef7babba2fe04bb11')
    expect(mnemonicStore['derivations'][1]['addresses'][1]).toBe('bc1qh5fucmddrgdj4qxd8gks2zw2vk7fa4g3u7t5du')
  })

  it('derives from valid mnemonic with passphrase for Ethereum key #0', () => {
    const mnemonicStore = useMnemonicStore()
    mnemonicStore['mnemonic'] = 'father safe this pepper lava expand govern decrease alley major canoe addict'
    mnemonicStore['passphrase'] = 'asd'

    expect(mnemonicStore['derivations'][2]['privateKeysReadable'][0]).toBe('cdbce44997ac3bc5700acd6d3e660f6d739373799843c175cd39a37ad607f270')
    expect(mnemonicStore['derivations'][2]['publicKeysReadable'][0]).toBe('031ffcdc0d13390f27d88d360f30dba0aa56a2c68cf3778a2eee3eb2f41a4c9503')
    expect(mnemonicStore['derivations'][2]['addresses'][0]).toBe('0xe01944FD7939d74De6ea82d973e404A753B30e16'.toLowerCase())
  })

  it('derives from valid mnemonic with passphrase for Ethereum key #1', () => {
    const mnemonicStore = useMnemonicStore()
    mnemonicStore['mnemonic'] = 'father safe this pepper lava expand govern decrease alley major canoe addict'
    mnemonicStore['passphrase'] = 'asd'

    expect(mnemonicStore['derivations'][2]['privateKeysReadable'][1]).toBe('304acbfc2ff15460e1414360da62e94be6d0cb58c6c72393c5915e19badda7c8')
    expect(mnemonicStore['derivations'][2]['publicKeysReadable'][1]).toBe('025e28f3e1013e98c7d444cd82d528a3fdc9735c519d8a77c8023bcb14aff9fe25')
    expect(mnemonicStore['derivations'][2]['addresses'][1]).toBe('0x0E6F6B8f59A5878372a0a2Add0Dc9887B3313b4b'.toLowerCase())
  })

  it('derives from invalid mnemonic correctly for Bitcoin SegWit key #0', () => {
    const mnemonicStore = useMnemonicStore()
    mnemonicStore['mnemonic'] = 'father safe this pepper lava expand govern decrease alley major canoe zoo'
    mnemonicStore['passphrase'] = 'asd'

    expect(mnemonicStore['derivations'][1]['privateKeysReadable'][0]).toBe('L1uYXLZ7rfiBmTHCj8vgk6BxwBMwmwBRpD2iNNMQQS7BpeiXQW69')
    expect(mnemonicStore['derivations'][1]['publicKeysReadable'][0]).toBe('0230a387b97e4b7cc763c24303f43f59e06bc92766fc572f4eee6af1f3e5aae556')
    expect(mnemonicStore['derivations'][1]['addresses'][0]).toBe('bc1qcsfsm53wjzrwjdje47ca4nhwdydy0m4wuyzc4y')
  })

  it('derives from invalid mnemonic correctly for Bitcoin SegWit key #1', () => {
    const mnemonicStore = useMnemonicStore()
    mnemonicStore['mnemonic'] = 'father safe this pepper lava expand govern decrease alley major canoe zoo'
    mnemonicStore['passphrase'] = 'asd'

    expect(mnemonicStore['derivations'][1]['privateKeysReadable'][1]).toBe('Kypmqb3cRdJK1ySrT5rJH1pdNGsMQj6Ba4g1N3NVxAWo1DdH6e9F')
    expect(mnemonicStore['derivations'][1]['publicKeysReadable'][1]).toBe('03e2d5236c082e86953973b99061d946cd243ae8c1ba77be3109f898124072e34d')
    expect(mnemonicStore['derivations'][1]['addresses'][1]).toBe('bc1qahqvscyd90xkhvrsvmx6hvlqe4scwm0nrdhuqk')
  })
})