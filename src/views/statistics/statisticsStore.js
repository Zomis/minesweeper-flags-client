import axios from "axios";

export default {
  namespaced: true,
  state: {
    query: null,
    queryResult: null
  },
  mutations: {
    queryResponse(state, data) {
      state.query = data.query;
      data = data.response;
      if (data.summary) {
        data.summary.forEach(it => {
          it.gamesPlayed = it.playerWins + it.oppWins;
          it.winPercent = it.playerWins / it.gamesPlayed;
        });
        data.summary = data.summary.filter(it => it.gamesPlayed > 0);
      }
      if (data.games) {
        data.games.forEach(it => {
          it.opponent = it.p2;
          it.opponentRating = it.p2rating;
          it.opponentResult = it.p2result;
          it.playerRating = it.rating_before;
          it.playerResult = it.result;
          it.time = new Date(it.time).toLocaleString();
          delete it.p2;
          delete it.p2rating;
          delete it.p2result;
          delete it.rating_before;
          delete it.result;
        });
      }

      state.queryResult = data;
    }
  },
  actions: {
    query(context, data) {
      axios.post(process.env.VUE_APP_URL + "query", data).then(response =>
        context.commit("queryResponse", {
          query: data,
          response: response.data
        })
      );
    }
  }
};
