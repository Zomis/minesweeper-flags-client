<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Statistics</v-toolbar-title>
      <v-btn @click="request">Refresh</v-btn>
    </v-toolbar>
    <SummaryTable
      v-if="summary || autoSummary"
      :data="dataResult"
      :query="lastQuery"
      :loading="loading"
    />
    <GamesTable
      v-if="games || autoGames"
      :data="dataResult"
      :query="lastQuery"
      :loading="loading"
    />
  </div>
</template>
<script>
import SummaryTable from "./SummaryTable";
import GamesTable from "./GamesTable";
import { mapState } from "vuex";

export default {
  name: "StatisticsTable",
  props: {
    summary: Boolean,
    games: Boolean,
    auto: Boolean,
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
    autoSummary() {
      return this.auto && this.lastQuery.resultType === "summary";
    },
    autoGames() {
      return this.auto && this.lastQuery.resultType === "games";
    },
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
        if (data.summary || data.games) {
          return { items: data.summary || data.games };
        }
        data.items = [];
        return data;
      }
    })
  }
};
</script>
