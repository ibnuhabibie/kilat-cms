import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      redirect: '/collections/blog-posts',
      meta: { requiresAuth: true }
    },
    {
      path: '/collections/:collectionName',
      name: 'collection',
      props: true,
      component: () => import('../pages/CollectionPage.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Check if session exists and is valid
  const isAuthenticated = await authStore.checkAuth()

  // Route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login with return URL
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // Route requires guest (login page)
  if (to.meta.requiresGuest && isAuthenticated) {
    // Already logged in, redirect to home
    next({ path: '/' })
    return
  }

  next()
})

export default router
