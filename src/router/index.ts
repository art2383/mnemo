import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/seed/:type',
    name: 'seed',
    component: () => import('@/views/SeedView.vue')
  },
  {
    path: '/word12',
    name: 'word12',
    component: () => import('@/views/Word12View.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
