<template>
  <div>
    Statistics

    <v-btn @click="request">Fetch</v-btn>

    <v-data-table
      v-if="queryResult && queryResult.summary"
      :headers="headers.summary"
      :items="dataItems"
      class="elevation-1"
    >
      <v-progress-linear
        slot="progress"
        color="blue"
        indeterminate
      ></v-progress-linear>
      <template slot="no-data">
        <v-alert :value="queryResult.error" color="error" icon="warning">
          An error occurred when retrieving data
        </v-alert>
        <v-alert :value="true" color="warning" icon="warning">
          No data found
        </v-alert>
      </template>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.player }}</td>
        <td>{{ props.item.gamesPlayed }}</td>
        <td>{{ props.item.playerWins }}</td>
        <td>{{ props.item.oppWins }}</td>
        <td>{{ props.item.winPercent }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Statistics",
  data() {
    return {
      headers: {
        summary: [
          {
            text: "Player",
            align: "left",
            sortable: true,
            value: "player"
          },
          { text: "Games player", value: "gamesPlayed" },
          { text: "Player wins", value: "playerWins" },
          { text: "Opponent wins", value: "oppWins" },
          { text: "Win %", value: "winPercent" }
        ]
      },
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
