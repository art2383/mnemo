import '@/assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

import en from '@/common/langs/en.js'
import ru from '@/common/langs/ru.js'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, ru }
})

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(createPinia())

app.mount('#app')
