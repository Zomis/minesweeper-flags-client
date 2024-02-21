<template>
  <v-container fluid class="pa-2">
    <v-layout map-flex align-center justify-center column fill-height>
      <v-layout
        class="fill-height"
        map-flex
        align-space-around
        justify-center
        :fill-height="$vuetify.breakpoint.lgAndUp"
        :column="$vuetify.breakpoint.mdAndDown"
      >
        <v-flex xs12 lg3 xl4>
          <v-layout
            class="fill-height"
            align-center
            justify-center
            column
            :fill-height="$vuetify.breakpoint.lgAndUp"
            style="height: 100%"
          >
            <div class="mb-2">
              <span>Game {{ game.gameId }}</span>
              <span> / </span>
              <b>{{ game.map.minesLeft }} mines left</b>
            </div>
            <PlayerView :playerData="game.playerData[0]" />
            <PlayerView class="my-2" :playerData="game.playerData[1]" />
          </v-layout>
        </v-flex>
        <v-flex xs12 lg6 xl6 map-flex>
          <MapView
            class="px-1"
            :onClick="onClick"
            :game="game"
            :highlightWeapon="highlightWeapon"
          />
        </v-flex>
        <v-flex xs12 lg3 xl2>
          <Messages
            class="px-1"
            @send="sendChat"
            :messages="messages"
            :singleElement="true"
          />
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import PlayerView from "./PlayerView";
import MapView from "./MapView";
import Messages from "../lobby/Messages";
import { mapState } from "vuex";

export default {
  name: "GameView",
  props: ["game"],
  components: { PlayerView, MapView, Messages },
  methods: {
    sendChat(message) {
      this.$store.dispatch(
        "socket/send",
        `NMSS #${this.game.gameId} me: ${message}`
      );
    },
    onClick(field) {
      this.$store.dispatch("games/makeMove", {
        game: this.game,
        weapon: this.highlightWeapon,
        field: field,
      });
    },
  },
  computed: {
    ...mapState("lobby", {
      messages(state) {
        return state.ingameMessages;
      },
    }),
    highlightWeapon() {
      let playerIndex = this.game.map.currentPlayer.index;
      let playerData = this.game.playerData[playerIndex];
      let weapons = this.game.map.currentPlayer.weapons;
      let weapon = weapons.toArray()[playerData.selectedWeapon];
      return weapon;
    },
  },
};
</script>
<style>
.container {
  height: 100%;
}
.map-flex {
  width: 100%;
  height: 100%;
}
</style>
