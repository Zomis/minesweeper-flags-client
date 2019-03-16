<template>
  <v-card color="#ddf9fd">
    <span>GameId {{ game.gameId }}</span>
    <div class="game-player-info">
      <div v-for="(info, index) in game.players" :key="index">
        {{ info.playerName }} ({{ info.score }})
        <span v-show="game.currentPlayerIndex === index">(Current)</span>
      </div>
    </div>
    <v-btn @click="observe()">Observe</v-btn>
  </v-card>
</template>
<script>
export default {
  name: "LobbyGame",
  props: ["game"],
  methods: {
    observe() {
      this.$store.dispatch("lobby/observe", this.game.gameId);
    }
  }
};
</script>
