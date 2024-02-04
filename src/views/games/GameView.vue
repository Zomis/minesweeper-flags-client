<template>
  <v-container fluid class="pa-2">
    <div class="pa-2 mb-2 container-display">
      <div class="game-div">
        <div class="game-grid pb-2">
          <div>Game {{ game.gameId }}</div>
          <div>{{ game.map.minesLeft }} mines left</div>
        </div>
        <PlayerView :playerData="game.playerData[0]" />
        <PlayerView :playerData="game.playerData[1]" />
      </div>
      <div>
        <MapView
          :onClick="onClick"
          :game="game"
          :highlightWeapon="highlightWeapon"
        />
      </div>
      <div>
        <Messages @send="sendChat" :messages="messages" />
      </div>
    </div>
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
.game-grid {
  display: grid;
  grid-template-columns: 60% 40%;
}

@media (min-width: 768px) {
  .container-display {
    display: grid;
    grid-template-columns: 30% 40% 25%;
    gap: 30px;
  }

  .game-div {
    align-self: center;
  }
}
</style>
