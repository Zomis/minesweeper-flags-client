<template>
  <div>
    <v-container fluid>
      <v-layout align-center justify-center column fill-height>
        <h1>Game {{ game.gameId }}</h1>
        <GameResult :game="game" :yourIndex="game.yourIndex" />
        <v-container fluid>
          <v-layout align-space-around justify-center row fill-height>
            <v-flex shrink>
              <v-container fluid>
                <v-layout
                  align-center
                  justify-center
                  column
                  fill-height
                  style="height: 1048px"
                >
                  <PlayerView :player="game.players[0]" />
                  <h1 class="mines-remaining">{{ game.minesRemaining }}</h1>
                  <PlayerView :player="game.players[1]" />
                </v-layout>
              </v-container>
            </v-flex>
            <MapView :game="game" />
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import PlayerView from "./PlayerView";
import MapView from "./MapView";
import GameResult from "./GameResult";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Games",
  props: [],
  components: { PlayerView, MapView, GameResult },
  methods: {},
  computed: {
    ...mapGetters("games", ["activeGame"]),
    game() {
      return this.activeGame;
    }
  }
};
</script>
<style>
.mines-remaining {
  margin: 42px 0 42px 0;
}
</style>
