import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/forgot-password',
      component: () => import('@/views/ForgotPassword.vue')
    },
    {
      path: '/welcome',
      component: () => import('@/views/WelcomePage.vue')
    }
  ]
})

export default router
