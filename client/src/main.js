import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vuelidate from 'vuelidate';
import Vue3TouchEvents from "vue3-touch-events";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import valStore from './store/valStore'

library.add(faCircleInfo);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(valStore);
app.use(router);
app.use(Vuelidate);
app.use(Vue3TouchEvents);

app.mount('#app');