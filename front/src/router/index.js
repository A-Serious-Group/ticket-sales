import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'


const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView,
    meta: {
      title: 'Main'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})


export default router