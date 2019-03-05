<template>
  <div>
    <v-btn @click="request">Refresh</v-btn>
    <SummaryTable
      v-if="summary"
      :data="dataResult"
      :query="lastQuery"
      :loading="loading"
    />
    <GamesTable
      v-if="games"
      :data="dataResult"
      :query="lastQuery"
      :loading="loading"
    />
  </div>
</template>
<script>
import SummaryTable from "./SummaryTable";
import GamesTable from "./GamesTable";
import statsQuery from "./statsQuery";
import { mapState } from "vuex";

/*
auto-load property?
detect changes of queryResult

*/

export default {
  name: "StatisticsTable",
  props: {
    summary: Boolean,
    games: Boolean,
    queryKey: {
      type: String,
      required: true
    }
    // default, default() for object/arrays, validator(value)
    // validator: return ['success', 'warning', 'danger'].indexOf(value) !== -1
  },
  components: { SummaryTable, GamesTable },
  mounted() {
    this.request();
  },
  methods: {
    request() {
      this.$store.dispatch("statistics/query", this.queryKey);
    }
  },
  computed: {
    ...mapState("statistics", {
      lastQuery(state) {
        return state.queries[this.queryKey].query;
      },
      loading(state) {
        return state.queries[this.queryKey].loading;
      },
      dataResult(state) {
        let data = state.queries[this.queryKey].result;
        if (data === null) {
          return [];
        }
        return data.summary || data.games || [];
      }
    })
  }
};
</script>
