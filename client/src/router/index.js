import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue';
import RegUserView from '../views/RegUserView.vue';
import LogView from '../views/LoginView.vue';
import addFam from '../views/addFamView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView
  },
  {
    path: '/registrer',
    name: 'registrer bruger',
    component: RegUserView
  },
  {
    path: '/login',
    name: 'login',
    component: LogView
  },
  {
  path: '/tilføj-familie',
  name: 'Tilføj familie',
  component: addFam
}

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
