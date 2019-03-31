<template>
  <div class="map-flex">
    <v-container fluid>
      <v-layout map-flex align-center justify-center column fill-height>
        <h1>Game {{ game.gameId }}</h1>
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
              <PlayerView :playerData="game.playerData[0]" />
              <h1 class="mines-remaining">
                {{ game.map.minesLeft }} mines left
              </h1>
              <PlayerView :playerData="game.playerData[1]" />
            </v-layout>
          </v-flex>
          <v-flex xs12 lg6 xl6 map-flex>
            <MapView
              :onClick="onClick"
              :game="game"
              :highlightWeapon="highlightWeapon"
            />
          </v-flex>
          <v-flex xs12 lg3 xl2>
            <Messages
              :singleElement="true"
              @send="sendChat"
              :messages="messages"
            />
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
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
        field: field
      });
    }
  },
  computed: {
    ...mapState("lobby", {
      messages(state) {
        return state.ingameMessages;
      }
    }),
    highlightWeapon() {
      let playerIndex = this.game.map.currentPlayer.index;
      let playerData = this.game.playerData[playerIndex];
      let weapons = this.game.map.currentPlayer.weapons;
      let weapon = weapons.toArray()[playerData.selectedWeapon];
      return weapon;
    }
  }
};
</script>
<style>
.mines-remaining {
  margin: 20px 0 20px 0;
}
.container {
  height: 100%;
}
.map-flex {
  width: 100%;
  height: 100%;
}
</style>
