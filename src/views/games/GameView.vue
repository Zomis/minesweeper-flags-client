<template>
  <div>
    <v-container fluid>
      <v-layout align-center justify-center column fill-height>
        <h1>Game {{ game.gameId }}</h1>
        <v-container fluid>
          <v-layout
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
                    :onWeaponChange="weaponChange"
                  />
                  <h1 class="mines-remaining">{{ game.minesRemaining }}</h1>
                  <PlayerView
                    :player="game.players[1]"
                    :controllable="game.yourIndex == 1"
                    :onWeaponChange="weaponChange"
                  />
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs12 lg8 xl6>
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
  name: "Games",
  props: ["game"],
  data() {
    return {
      highlightWeapon: "P"
    };
  },
  components: { PlayerView, MapView },
  methods: {
    weaponChange(newWeapon) {
      this.highlightWeapon = newWeapon;
    }
  }
};
</script>
<style>
.mines-remaining {
  margin: 42px 0 42px 0;
}
</style>
