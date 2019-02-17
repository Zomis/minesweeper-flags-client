import Vue from "vue";
import Vuex from "vuex";
import statisticsStore from "./views/statistics/statisticsStore";
import socketStore from "./socketStore";
import lobbyStore from "./views/lobbyStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    statistics: statisticsStore,
    lobby: lobbyStore,
    socket: socketStore
  },
  state: {},
  mutations: {},
  actions: {}
});
