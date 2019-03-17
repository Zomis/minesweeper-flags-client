<template>
  <v-card>
    <v-layout column align-space-around justify-center>
      <v-layout row align-center justify-center fill-height>
        <v-layout
          v-for="(info, index) in game.players"
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
          <span>{{ info.playerName }}</span>
          <span>{{ info.score }}</span>
        </v-layout>
      </v-layout>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn @click="observe()" v-on="on">Observe</v-btn>
        </template>
        <span>GameId {{ game.gameId }}</span>
      </v-tooltip>
    </v-layout>
  </v-card>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "LobbyGame",
  props: ["game"],
  methods: {
    observe() {
      this.$store.dispatch("lobby/observe", this.game.gameId);
    }
  },
  computed: {
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
