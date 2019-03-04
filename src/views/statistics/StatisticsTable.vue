<template>
  <div>
    <v-btn @click="request">Refresh</v-btn>
    <SummaryTable
      v-if="queryResult && queryResult.summary"
      :data="queryResult.summary"
      :query="lastQuery"
    />
    <GamesTable
      v-if="queryResult && queryResult.games"
      :data="queryResult.games"
      :query="lastQuery"
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
      queryResult(state) {
        return state.queries[this.queryKey].result;
      }
    })
  }
};
</script>
