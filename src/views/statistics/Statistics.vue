<template>
  <div>
    Statistics

    <v-btn @click="request">Fetch</v-btn>

    <SummaryTable
      v-if="queryResult && queryResult.summary"
      :data="queryResult.summary"
    />
  </div>
</template>
<script>
import SummaryTable from "./SummaryTable";
import { mapState } from "vuex";

export default {
  name: "Statistics",
  data() {
    return {
      queryBody: {
        players: ["#AI_Nightmare"],
        plugin: null,
        tags: null,
        withoutTags: null,
        after: null,
        before: null,
        resultType: "summary",
        page: 0,
        pageSize: 100
      }
    };
  },
  components: { SummaryTable },
  methods: {
    request() {
      this.$store.dispatch("statistics/query", this.queryBody);
    }
  },
  computed: {
    ...mapState("statistics", {
      queryResult: state => state.queryResult
    }),
    dataItems() {
      return this.queryResult ? this.queryResult.summary : [];
    }
  }
};
</script>
