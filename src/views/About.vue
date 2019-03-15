<template>
  <LocalGame />
</template>
<script>
import GameView from "./games/GameView";
import LocalGame from "./games/LocalGame";
import gameTools from "./games/gameTools";

export default {
  name: "About",
  components: { LocalGame },
  data() {
    let game = gameTools.createGame({ gameId: 42, yourIndex: 0 });
    gameTools.setPlayerNames(game, ["Player1", "Player2"]);
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
