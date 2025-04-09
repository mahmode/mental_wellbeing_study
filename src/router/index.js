import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

const routes = [
  { path: '/', component: App },
  { path: '/text', component: App },
  { path: '/audio', component: App },
  { path: '/video', component: App }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router