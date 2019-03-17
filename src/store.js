import Vue from "vue";
import Vuex from "vuex";
import statisticsStore from "./views/statistics/statisticsStore";
import socketStore from "./socketStore";
import lobbyStore from "./views/lobby/lobbyStore";
import inviteStore from "./views/lobby/inviteStore";
import gameStore from "./views/games/gamesStore";
import settingsStore from "./views/settingsStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    statistics: statisticsStore,
    lobby: lobbyStore,
    invites: inviteStore,
    games: gameStore,
    settings: settingsStore,
    socket: socketStore
  },
  state: {},
  mutations: {},
  actions: {}
});
