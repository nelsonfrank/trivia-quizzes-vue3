import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import QuestionPage from '../pages/QuestionPage.vue'
import ResultPage from '../pages/ResultPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuestionPage,
    },
    {
      path: '/results',
      name: 'results',
      component: ResultPage,
    },
  ],
})

export default router
