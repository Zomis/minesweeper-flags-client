<template>
  <div class="map-flex">
    <v-container fluid>
      <v-layout map-flex align-center justify-center column fill-height>
        <h1>Game {{ game.gameId }}</h1>
        <v-container fluid>
          <v-layout
            map-flex
            align-space-around
            justify-center
            :fill-height="$vuetify.breakpoint.lgAndUp"
            :column="$vuetify.breakpoint.mdAndDown"
          >
            <v-flex xs12 lg4 xl6>
              <v-container fluid>
                <v-layout
                  align-center
                  justify-center
                  :column="$vuetify.breakpoint.lgAndUp"
                  :fill-height="$vuetify.breakpoint.lgAndUp"
                  style="height: 100%"
                >
                  <PlayerView :playerData="game.playerData[0]" />
                  <h1 class="mines-remaining">{{ game.map.minesLeft }}</h1>
                  <PlayerView :playerData="game.playerData[1]" />
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs12 lg8 xl6 map-flex>
              <MapView
                :onClick="onClick"
                :game="game"
                :highlightWeapon="highlightWeapon"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import PlayerView from "./PlayerView";
import MapView from "./MapView";
import gameTools from "./gameTools";

export default {
  name: "LocalGame",
  props: [],
  components: { PlayerView, MapView },
  data() {
    let game = gameTools.createLocalGame();
    gameTools.setPlayerNames(game, ["A", "B"]);
    return {
      game: game
    };
  },
  methods: {
    onClick(field) {
      let playerData = this.game.playerData[this.game.map.currentPlayerIndex];
      let weapon = playerData.player.weapons.toArray()[
        playerData.selectedWeapon
      ];
      let move = this.game.map.currentPlayer.createMove(weapon.key.c, field);
      let moveAllowed = this.game.map.performMove(move);
      if (moveAllowed.name === "OK") {
        this.game.playerData[move.player.index].lastMove = move;
        this.$store.dispatch("games/resetSelectedWeapon", playerData);
      }
    }
  },
  computed: {
    players() {
      return this.game.map.players.toArray();
    },
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
