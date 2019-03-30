<template>
  <v-card>
    <v-layout row wrap align-center justify-center>
      <v-flex xs6 v-for="(info, index) in playerScores" :key="index">
        <v-layout
          column
          align-center
          justify-center
          :class="{ currentPlayer: game.currentPlayerIndex === index }"
        >
          <img
            style="width: 36px; height: 36px; margin-top: 4px"
            :src="users[index].picture"
            v-if="users[index] && users[index].picture"
          />
          <v-icon large v-else>help</v-icon>
          <span>{{ info.playerName }}</span>
          <span>{{ info.score }}</span>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn style="align-self: center" @click="resume()" v-on="on">
              Resume
            </v-btn>
          </template>
          <span>GameId {{ game.gameId }}</span>
        </v-tooltip>
        <!--
          <TimeAgo :timestamp="game.timestamp" />
        -->
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "IncompleteGame",
  props: ["game"],
  methods: {
    resume() {
      this.$store.dispatch("games/resume", this.game.gameId);
    }
  },
  computed: {
    playerScores() {
      return this.players.map((playerName, index) => ({
        playerName: playerName,
        score: this.scores[index]
      }));
    },
    players() {
      return this.game.players.split(",");
    },
    scores() {
      return this.game.scores.split(",");
    },
    ...mapState("lobby", {
      users(state) {
        return this.playerScores.map(
          player => state.onlineUsers[player.playerName]
        );
      }
    })
  }
};
</script>
