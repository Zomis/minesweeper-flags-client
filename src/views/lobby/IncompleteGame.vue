<template>
  <v-card>
    <v-layout column align-space-around justify-center>
      <v-layout row align-center justify-center fill-height>
        <v-layout
          v-for="(info, index) in playerScores"
          :key="index"
          column
          align-center
          justify-center
          :class="{ currentPlayer: game.currentPlayerIndex === index }"
        >
          <img
            style="width: 36px; height: 36px"
            :src="users[index].picture"
            v-if="users[index] && users[index].picture"
          />
          <v-icon large v-else>help</v-icon>
          <span>{{ info.player }}</span>
          <span>{{ info.score }}</span>
        </v-layout>
      </v-layout>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn @click="resume()" v-on="on">Resume</v-btn>
        </template>
        <span>GameId {{ game.gameId }}</span>
      </v-tooltip>
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
      return this.players.map((player, index) => ({
        player: player,
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
        return this.game.players.map(
          player => state.onlineUsers[player.playerName]
        );
      }
    })
  }
};
</script>
