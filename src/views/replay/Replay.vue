<template>
  <v-container fluid>
    <v-layout column fill-height>
      <v-layout row justify-center align-center>
        <v-flex xs1 text-xs-center>{{ position }}</v-flex>
        <v-flex xs10>
          <v-slider v-model="position" :max="max" :min="0"></v-slider>
        </v-flex>
      </v-layout>
      <v-flex grow>
        <GameView xs12 :game="game" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import GameView from "../games/GameView";
import gameTools from "../games/gameTools";

export default {
  name: "Replay",
  props: ["gameId", "gameInfo"],
  components: { GameView },
  data() {
    let coreLib = require("../../kotlin/minesweeper-core");
    let core = coreLib.default.net.zomis.minesweeper.core;
    let mapFactory = new core.MapFactory();
    let map = mapFactory.classic(16);
    let replayFactory = new core.ReplayFactory();
    let replay = replayFactory.fromSavedToMap(
      map,
      this.gameInfo.minePositions,
      this.gameInfo.clicksString
    );
    replay.setPosition(0);

    let game = gameTools.createGameFromMap(map);
    game.gameId = this.gameId;
    gameTools.setPlayerNames(
      game,
      this.gameInfo.players.map(pl => pl.playerName)
    );
    return {
      position: replay.replayPosition,
      max: replay.length(),
      game: game,
      replay: replay
    };
  },
  mounted() {},
  methods: {},
  watch: {
    position(value) {
      this.replay.setPosition(value);
    }
  }
};
</script>
