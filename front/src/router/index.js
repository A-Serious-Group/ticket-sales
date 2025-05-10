import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import CreateEvent from '../views/CreateEvent.vue'


const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView,
    meta: {
      title: 'Main'
    }
  },
  {
    path: '/createEvent',
    name: 'CreateEvent',
    component: CreateEvent,
    meta: {
      title: 'CreateEvent'
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