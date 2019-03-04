<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <div>{{ query }}</div>
        <div>{{ queryBody }}</div>
      </v-flex>

      <v-flex xs10 offset-xs1>
        <QueryEditor :query="query" />
      </v-flex>

      <v-flex xs10 offset-xs1>
        <v-btn @click="request">Fetch</v-btn>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import QueryEditor from "./QueryEditor";
import SummaryTable from "./SummaryTable";
import GamesTable from "./GamesTable";
import { mapState } from "vuex";
import statsQuery from "./statsQuery";

export default {
  name: "Statistics",
  props: ["query2"],
  data() {
    return {
      query: statsQuery.fromUrlParams(this.query2)
    };
  },
  components: { QueryEditor, SummaryTable, GamesTable },
  mounted() {
    this.request();
  },
  methods: {
    request() {
      this.$store.dispatch("statistics/query", this.queryBody);
    }
  },
  computed: {
    queryBody() {
      return statsQuery.toServerRequestBody(this.query);
    },
    ...mapState("statistics", {
      queryResult: state => state.queryResult,
      lastQuery: state => state.query
    })
  }
};
</script>
