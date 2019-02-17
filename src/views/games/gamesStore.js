import Vue from "vue";

let ROOT = { root: true };

const createField = (x, y) => ({
  x: x,
  y: y,
  clicked: false,
  value: 0,
  mine: false,
  blocked: false,
  clickedBy: null
});

function createMap(width, height) {
  return Array.apply(null, Array(height)).map((_, y) =>
    Array.apply(null, Array(width)).map((_, x) => createField(x, y))
  );
}

export default {
  namespaced: true,
  state: {
    activeGameId: -1,
    activeGames: {}
  },
  getters: {
    activeGame(state) {
      if (state.activeGames.length === 0) {
        return null;
      }
      return state.activeGames[state.activeGameId];
    }
  },
  mutations: {
    mapData(state, data) {
      let game = state.activeGames[data.gameId];
      if (data.type === "turn") {
        game.currentPlayer = parseInt(data.value, 10);
      } else {
        console.log("Unknown Map Data type: " + data.type);
      }
    },
    playerData(state, data) {
      let game = state.activeGames[data.gameId];
      let player = game.players[parseInt(data.playerIndex, 10)];
      if (data.type === "found") {
        player.score = parseInt(data.value, 10);
      } else {
        console.log("Unknown Player Data type: " + data.type);
      }
    },
    fieldData(state, data) {
      let game = state.activeGames[data.gameId];
      let field = game.fields[parseInt(data.y, 10)][parseInt(data.x, 10)];
      if (data.type === "mark" || data.type === "play") {
        let playerIndex = parseInt(data.playerIndex, 10);
        if (playerIndex >= game.players.length) {
          playerIndex = -1;
        }
        if (data.type === "mark") {
          let player = game.players[playerIndex];
          player.lastClicked = {
            x: data.x,
            y: data.y,
            width: 1,
            height: 1
          };
        }

        let fieldType = parseInt(data.values.substring(0, 1), 10);
        let mine = parseInt(data.values.substring(1, 2), 10);
        let value = parseInt(data.values.substring(2), 10);

        field.blocked = fieldType === 2;
        field.clicked = fieldType === 1;
        field.mine = mine === 1;
        field.clickedBy = playerIndex;
        field.value = value;
      } else {
        console.log("Unknown Player Data type: " + data.type);
      }
    },
    setNames(state, data) {
      let players = state.activeGames[data.gameId].players;
      let producer = name => ({
        name: name,
        score: 0,
        lastClicked: null,
        weapons: { B: 1, P: -1 }
      });
      players.push(producer(data.player1));
      players.push(producer(data.player2));
    },
    newGame(state, gameInfo) {
      Vue.set(state.activeGames, gameInfo.gameId, {
        gameId: gameInfo.gameId,
        yourIndex: gameInfo.yourIndex,
        fields: createMap(16, 16),
        minesRemaining: 51,
        width: 16,
        height: 16,
        players: [],
        currentPlayer: 0
      });
      state.activeGameId = gameInfo.gameId;
    }
  },
  actions: {
    makeMove(context, move) {
      console.log(move);
      let gameId = move.game.gameId;
      let weapon = move.weapon;
      context.dispatch(
        "socket/send",
        `WEAP ${gameId} ${move.field.x} ${move.field.y} ${weapon}`,
        ROOT
      );
    }
  }
};
