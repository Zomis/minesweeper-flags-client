import Vue from "vue";
import Vuex from "vuex";
import statisticsStore from "./views/statistics/statisticsStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    statistics: statisticsStore
  },
  state: {},
  mutations: {},
  actions: {}
});
