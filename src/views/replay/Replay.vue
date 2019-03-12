<template>
  <v-container fluid>
    <span xs2 offset-xs1>{{ position }}</span>
    <v-slider xs6 offset-xs1 v-model="position" :max="max" :min="0"></v-slider>
    <GameView xs12 :game="game" />
  </v-container>
</template>
<script>
import GameView from "../games/GameView";
import gameTools from "../games/gameTools";

console.log("Loading minesweeper-core");
let coreLib = require("../../kotlin/minesweeper-core");
console.log(coreLib);
let core = coreLib.default.net.zomis.minesweeper.core;

let mapFactory = new core.MapFactory();
let map = mapFactory.classic_za3lpa$(16);
let replayFactory = new core.ReplayFactory();
let replay = replayFactory.fromSavedToMap_ld2mpi$(
  map,
  "010212171d2324333b3e444f51525b6a6f70757a7c7d7e858c8d90949ca0a1a5aab8bbbdcacbd5d7dadee0e1e4e8e9f7f8f9ff",
  "Pf1Pe1Pd1Pf2Pf0Pe0Pd2Pd0Pe2P11P20P12P02P52P33P43P23P51P00P01P44P45P61P71P70P03P24P15P63P62P80Pa1Pa0Pb1P91P90Pb0P60P50P35P34Pa2P25P53P14P81P13Pb2P92P54P55P17P18P16P27P26P07P06P08P28P85P95P96Pa4P94Pa5Pb6P75P76P86Pb4Pb5P93Pa6P74Pa3P66P65P84P64P83P73P58P6aP7aP3bP5bPaaPb8P1dP1eP7bP7cP6cP8bP8cP6dP9bP9cP9dP7dP5eP6eP7eP5fP6fP3eP3fP4fP4cP8fPaePadP8dPbdPcePccPbbPcaPc9Pd9Pe8Pe9Pd8Pc8PdaPd7Pf8Pf7PcdPdcPddPde"
);
console.log(replay);
replay.setPosition_za3lpa$(42);

function createGame() {
  let game = gameTools.createGame({ gameId: "REPLAY", yourIndex: -1 });
  gameTools.addPlayers(game, ["Player 1", "Player 2"]);
  return game;
}

export default {
  name: "Replay",
  components: { GameView },
  data() {
    return {
      position: replay.replayPosition,
      max: replay.length(),
      game: createGame(),
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
