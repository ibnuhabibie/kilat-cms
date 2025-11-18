import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/collections/:collectionName',
      name: 'collection',
      component: () => import('../components/CollectionTable.vue'),
      props: true
    }
  ],
})

export default router
