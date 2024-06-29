import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateMnemonic, validateMnemonic, wordlists } from 'bip39'

type MnemonicWordsArray = {
  word: string,
  line: number,
  hex: string
}[]

const wordList: string[] = wordlists.english

const moduleSetup = () => {
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

  const isValid = computed((): boolean => {
    return validateMnemonic(mnemonic.value)
  })

  const generate = (): void => {
    mnemonic.value = generateMnemonic()
  }

  const clear = (): void => {
    mnemonic.value = ''
  }

  return {
    mnemonic,
    mnemonicWords, isValid,
    generate, clear
  }
}

export const useStoreMnemonic = defineStore('mnemonic', moduleSetup)