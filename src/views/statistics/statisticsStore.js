import axios from "axios";
import statsQuery from "./statsQuery";

function createQuery(key, query) {
  return {
    loading: false,
    query: query,
    queryEdit: statsQuery.copyQuery(query),
    key: key,
    result: null
  };
}

export default {
  namespaced: true,
  state: {
    queries: {
      recent: createQuery("recent", {
        resultType: "games",
        pageSize: 100
      }),
      aiNightmare: createQuery("aiNightmare", {
        resultType: "summary",
        players: ["#AI_Nightmare"]
      }),
      query: createQuery("query", {})
    }
  },
  mutations: {
    loading(state, data) {
      let query = state.queries[data.queryKey];
      query.loading = data.loading;
    },
    setQuery(state, query) {
      let queryData = createQuery("query", query);
      state.queries.query = queryData;
    },
    queryResponse(state, data) {
      let query = state.queries[data.queryKey];
      query.query = data.query;
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
          it.timeString = new Date(it.time).toLocaleString();
          delete it.p2;
          delete it.p2rating;
          delete it.p2result;
          delete it.rating_before;
          delete it.result;
        });
      }

      query.result = data;
    }
  },
  actions: {
    openQuery(context, query) {
      context.commit("setQuery", query);
      context.dispatch("query", "query");
    },
    query(context, queryKey) {
      context.commit("loading", { queryKey: queryKey, loading: true });
      let query = statsQuery.copyQuery(context.state.queries[queryKey].query);
      let queryBody = statsQuery.toServerRequestBody(query);
      console.info("Query " + queryKey, queryBody);
      axios
        .post(process.env.VUE_APP_URL + "query", queryBody)
        .then(response => {
          context.commit("queryResponse", {
            query: query,
            queryKey: queryKey,
            response: response.data
          });
        })
        .catch(e => {
          context.commit("queryResponse", {
            query: query,
            queryKey: queryKey,
            error: true,
            response: e.response
          });
        })
        .then(() => {
          context.commit("loading", { queryKey: queryKey, loading: false });
        });
    }
  }
};
