<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md10 offset-md1>
        <v-tabs v-model="outerTab" color="cyan" dark slider-color="yellow">
          <v-tab>Start</v-tab>
          <v-tab>Recent</v-tab>
          <v-tab>Find player</v-tab>
          <v-tab>AI Nightmare</v-tab>
          <template v-if="query.query.resultType">
            <v-tab>Query</v-tab>
          </template>
        </v-tabs>
        <v-tabs-items v-model="outerTab" touchless>
          <v-tab-item>
            TODO: Information about you, sort of like a 'profile page'
          </v-tab-item>
          <v-tab-item lazy>
            <StatisticsTable games :pagination="false" queryKey="recent" />
          </v-tab-item>
          <v-tab-item lazy>
            TODO: Search player by player name.
          </v-tab-item>
          <v-tab-item lazy>
            <StatisticsTable
              summary
              :pagination="false"
              queryKey="aiNightmare"
            />
          </v-tab-item>

          <template v-if="query.query.resultType">
            <v-tab-item lazy>
              <!-- TODO: Dynamically create more queries? -->
              <QueryEditor queryKey="query" />

              <StatisticsTable auto queryKey="query" />
            </v-tab-item>
          </template>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import QueryEditor from "./QueryEditor";
import StatisticsTable from "./StatisticsTable";
import { mapState } from "vuex";

export default {
  name: "Statistics",
  props: ["query2"],
  data() {
    return {
      outerTab: 0
    };
  },
  // query: statsQuery.fromUrlParams(this.query2)
  components: { QueryEditor, StatisticsTable },
  watch: {
    query() {
      this.outerTab = 4; // to the "Query" tab
    }
  },
  computed: {
    ...mapState("statistics", {
      query: state => state.queries.query
    })
  }
};
</script>
