import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue';
import RegUserView from '../views/RegUserView.vue';
import LogView from '../views/LoginView.vue';
import addExFamView from '../views/addExFamView.vue'
import chooseFam from '../views/chooseFamView.vue';
import newFam from '../views/newFamView.vue'

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
  path: '/tilføj-eksisterende-familie',
  name: 'Tilføj eksisterende familie',
  component: addExFamView
},
{
path: '/vælg-familie',
name: 'vælg familie',
component: chooseFam
},
{
path: '/ny-familie',
name: 'ny familie',
component: newFam
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
