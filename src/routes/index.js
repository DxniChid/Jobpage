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
      path: '/apply',
      name: 'apply',
      component: () => import('../views/ApplyView.vue'),
    }
  ],
})

export default router