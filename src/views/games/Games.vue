<template>
  <div>
    {{ gameInfo.gameId }}
    <PlayerView
      :player="player"
      v-for="player in game.players"
      :key="player.index"
    />
    <MapView :game="game" />
    <GameResult :game="game" :yourIndex="game.yourIndex" />
  </div>
</template>
<script>
import PlayerView from "./PlayerView";
import MapView from "./MapView";
import GameResult from "./GameResult";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Games",
  props: ["gameInfo"],
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
