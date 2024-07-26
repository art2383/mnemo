import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { generateMnemonic, validateMnemonic, mnemonicToSeedSync, wordlists } from 'bip39'
import { HDKey } from '@scure/bip32' // regular bip32 library has dependencies, this one doesn't, and this one is easier implemented
import { derivationConfig } from '@/common/derivation-config'
import { useGeneralStore } from '@/stores/general'

type MnemonicWordsArray = {
  word: string,
  line: number,
  hex: string
}[]

type Seed = {
  seedBuffer: Buffer,
  seedString: string
}

const generalStore = useGeneralStore()
const { exposePrivateKeys, qDerivations } = storeToRefs(generalStore)

const moduleSetup = () => {
  const mnemonic = ref('')
  const passphrase = ref('')

  const generate = (): void => {
    mnemonic.value = generateMnemonic()
  }

  const generateInvalid = (): void => {
    const words: string[] = generateMnemonic().split(' ')
    words.pop()
    const lastWord = generateMnemonic().split(' ')[0]
    mnemonic.value = [... words, lastWord].join(' ')
  }

  const clear = (): void => {
    mnemonic.value = ''
    passphrase.value = ''
  }

  const words = computed((): string[] => {
    return mnemonic.value.split(' ')
  })

  const isCorrectLength = computed((): boolean => {
    return [12, 15, 18, 21, 24].includes(words.value.length)
  })

  const isFromDictionary = computed((): boolean => {
    return words.value.every(w => wordlists.english.includes(w))
  })

  const isValidMnemonic = computed((): boolean => {
    return validateMnemonic(mnemonic.value)
  })

  const mnemonicWords = computed((): MnemonicWordsArray => {
    const result: MnemonicWordsArray = []

    if (!mnemonic.value) {
      return result
    }
    words.value.forEach((word: string) => {
      const line: number = wordlists.english.findIndex(w => w === word) + 1
      const hex: string = line.toString(16)
      result.push({ word, line, hex })
    })
    return result
  })

  const seed = computed((): Seed => {
    const seedBuffer: Buffer = mnemonicToSeedSync(mnemonic.value, passphrase.value)
    const seedString: string = seedBuffer.toString('hex')
    return { seedBuffer, seedString }
  })

  const rootKey = computed((): HDKey => {
    return HDKey.fromMasterSeed(new Uint8Array(seed.value.seedBuffer))
  })

  const derivations = computed((): [] => {
    const result = []
    Object.keys(derivationConfig).forEach(blockchain => {
      const privateKeysReadable: string[] = []
      const publicKeysReadable: string[] = []
      const addresses: string[] = []
      for (let i = 0; i < qDerivations.value; i++) {
        const node: HDKey = rootKey.value.derive(derivationConfig[blockchain].path + i)
        const privateKeyReadable: string = exposePrivateKeys.value
          ? derivationConfig[blockchain].getPrivateKeyReadable(Buffer.from(node.privateKey))
          : '* * *'
        const publicKeyReadable: string = Buffer.from(node.publicKey as Uint8Array).toString('hex')
        const address: string = derivationConfig[blockchain].getAddress(Buffer.from(node.publicKey))
        privateKeysReadable.push(privateKeyReadable)
        publicKeysReadable.push(publicKeyReadable)
        addresses.push(address)
      }
      result.push({
        title: derivationConfig[blockchain].title,
        path: derivationConfig[blockchain].path + 'i',
        privateKeysReadable,
        publicKeysReadable,
        addresses
      })
    })
    return result
  })

  return {
    mnemonic, passphrase,
    mnemonicWords, isCorrectLength, isFromDictionary, isValidMnemonic, seed, rootKey, derivations,
    generate, clear, generateInvalid
  }
}

export const useMnemonicStore = defineStore('mnemonic', moduleSetup)