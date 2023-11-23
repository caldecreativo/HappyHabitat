
import { defineStore } from "pinia";
import router from "../router/index";
import {request} from "../helpers/fetch";

export const userStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
  }),
  actions: {    

// Login
    async login(email, password) {
      try {
        const response = await request.post("/login", { email, password });
        this.user = response.data;
        localStorage.setItem("user", JSON.stringify(this.user));
        await router.push("/editUser");
      } catch (error) {
        console.error("Kunne ikke logge ind", error);
      }
    },

    // Logout
    async logout() {
      this.user = null;
      localStorage.removeItem("user");
      await router.push("/");
    },


    // Registrer user
    async register(username, email, password) {
      try {
        console.log("pinia trigger")
        const response = await request.post('/register', {
          userName: username,
          email: email,
          password: password,
        });
        this.user = response.data;
        localStorage.setItem("user", JSON.stringify(this.user));
        await router.push("/tilføj-familie");
      } catch (error) {
        console.log("Fejl i registreringen af bruger", error);
      }
    },


  },
});


