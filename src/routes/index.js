import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/jobdescription',
      name: 'jobdescription',
      component: () => import('../views/JobDescriptionView.vue'),
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: () => import('@/views/HomePageView.vue')

    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('../views/ApplyView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ],
})

export default router