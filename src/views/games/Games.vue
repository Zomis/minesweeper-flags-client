<template>
  <div>
    <PlayerView
      :player="player"
      v-for="player in game.players"
      :key="player.index"
    />
    <MapView :game="game" />
  </div>
</template>
<script>
import PlayerView from "./PlayerView";
import MapView from "./MapView";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Games",
  props: ["gameInfo"],
  components: { PlayerView, MapView },
  methods: {},
  computed: {
    ...mapGetters("games", ["activeGame"]),
    game() {
      return this.activeGame;
    }
  }
};
</script>
