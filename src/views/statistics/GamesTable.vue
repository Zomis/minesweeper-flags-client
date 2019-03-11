<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      :rows-per-page-items="[10, 15, 20, 25, 30, 40, 50, 100]"
      :pagination.sync="pagination"
      :loading="loading"
      must-sort
      class="elevation-1"
    >
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
        <td><GameIdField :gameId="props.item.gameid" /></td>
        <td>{{ props.item.timeString }}</td>
        <td><PlayerField :player="props.item.player" :query="query" /></td>
        <td>{{ props.item.playerRating }}</td>
        <td>{{ props.item.playerResult }}</td>
        <td><PlayerField :player="props.item.opponent" :query="query" /></td>
        <td>{{ props.item.opponentRating }}</td>
        <td>{{ props.item.opponentResult }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import GameIdField from "./GameIdField";
import PlayerField from "./PlayerField";

export default {
  name: "GamesTable",
  props: ["data", "query", "loading"],
  components: { GameIdField, PlayerField },
  data() {
    return {
      pagination: {
        descending: true,
        sortBy: "time",
        rowsPerPage: 100
      },
      headers: [
        { text: "GameId", value: "gameid" },
        { text: "Time", value: "time" },
        { text: "Player", value: "player" },
        { text: "Player Rating", value: "playerRating" },
        { text: "Player Result", value: "playerResult" },
        { text: "Opponent", value: "opponent" },
        { text: "Opponent Rating", value: "opponentRating" },
        { text: "Opponent Result", value: "opponentResult" }
      ]
    };
  }
};
</script>
