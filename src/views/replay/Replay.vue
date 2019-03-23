<template>
  <v-container fluid>
    <v-layout column fill-height>
      <v-layout row wrap justify-center align-center>
        <v-flex xs1 text-xs-center>{{ position }} / {{ replayLength }}</v-flex>
        <v-flex xs10>
          <v-slider v-model="position" :max="max" :min="0"></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row justify-center align-center>
        <v-btn @click="setPosition(0)">
          <v-icon>skip_previous</v-icon>
        </v-btn>
        <v-btn @click="changePosition(-1)">
          <v-icon>fast_rewind</v-icon>
        </v-btn>
        <v-btn v-if="!running" @click="setRunning(true)">
          <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn v-else @click="setRunning(false)">
          <v-icon>pause</v-icon>
        </v-btn>
        <v-btn @click="changePosition(1)">
          <v-icon>fast_forward</v-icon>
        </v-btn>
        <v-btn @click="setPosition(replayLength)">
          <v-icon>skip_next</v-icon>
        </v-btn>
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

    let map = mapFactory.replay();
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
      running: false,
      timer: null,
      position: replay.replayPosition,
      max: replay.length(),
      game: game,
      replay: replay
    };
  },
  mounted() {
    this.setRunning(true);
  },
  methods: {
    setPosition(position) {
      this.setRunning(false);
      this.position = position;
    },
    changePosition(offset) {
      this.setRunning(false);
      this.position = this.position + offset;
    },
    setRunning(running) {
      this.running = running;
      if (running) {
        this.timer = setInterval(() => {
          this.position = this.position + 1;
          if (this.position === this.replayLength) {
            this.setRunning(false);
          }
        }, 750);
      } else {
        clearInterval(this.timer);
      }
    }
  },
  computed: {
    replayLength() {
      return this.replay.moveHistory.size;
    }
  },
  watch: {
    position(value) {
      this.replay.setPosition(value);
      let moves = this.replay.moveHistory.toArray();
      let lastMoves = this.replay.viewing.players.toArray().map(() => null);
      for (let i = value - 1; i >= 0; i--) {
        let move = moves[i];
        let playerIndex = move.player.index;
        if (lastMoves[playerIndex] === null) {
          lastMoves[playerIndex] = move;
          let playerData = this.game.playerData[playerIndex];
          playerData.lastMove = move;
        }
      }
    }
  }
};
</script>
