<template>
  <GameScreen :gameId="activeGameId" />
</template>
<script>
import GameScreen from "./GameScreen";
import { mapState } from "vuex";

export default {
  name: "ActiveGame",
  components: { GameScreen },
  beforeDestroy() {
    this.$store.commit("games/leaveActiveGame");
  },
  computed: {
    ...mapState("games", ["activeGameId"])
  }
};
</script>
