import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BookDetail from '@/views/BookDetail.vue'
import LoginVue from '@/views/LoginVue.vue'
import NotFoundView from '@/views/NotFound.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/book/:id',
      name: 'book-detail',
      component: BookDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView
    }
  ] as RouteRecordRaw[]
})

export default router
