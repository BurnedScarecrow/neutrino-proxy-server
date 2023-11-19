import { createStore } from "vuex";

export default createStore({
  state: {
    authorized: false,
  },
  getters: {
    isAuthorized: (state) => state.authorized,
  },
  mutations: {
    setAuthorized(state, data: boolean) {
      state.authorized = data;
    },
  },
  actions: {
    authorize({ commit }) {
      commit("setAuthorized", true);
    },

    logout({ commit }) {
      commit("setAuthorized", false);
    },
  },
  modules: {},
});
