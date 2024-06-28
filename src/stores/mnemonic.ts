import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { generateMnemonic, validateMnemonic, wordlists } from 'bip39'

const wordList = wordlists.english

const module = () => {
  const mnemonic = ref('')

  const mnemonicWords = computed(() => {
    const result = []

    if (!mnemonic.value) {
      return result
    }

    const words = mnemonic.value.split(' ')
    words.forEach(word => {
      const line = wordList.findIndex(w => w === word) + 1
      const hex = line.toString(16)
      result.push({ word, line, hex })
    })
    return result
  })

  const isValid = computed(() => {
    return validateMnemonic(mnemonic.value)
  })

  const generate = () => {
    mnemonic.value = generateMnemonic()
  }

  const clear = () => {
    mnemonic.value = ''
  }

  return {
    mnemonic,
    mnemonicWords, isValid,
    generate, clear
  }
}

export const useStoreMnemonic = defineStore('mnemonic', module)