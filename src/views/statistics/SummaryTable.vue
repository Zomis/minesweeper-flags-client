<template>
  <div>
    <v-data-table :headers="headers" :items="data" class="elevation-1">
      <v-progress-linear
        slot="progress"
        color="blue"
        indeterminate
      ></v-progress-linear>
      <template slot="no-data">
        <v-alert :value="data.error" color="error" icon="warning">
          An error occurred when retrieving data
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
  props: ["data", "query"],
  components: { PlayerField },
  data() {
    return {
      headers: [
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
    };
  }
};
</script>
