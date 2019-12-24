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
    },
    webRTCRoom: 'default',
    webRtcON: false,
  },
  mutations: {
    updatetransname(state, arg) {
      state.transname = arg;
    },
    updateWebRTCRoom(state, arg) {
      state.webRTCRoom = arg;
    },
    updateWebRtcON(state, arg) {
      state.webRtcON = arg;
    }
  },
  actions: {},
  modules: {}
});