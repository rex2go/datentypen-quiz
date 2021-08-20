import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Quiz from "@/views/Quiz.vue";
import Result from "@/views/Result.vue";
import Frontpage from "@/views/Frontpage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Frontpage',
    component: Frontpage
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
