// store/index.js
import { createStore } from 'vuex';
import user from './user.store';

export default createStore({
  modules: {
    user
  }
  // Du kan tilføje flere moduler her
});