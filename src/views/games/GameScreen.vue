<template>
  <div class="fill-height">
    <GameResult :game="game" />
    <GameView :game="game" />
  </div>
</template>
<script>
import GameView from "./GameView";
import GameResult from "./GameResult";
import { mapState } from "vuex";

export default {
  name: "GameScreen",
  props: ["gameId"],
  components: { GameView, GameResult },
  computed: mapState("games", {
    game(state) {
      return state.activeGames[this.gameId];
    }
  })
};
</script>
