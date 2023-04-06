import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import InputPage from '@/pages/InputPage.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/input',
      name: 'input',
      component: InputPage,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (authStore.token) {
          next()
        } else {
          next(from.path)
          // FIXME: 에러 페이지 생성 필요
        }
      },
    },
  ],
})

export default router
