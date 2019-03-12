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

function createGame(gameId, playerNames) {
  let game = gameTools.createGame({ gameId: gameId, yourIndex: -1 });
  gameTools.addPlayers(game, playerNames);
  return game;
}

export default {
  name: "Replay",
  props: ["gameId", "gameInfo"],
  components: { GameView },
  data() {
    let coreLib = require("../../kotlin/minesweeper-core");
    let core = coreLib.default.net.zomis.minesweeper.core;
    let mapFactory = new core.MapFactory();
    let map = mapFactory.classic_za3lpa$(16);
    let replayFactory = new core.ReplayFactory();
    let replay = replayFactory.fromSavedToMap_ld2mpi$(
      map,
      this.gameInfo.minePositions,
      this.gameInfo.clicksString
    );

    return {
      position: replay.replayPosition,
      max: replay.length(),
      game: createGame(
        this.gameId,
        this.gameInfo.players.map(pl => pl.playerName)
      ),
      replay: replay
    };
  },
  mounted() {
    this.updateGame(this.replay.viewing);
  },
  methods: {
    updateGame(map) {
      map.players.toArray().forEach(pl => {
        let player = this.game.players[pl.index];
        player.score = pl.score;
      });

      this.game.fields.forEach((row, y) => {
        row.forEach((field, x) => {
          let mapField = this.replay.viewing.fields
            .get_za3lpa$(y)
            .get_za3lpa$(x);
          field.blocked = mapField.blocked;
          field.clicked = mapField.isVisible();
          field.mine = mapField.isFoundMine();
          field.clickedBy = mapField.whoClicked
            ? mapField.whoClicked.index
            : null;
          field.value =
            field.clicked && !field.mine ? mapField.getKnownValue() : 0;
        });
      });
    }
  },
  watch: {
    position(value) {
      this.replay.setPosition_za3lpa$(value);
      this.updateGame(this.replay.viewing);
    }
  }
};
</script>
