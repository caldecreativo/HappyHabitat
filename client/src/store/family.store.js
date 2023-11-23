import { createStore } from 'vuex';
import { request } from '../helpers/fetch';

export default createStore({
  state: () => ({
    families: {},
  }),
  mutations: {
    setFamilies(state, familiesData) {
      state.families = familiesData;
    },
    clearFamilies(state) {
      state.families = {};
    },
  },
  actions: {
    async create({ commit }, { familyName, userID }) {
      const familiesData = await request.post('/families/register', {
        familyName,
        userID,
      });
      commit('setFamilies', familiesData);
    },
    async update({ commit }, { familyID, newFamilyName }) {
      const familiesData = await request.put(`/families/updateFamily/${familyID}`, {
        newFamilyName,
      });
      commit('setFamilies', familiesData);
    },
    async delete({ commit }, { familyID }) {
      await request.delete(`/families/deleteFamily/${familyID}`);
      commit('clearFamilies');
    },
    async addUserToFamily({ commit }, { familyID, userID }) {
      const familiesData = await request.post(`/families/addToFamily/${familyID}`, { userID });
      commit('setFamilies', familiesData);
    },
    async removeUserFromFamily({ commit }, { familyID, userID }) {
      const familiesData = await request.post(`/families/removeUserFromFamily/${familyID}`, { userID });
      commit('setFamilies', familiesData);
    }
  }
});