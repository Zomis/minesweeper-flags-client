const createField = (x, y) => ({
  x: x,
  y: y,
  clicked: false,
  value: 0,
  mine: false,
  blocked: false,
  clickedBy: null
});

function addPlayers(game, players) {
  let producer = name => ({
    name: name,
    score: 0,
    lastClicked: null,
    selectedWeapon: 0,
    weapons: [
      {
        key: "P",
        displayName: "Click",
        available: -1
      }, {
        key: "B",
        displayName: "Bomb",
        available: 1
      }
    ]
  });
  players.forEach(playerName => game.players.push(producer(playerName)));
}

function createMap(width, height) {
  return Array.apply(null, Array(height)).map((_, y) =>
    Array.apply(null, Array(width)).map((_, x) => createField(x, y))
  );
}

function createGame(gameInfo) {
  return {
    gameId: gameInfo.gameId,
    yourIndex: parseInt(gameInfo.yourIndex, 10),
    clickable: true,
    fields: createMap(16, 16),
    minesCount: 51,
    width: 16,
    height: 16,
    players: [],
    eliminations: [],
    yourResult: null,
    currentPlayer: 0
  };
}

export default {
  createGame: createGame,
  addPlayers: addPlayers
};
