<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data.items"
      :pagination="pagination"
      :loading="loading"
      :rows-per-page-items="[10, 15, 20, 25, 30, 40, 50, 100]"
      class="elevation-1"
    >
      <v-progress-linear
        slot="progress"
        color="blue"
        indeterminate
      ></v-progress-linear>
      <template slot="no-data">
        <v-alert :value="data.status >= 400" color="error" icon="warning">
          {{ data.data }}
        </v-alert>
        <v-alert :value="true" color="warning" icon="warning">
          No data found
        </v-alert>
      </template>
      <template slot="items" slot-scope="props">
        <td><PlayerField :player="props.item.player" :query="query" /></td>
        <td>{{ props.item.gamesPlayed }}</td>
        <td>{{ props.item.playerWins }}</td>
        <td>{{ props.item.oppWins }}</td>
        <td>{{ props.item.winPercent }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import PlayerField from "./PlayerField";

export default {
  name: "SummaryTable",
  props: ["data", "query", "loading"],
  components: { PlayerField },
  data() {
    return {
      pagination: {
        page: 1,
        descending: true,
        sortBy: "gamesPlayed",
        rowsPerPage: 100
      },
      headers: [
        {
          text: "Player",
          align: "left",
          sortable: true,
          value: "player"
        },
        { text: "Games played", value: "gamesPlayed" },
        { text: "Player wins", value: "playerWins" },
        { text: "Opponent wins", value: "oppWins" },
        { text: "Win %", value: "winPercent" }
      ]
    };
  }
};
</script>
