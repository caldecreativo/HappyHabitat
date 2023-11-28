import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import RegUserView from "../views/RegUserView.vue";
import LogView from "../views/LoginView.vue";
import addExFamView from "../views/addExFamView.vue";
import chooseFam from "../views/chooseFamView.vue";
import newFam from "../views/newFamView.vue";
import editUser from "../views/editUserView.vue";
import confirmView from "../views/confirmView.vue";
import updateUser from "../views/updateUserView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: MainView,
  },
  {
    path: "/register",
    name: "registrer bruger",
    component: RegUserView,
  },
  {
    path: "/login",
    name: "login",
    component: LogView,
  },
  {
    path: "/tilfoj-eksisterende-familie",
    name: "Tilføj eksisterende familie",
    component: addExFamView,
  },
  {
    path: "/vaelg-familie",
    name: "vælg familie",
    component: chooseFam,
  },
  {
    path: "/ny-familie",
    name: "ny familie",
    component: newFam,
  },
  {
    path: "/rediger-bruger",
    name: "rediger bruger",
    component: editUser,
  },
  {
    path: "/bekraeft-bruger",
    name: "bekræft bruger",
    component: confirmView,
  },
  {
    path: "/opdater-bruger",
    name: "opdater bruger",
    component: updateUser,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
