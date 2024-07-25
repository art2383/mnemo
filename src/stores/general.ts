import { useI18n } from 'vue-i18n'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type Defaults = {
  theme: string ,
  lang: string
}

const moduleSetup = () => {
  // App Init
  const appInit = () => {
    const defaults: Defaults = {
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      lang: locale.value
    }

    setLang(localStorage.getItem('lang') || defaults.lang)
    setTheme(localStorage.getItem('theme') || defaults.theme)
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
  const { locale, availableLocales } = useI18n()

  const setLang = (data: string): void => {
    locale.value = data
    localStorage.setItem('lang', data)
  }

  const switchLang = (): void => {
    const currentIndex = availableLocales.indexOf(locale.value)
    const nextIndex = (currentIndex + 1) % availableLocales.length
    setLang(availableLocales[nextIndex])
  }

  return {
    appInit, theme, toggleTheme, switchLang
  }
}

export const useGeneralStore = defineStore('general', moduleSetup)