import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    transname: 'right',
    routerposition: {
      "/": 1,
      "/video": 2,
      "/music": 3,
      "/bbs": 4,
      "/about": 5
    }
  },
  mutations: {
    updatetransname(state, arg) {
      state.transname = arg;
    }
  },
  actions: {},
  modules: {}
});