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
      state.incompleteGames.push(data);
    },
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
        field.isFoundMine = mine === 1;
        field.clickedBy = game.players[playerIndex];
        field.neighboringMines = value;
      } else {
        console.log("Unknown Player Data type: " + data.type);
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
      gameTools.addPlayers(game, [data.player1, data.player2]);
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
    resume(context, gameId) {
      context.dispatch("socket/send", "RESU " + gameId, ROOT);
    },
    makeMove(context, move) {
      if (!move.game.clickable) {
        return;
      }
      console.log(move);
      let gameId = move.game.gameId;
      let weapon = move.weapon.key;
      context.dispatch(
        "socket/send",
        `WEAP ${gameId} ${move.field.x} ${move.field.y} ${weapon}`,
        ROOT
      );
      let player = move.game.players[move.game.yourIndex];
      if (player.selectedWeapon !== 0) {
        context.commit("selectWeapon", {
          player: player,
          selectedWeapon: 0
        });
      }
    }
  }
};
