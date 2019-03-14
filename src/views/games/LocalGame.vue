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
                  <PlayerView
                    :player="game.players[0]"
                    :controllable="yourIndex[0]"
                  />
                  <h1 class="mines-remaining">{{ game.minesLeft }}</h1>
                  <PlayerView
                    :player="game.players[1]"
                    :controllable="yourIndex[1]"
                  />
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs12 lg8 xl6 map-flex>
              <MapView
                :onClick="onClick"
                :lastMoves="lastMoves"
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
import Kotlin from "kotlin";

let coreLib = require("../../kotlin/minesweeper-core");
let core = coreLib.default.net.zomis.minesweeper.core;
console.log(core);
let mapFactory = new core.MapFactory();
let map = mapFactory.classic(16);

export default {
  name: "LocalGame",
  props: [],
  components: { PlayerView, MapView },
  data() {
    console.log(Kotlin);
    map.placeMines(51, Kotlin.kotlin.random.Random.Default);
    map.recount();
    console.log(map);
    return {
      lastMoves: [null, null],
      yourIndex: { 0: true, 1: true },
      game: map
    };
  },
  methods: {
    onClick(field) {
      let move = this.game.currentPlayer().createMove(80, field);
      let moveAllowed = this.game.performMove(move);
      if (moveAllowed.name === "OK") {
        this.$set(this.lastMoves, move.player.index, move);
      }
    }
  },
  computed: {
    highlightWeapon() {
      let player = this.game.players[this.yourIndex[0]];
      return player ? player.weapons[player.selectedWeapon] : null;
    }
  }
};
</script>
