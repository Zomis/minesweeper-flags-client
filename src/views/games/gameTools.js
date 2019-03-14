import Kotlin from "kotlin";
let coreLib = require("../../kotlin/minesweeper-core");
let core = coreLib.default.net.zomis.minesweeper.core;
console.log(core);
let mapFactory = new core.MapFactory();

function setPlayerNames(game, players) {
  players.forEach((playerName, index) => {
    game.map.players.toArray()[index].controller.name = playerName;
  });
}

function createGame(gameInfo) {
  let map = mapFactory.classic(16);
  map.placeMines(51, Kotlin.kotlin.random.Random.Default);
  map.recount();
  let index = parseInt(gameInfo.yourIndex, 10);
  return {
    gameId: gameInfo.gameId,
    lastMoves: [null, null],
    controllable: [index === 0, index === 1],
    clickable: true,
    eliminations: [],
    yourResult: null,
    map: map
  };
}

function createPlayer(map, playerIndex) {
  return {
    player: map.players.toArray()[playerIndex],
    lastMove: null,
    selectedWeapon: 0,
    controllable: true
  };
}

function createLocalGame() {
  let map = mapFactory.classic(16);
  map.placeMines(51, Kotlin.kotlin.random.Random.Default);
  map.recount();
  return {
    gameId: 0,
    playerData: [createPlayer(map, 0), createPlayer(map, 1)],
    clickable: true,
    eliminations: [],
    yourResult: null,
    map: map
  };
}

export default {
  createGame: createGame,
  createLocalGame: createLocalGame,
  setPlayerNames: setPlayerNames
};
