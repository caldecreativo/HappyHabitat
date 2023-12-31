import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vuelidate from 'vuelidate';
import Vue3TouchEvents from "vue3-touch-events";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleInfo, faAngleUp, faCircleQuestion, faXmark } from '@fortawesome/free-solid-svg-icons';
import valStore from './store/valStore'
import axios from 'axios';
import './registerServiceWorker'

axios.defaults.withCredentials = true;

library.add(faCircleInfo, faAngleUp, faCircleQuestion, faXmark);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      registration.update();
    });
  }

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(valStore);
app.use(router);
app.use(Vuelidate);
app.use(Vue3TouchEvents);

app.mount('#app');