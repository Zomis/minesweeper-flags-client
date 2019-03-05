<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-tabs v-model="outerTab" color="cyan" dark slider-color="yellow">
          <v-tab>Start</v-tab>
          <v-tab-item>
            Empty
          </v-tab-item>

          <v-tab>Recent</v-tab>
          <v-tab-item lazy>
            <StatisticsTable games :pagination="false" queryKey="recent" />
          </v-tab-item>

          <v-tab>AI Nightmare</v-tab>
          <v-tab-item lazy>
            <StatisticsTable
              summary
              :pagination="false"
              queryKey="aiNightmare"
            />
          </v-tab-item>

          <v-tab>Query</v-tab>
          <v-tab-item lazy>
            <!-- TODO: Dynamically create more queries? -->
            <QueryEditor queryKey="query" />

            <v-tabs v-model="innerTab" color="cyan" dark slider-color="yellow">
              <v-tab>Summary</v-tab>
              <v-tab-item lazy>
                Summary
              </v-tab-item>

              <v-tab>Games</v-tab>
              <v-tab-item lazy>
                <StatisticsTable games queryKey="query" />
              </v-tab-item>

              <v-tab>Tags</v-tab>
              <v-tab-item lazy>
                Tags
              </v-tab-item>
            </v-tabs>
          </v-tab-item>
        </v-tabs>
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
      outerTab: 0,
      innerTab: 0
    };
  },
  // query: statsQuery.fromUrlParams(this.query2)
  components: { QueryEditor, StatisticsTable },
  computed: {
    ...mapState("statistics", {
      results: state => state.queryResult,
      queries: state => state.query
    })
  }
};
</script>
