import { createRouter, createWebHistory } from 'vue-router'

const routes: {path: string, name: string, component: Function}[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/generate-valid',
    name: 'generateValid',
    component: () => import('@/views/GenerateValidView.vue'),
  },
  {
    path: '/generate-invalid',
    name: 'generateInvalid',
    component: () => import('@/views/GenerateInvalidView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router