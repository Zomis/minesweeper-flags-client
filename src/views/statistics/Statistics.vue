<template>
  <div>
    Statistics

    <v-text-field
      label="Players"
      placeholder="#AI_Nightmare"
      v-model="queryPlayers"
    ></v-text-field>
    <v-text-field label="Result type" v-model="queryType"></v-text-field>

    <v-btn @click="request">Fetch</v-btn>

    <SummaryTable
      v-if="queryResult && queryResult.summary"
      :data="queryResult.summary"
      :query="query"
    />
    <GamesTable
      v-if="queryResult && queryResult.games"
      :data="queryResult.games"
      :query="query"
    />
  </div>
</template>
<script>
import SummaryTable from "./SummaryTable";
import GamesTable from "./GamesTable";
import { mapState } from "vuex";

function nullIfEmpty(value) {
  if (value === "") {
    return null;
  }
  if (Array.isArray(value) && value.length === 1 && value[0] === "") {
    return null;
  }
  return value;
}

export default {
  name: "Statistics",
  data() {
    return {
      queryType: "games",
      queryPlayers: "#AI_Nightmare"
    };
  },
  components: { SummaryTable, GamesTable },
  methods: {
    request() {
      this.$store.dispatch("statistics/query", this.queryBody);
    }
  },
  computed: {
    queryBody() {
      return {
        players: nullIfEmpty(this.queryPlayers.split(",")),
        plugin: null,
        tags: null,
        withoutTags: null,
        after: null,
        before: null,
        resultType: this.queryType,
        page: 0,
        pageSize: 100
      };
    },
    ...mapState("statistics", {
      queryResult: state => state.queryResult,
      query: state => state.query
    })
  }
};
</script>
