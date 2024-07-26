import { useI18n } from 'vue-i18n'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type Defaults = {
  theme: string,
  lang: string,
  exposePrivateKeys: boolean,
  qDerivations: number
}

const moduleSetup = () => {
  // App Init
  const appInit = () => {
    const defaults: Defaults = {
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      lang: locale.value,
      exposePrivateKeys: true,
      qDerivations: 2
    }

    setLang(localStorage.getItem('lang') || defaults.lang)
    setTheme(localStorage.getItem('theme') || defaults.theme)
    setExposePrivateKeys(
      localStorage.getItem('exposePrivateKeys')
        ? localStorage.getItem('exposePrivateKeys') === 'true'
        : defaults.exposePrivateKeys
    )
    setQDerivations(Number(localStorage.getItem('qDerivations')) || defaults.qDerivations)
  }

  // Theme
  const theme = ref('')

  const setTheme = (title: string): void => {
    theme.value = title
    document.body.className = title // for the "extra-scroll" (not sure what is the right name)
    localStorage.setItem('theme', title)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  // Lang
  // no lang ref here, because i18n itself is a composable alright
  const { locale, availableLocales } = useI18n

  const setLang = (data: string): void => {
    locale.value = data
    localStorage.setItem('lang', data)
  }

  const switchLang = (): void => {
    const currentIndex = availableLocales.indexOf(locale.value)
    const nextIndex = (currentIndex + 1) % availableLocales.length
    setLang(availableLocales[nextIndex])
  }

  // Expose Private Keys
  const exposePrivateKeys = ref(true)

  const setExposePrivateKeys = (newVal: boolean) => {
    exposePrivateKeys.value = newVal
    localStorage.setItem('exposePrivateKeys', JSON.stringify(newVal))
  }

  // Derivations Quantity
  const qDerivations = ref(0)

  const setQDerivations = (newNumber: number) => {
    qDerivations.value = newNumber
    localStorage.setItem('qDerivations', String(newNumber))
  }

  return {
    appInit,
    theme, toggleTheme,
    switchLang,
    exposePrivateKeys, setExposePrivateKeys,
    qDerivations, setQDerivations
  }
}

export const useGeneralStore = defineStore('general', moduleSetup)