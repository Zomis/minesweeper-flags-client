<template>
  <v-dialog v-model="showResult" persistent width="30%">
    <v-card>
      <v-card-title class="headline">
        <span class="you" v-if="isPlaying">You&nbsp;</span>
        <span class="you" v-else>{{ winnerName }}&nbsp;</span>
        <span v-if="winner">won</span>
        <span v-if="!winner">
          <span>lost&nbsp;</span>
          <v-icon>mood_bad</v-icon>
        </span>
      </v-card-title>
      <v-card-text>
        <span>The match has ended with scores:</span>
        <table>
          <tr v-for="(player, index) in game.players" :key="index">
            <td>{{ player.name }}</td>
            <td>{{ player.score }}</td>
          </tr>
        </table>
      </v-card-text>
      <v-card-actions>
        <v-btn color="info" @click="playAgain()" :ripple="false">
          Play again
        </v-btn>
        <v-btn color="warning" @click="showResult = false" :ripple="false">
          View Map
        </v-btn>
        <v-btn color="error" to="/lobby" :ripple="false">Back to Lobby</v-btn>
      </v-card-actions>
      <Invites />
    </v-card>
  </v-dialog>
</template>
<script>
import Invites from "../lobby/Invites";
import { mapState } from "vuex";

export default {
  name: "GameResult",
  props: ["game"],
  data() {
    return {
      showResult: false
    };
  },
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
  watch: {
    yourResult(value) {
      if (value) {
        this.showResult = true;
      }
    }
  },
  computed: {
    isPlaying() {
      return this.game.playerData.filter(pl => pl.controllable).length > 0;
    },
    ...mapState("games", {
      yourResult(state) {
        return state.activeGames[this.game.gameId].yourResult;
      }
    }),
    winnerName() {
      let elimination = this.game.eliminations.find(e => e.winPosition === 1);
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
