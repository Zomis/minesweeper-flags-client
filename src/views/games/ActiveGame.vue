<template>
  <div class="fill-height">
    <GameResult :game="activeGame" />
    <GameView :game="activeGame" />
  </div>
</template>
<script>
import GameView from "./GameView";
import GameResult from "./GameResult";
import { mapGetters } from "vuex";

export default {
  name: "ActiveGame",
  components: { GameView, GameResult },
  computed: {
    ...mapGetters("games", ["activeGame"])
  }
};
</script>
