<template>
  <div class="about fill-height">
    <div class="resizable">
      <GameView :game="game" class="minigame" :horizontal="false" />
    </div>
    <div class="resizable horizontal">
      <GameView :game="game" class="minigame" :horizontal="true" />
    </div>
  </div>
</template>
<script>
import GameView from "./games/GameView";
import gameTools from "./games/gameTools";

export default {
  name: "About",
  components: { GameView },
  data() {
    let game = gameTools.createGame({ gameId: 42, yourIndex: 0 });
    gameTools.addPlayers(game, ["Player1", "Player2"]);
    return {
      game: game
    };
  }
};
</script>
<style scoped>
.resizable {
  width: 70vmin;
  height: 70vmin;
  resize: both;
  overflow: auto;
  background-color: #ddf9fd;
  margin: 10px;
}
.resizable.horizontal {
  width: 70vmax;
  height: 70vmax;
}
.minigame {
  height: 100%;
}
</style>
