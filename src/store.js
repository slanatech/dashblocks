import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    switchDark: false
  },
  mutations: {
    setSwitchDark(state, value) {
      state.switchDark = value;
    }
  },
  actions: {}
});
