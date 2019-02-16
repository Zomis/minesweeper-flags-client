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
        <td><GameIdField :gameId="props.item.gameid" /></td>
        <td><PlayerField :player="props.item.player" :query="query" /></td>
        <td>{{ props.item.playerRating }}</td>
        <td>{{ props.item.playerResult }}</td>
        <td><PlayerField :player="props.item.opponent" :query="query" /></td>
        <td>{{ props.item.opponentRating }}</td>
        <td>{{ props.item.opponentResult }}</td>
        <td>{{ props.item.time }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import GameIdField from "./GameIdField";
import PlayerField from "./PlayerField";

export default {
  name: "GamesTable",
  props: ["data", "query"],
  components: { GameIdField, PlayerField },
  data() {
    return {
      headers: [
        { text: "GameId", value: "gameid" },
        { text: "Player", value: "player" },
        { text: "Player Rating", value: "playerRating" },
        { text: "Player Result", value: "playerResult" },
        { text: "Opponent", value: "opponent" },
        { text: "Opponent Rating", value: "opponentRating" },
        { text: "Opponent Result", value: "opponentResult" },
        { text: "Time", value: "time" }
      ]
    };
  }
};
</script>
