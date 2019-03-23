import Vue from "vue";
import gameTools from "./gameTools";

let ROOT = { root: true };

export default {
  namespaced: true,
  state: {
    incompleteGames: [],
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
    selectWeapon(_, data) {
      data.player.selectedWeapon = data.selectedWeapon;
    },
    clear(state) {
      state.incompleteGames = [];
      state.activeGameId = -1;
      state.activeGames = {};
    },
    changeGameId(state, newGameId) {
      // When a game has been saved in database. Order is important here
      let game = state.activeGames[state.activeGameId];
      game.gameId = newGameId;
      Vue.set(state.activeGames, newGameId, game);
      delete state.activeGames[state.activeGameId];
      state.activeGameId = newGameId;
    },
    endGame(state, data) {
      let game = state.activeGames[data.gameId];
      game.clickable = false;
    },
    incomplete(state, data) {
      // params: ["gameId", "players", "scores", "clicks", "lastActive"]
      let existingIndex = state.incompleteGames.indexOf(
        game => game.gameId === data.gameId
      );
      if (existingIndex) {
        state.incompleteGames[existingIndex] = data;
      } else {
        state.incompleteGames.push(data);
      }
    },
    mapData(state, data) {
      let game = state.activeGames[data.gameId];
      if (data.type === "turn") {
        game.map.currentPlayerIndex = parseInt(data.value, 10);
      } else {
        console.warn("Unknown Map Data type: " + data.type);
      }
    },
    playerData(state, data) {
      let game = state.activeGames[data.gameId];
      let player = game.map.players.toArray()[parseInt(data.playerIndex, 10)];
      if (data.type === "found") {
        player.score = parseInt(data.value, 10);
      } else {
        console.warn("Unknown Player Data type: " + data.type);
      }
    },
    fieldData(state, data) {
      let game = state.activeGames[data.gameId];
      let field = game.map.fieldAt(parseInt(data.x, 10), parseInt(data.y, 10));
      if (data.type === "mark" || data.type === "play") {
        let playerIndex = parseInt(data.playerIndex, 10);
        if (playerIndex >= game.playerData.length) {
          playerIndex = -1;
        }
        let move = {
          field: { x: parseInt(data.x, 10), y: parseInt(data.y) },
          player: game.map.players.toArray()[playerIndex]
        };
        if (data.type === "mark") {
          let player = game.playerData[playerIndex];
          player.lastMove = move;
        }

        let fieldType = parseInt(data.values.substring(0, 1), 10);
        let mine = parseInt(data.values.substring(1, 2), 10);
        let value = parseInt(data.values.substring(2), 10);

        let clicked = fieldType === 1;
        field.blocked = fieldType === 2;
        field.setMine(mine === 1);
        field.neighboringMines = value;
        field.clicked = clicked;
        if (clicked) {
          field.activate(move);
        } else {
          field.inactivate();
        }
        field.whoClicked = game.map.players.toArray()[playerIndex];
      } else {
        console.warn("Unknown Player Data type: " + data.type);
      }
    },
    playerEliminated(state, data) {
      let game = state.activeGames[data.gameId];
      game.eliminations.push(data);
    },
    yourElimination(state, data) {
      let game = state.activeGames[data.gameId];
      game.yourResult = data.result;
    },
    setNames(state, data) {
      let game = state.activeGames[data.gameId];
      gameTools.setPlayerNames(game, [data.player1, data.player2]);
    },
    leaveActiveGame(state) {
      state.activeGameId = null;
    },
    newGame(state, gameInfo) {
      // Use gameId as String
      Vue.set(
        state.activeGames,
        gameInfo.gameId,
        gameTools.createGame(gameInfo)
      );
      state.activeGameId = gameInfo.gameId;
    }
  },
  actions: {
    resetSelectedWeapon(context, playerData) {
      if (playerData.selectedWeapon !== 0) {
        context.commit("selectWeapon", {
          player: playerData,
          selectedWeapon: 0
        });
      }
    },
    resume(context, gameId) {
      context.dispatch("socket/send", "RESU " + gameId, ROOT);
    },
    makeMove(context, move) {
      if (!move.game.clickable) {
        return;
      }
      let gamePlayer = move.game.map.currentPlayer;
      let gameId = move.game.gameId;
      let weapon = move.weapon.key;
      context.dispatch(
        "socket/send",
        `WEAP ${gameId} ${move.field.x} ${move.field.y} ${weapon}`,
        ROOT
      );
      let player = move.game.playerData[gamePlayer.index];
      context.dispatch("resetSelectedWeapon", player);
    }
  }
};
