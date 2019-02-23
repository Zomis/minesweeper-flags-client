<template>
  <div class="incomplete-game">
    GameId {{ game.gameId }}<br />
    Clicks {{ game.clicks }}
    <div class="game-player-info">
      <div v-for="(info, index) in playerScores" :key="index">
        {{ info.player }} ({{ info.score }})
      </div>
    </div>
    <v-btn @click="resume()">Resume</v-btn>
  </div>
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
