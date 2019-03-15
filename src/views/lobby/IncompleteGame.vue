<template>
  <v-card color="#ddf9fd">
    <span>GameId {{ game.gameId }}</span
    ><br />
    <span>Clicks {{ game.clicks }}</span>
    <div class="game-player-info">
      <div v-for="(info, index) in playerScores" :key="index">
        {{ info.player }} ({{ info.score }})
      </div>
    </div>
    <v-btn @click="resume()">Resume</v-btn>
  </v-card>
</template>
<script>
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
    }
  }
};
</script>
