<template>
  <div class="game-over" v-if="yourResult">
    <span class="you" v-if="yourIndex >= 0">YOU</span>
    <span class="you" v-else>{{ winnerName }}</span>
    <span v-if="winner" class="win">WIN</span>
    <span v-if="!winner" class="loss">LOSE</span>
    <div class="game-over-actions">
      <router-link to="/lobby">Back to Lobby</router-link>
      <v-btn color="info" @click="playAgain()">Play again</v-btn>
    </div>
    <Invites />
  </div>
</template>
<script>
import Invites from "../lobby/Invites";
import { mapState } from "vuex";

export default {
  name: "GameResult",
  props: ["game", "yourIndex"],
  components: { Invites },
  methods: {
    playAgain() {
      let opponent = this.game.players[1 - this.yourIndex].name;

      this.$store.dispatch("invites/sendInvite", {
        target: { userName: opponent },
        plugin: "PluginClassicGame"
      });
    }
  },
  computed: {
    ...mapState("games", {
      yourResult(state) {
        return state.activeGames[this.game.gameId].yourResult;
      },
      eliminations(state) {
        return state.activeGames[this.game.gameId].eliminations;
      }
    }),
    winnerName() {
      let elimination = this.eliminations.find(e => e.winPosition === 1);
      if (elimination !== null) {
        return elimination.name;
      }
      return null;
    },
    winner() {
      if (this.yourResult !== null) {
        return this.yourResult === "WIN";
      }
      if (this.yourIndex < 0) {
        // Observer
        return "WINS";
      }
      return null;
    }
  }
};
</script>
<style scoped>
.game-over {
  margin-top: 20px;
  font-size: 2em;
  font-weight: bolder;
}

.game-over .win {
  color: green;
}
.game-over .loss {
  color: red;
}
</style>
