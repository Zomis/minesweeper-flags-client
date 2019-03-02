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
                    :controllable="game.yourIndex == 0"
                  />
                  <h1 class="mines-remaining">{{ minesRemaining }}</h1>
                  <PlayerView
                    :player="game.players[1]"
                    :controllable="game.yourIndex == 1"
                  />
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs12 lg8 xl6 map-flex>
              <MapView :game="game" :highlightWeapon="highlightWeapon" />
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

export default {
  name: "GameView",
  props: ["game"],
  components: { PlayerView, MapView },
  computed: {
    highlightWeapon() {
      let player = this.game.players[this.game.yourIndex];
      return player ? player.weapons[player.selectedWeapon] : null;
    },
    minesRemaining() {
      return (
        this.game.minesCount -
        this.game.players
          .map(pl => pl.score)
          .reduce((acc, value) => acc + value, 0)
      );
    }
  }
};
</script>
<style>
.mines-remaining {
  margin: 42px 0 42px 0;
}
.container {
  height: 100%;
}
.map-flex {
  height: 100%;
}
</style>
