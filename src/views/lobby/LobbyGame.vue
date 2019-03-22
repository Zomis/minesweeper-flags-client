<template>
  <v-card>
    <v-layout row wrap align-center justify-center>
      <v-flex xs6 v-for="(info, index) in game.players" :key="index">
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
            <v-btn style="align-self: center" @click="observe()" v-on="on">
              Observe
            </v-btn>
          </template>
          <span>GameId {{ game.gameId }}</span>
        </v-tooltip>
        <TimeAgo :timestamp="game.timestamp" />
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
import TimeAgo from "../TimeAgo";

export default {
  name: "LobbyGame",
  props: ["game"],
  components: { TimeAgo },
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
