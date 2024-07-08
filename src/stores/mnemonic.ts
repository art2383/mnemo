import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateMnemonic, validateMnemonic, mnemonicToSeedSync, wordlists } from 'bip39'
import { HDKey } from '@scure/bip32' // regular bip32 library has dependencies, this one doesn't, and this one is easier implemented
import { publicKeyToBitcoinAddress, uint8ArrayToHex } from '@/common/helpers'
import { derivationConfig } from '@/common/derivation-config'

type MnemonicWordsArray = {
  word: string,
  line: number,
  hex: string
}[]

type Seed = {
  seedBuffer: Buffer,
  seedString: string
}

const wordList: string[] = wordlists.english

const moduleSetup = () => {
  const q = 3 // not reactive, no need

  const mnemonic = ref('')

  const mnemonicWords = computed((): MnemonicWordsArray => {
    const result: MnemonicWordsArray = []

    if (!mnemonic.value) {
      return result
    }

    const words: string[] = mnemonic.value.split(' ')
    words.forEach((word: string) => {
      const line: number = wordList.findIndex(w => w === word) + 1
      const hex: string = line.toString(16)
      result.push({ word, line, hex })
    })
    return result
  })

  const isMnemonic = computed((): boolean => {
    const words: string[] = mnemonic.value.split(' ')
    const lengthIsCorrect = [12, 15, 18, 21, 24].includes(words.length)
    if (!lengthIsCorrect) {
      return false
    }
    return words.every(w => wordList.includes(w))
  })

  const isValidMnemonic = computed((): boolean => {
    return validateMnemonic(mnemonic.value)
  })

  const seed = computed((): Seed => {
    const seedBuffer: Buffer = mnemonicToSeedSync(mnemonic.value)
    const seedString: string = seedBuffer.toString('hex')
    return { seedBuffer, seedString }
  })

  const rootKey = computed((): HDKey => {
    return HDKey.fromMasterSeed(new Uint8Array(seed.value.seedBuffer))
  })

  const derivations = computed((): [] => {
    const result = []
    Object.keys(derivationConfig).forEach(blockchain => {
      const publicKeys: string[] = []
      const addresses: string[] = []
      for (let i = 0; i < q; i++) {
        const publicKey: Uint8Array = rootKey.value.derive(derivationConfig[blockchain].path + i).publicKey
        const address: string = derivationConfig[blockchain].method(Buffer.from(publicKey))
        const publicKeyReadable: string = uint8ArrayToHex(publicKey)
        publicKeys.push(publicKeyReadable)
        addresses.push(address)
      }
      result.push({
        title: derivationConfig[blockchain].title,
        path: derivationConfig[blockchain].path + 'i',
        publicKeys,
        addresses
      })
    })
    return result
  })

  const generate = (): void => {
    mnemonic.value = generateMnemonic()
  }

  const clear = (): void => {
    mnemonic.value = ''
  }

  return {
    mnemonic,
    mnemonicWords, isMnemonic, isValidMnemonic, seed, rootKey, derivations,
    generate, clear
  }
}

export const useStoreMnemonic = defineStore('mnemonic', moduleSetup)