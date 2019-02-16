import Vue from "vue";
import Vuex from "vuex";
import statisticsStore from "./views/statistics/statisticsStore";
import socketStore from "./socketStore";

Vue.use(Vuex);

let socket;

export default new Vuex.Store({
  modules: {
    statistics: statisticsStore,
    socket: socketStore
  },
  state: {},
  mutations: {},
  actions: {}
});
