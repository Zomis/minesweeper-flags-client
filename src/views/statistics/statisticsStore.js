import axios from "axios";

export default {
  namespaced: true,
  state: {
    queryResult: null
  },
  mutations: {
    queryResponse(state, data) {
      if (data.summary) {
        data.summary.forEach(it => {
          it.gamesPlayed = it.playerWins + it.oppWins;
          it.winPercent = it.playerWins / it.gamesPlayed;
        });
        data.summary = data.summary.filter(it => it.gamesPlayed > 0);
      }

      state.queryResult = data;
    }
  },
  actions: {
    query(context, data) {
      axios
        .post("http://localhost:8082/query", data)
        .then(response => context.commit("queryResponse", response.data));
    }
  }
};
