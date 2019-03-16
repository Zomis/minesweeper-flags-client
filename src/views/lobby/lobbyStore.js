import Vue from "vue";

let ROOT = { root: true };

function setOnline(state, user) {
  Vue.set(state.onlineUsers, user.userName, {
    userId: user.userId,
    userName: user.userName,
    picture: user.picture,
    rating: user.rating,
    country: user.country
  });
}

export default {
  namespaced: true,
  state: {
    lobbyGames: {},
    serverNotifications: [],
    onlineUsers: {},
    messages: []
  },
  mutations: {
    gameList(state, game) {
      console.log(game);
      if (game.paramsCount === 1) {
        delete state.lobbyGames[game.gameId];
      } else {
        // Message from server is "LIST gameId player1,player2 score1,score2 turn unused"
        // therefore we need to split players and scores.
        let scores = game.scores.split(",");
        let players = game.players.split(",").map((playerName, index) => ({
          playerName: playerName,
          score: scores[index]
        }));
        Vue.set(state.lobbyGames, game.gameId, {
          gameId: game.gameId,
          players: players,
          currentPlayerIndex: parseInt(game.currentPlayerIndex, 10)
        });
      }
    },
    clear(state) {
      state.onlineUsers = {};
      state.messages = [];
    },
    connected(state, data) {
      setOnline(state, data);
      state.messages.push({
        timestamp: new Date().toLocaleString(),
        message: data.userName + " is now online"
      });
    },
    disconnected(state, data) {
      delete state.onlineUsers[data.userName];
      state.messages.push({
        timestamp: new Date().toLocaleString(),
        message: data.userName + " is now offline"
      });
    },
    online(state, data) {
      setOnline(state, data);
    },
    clearServerNotifications(state) {
      state.serverNotifications = [];
    },
    otherChatMessage(state, data) {
      if (data.message.startsWith('<font color="#ff8000">')) {
        data.message = data.message.substring('<font color="#ff8000">'.length);
      }
      if (data.message.startsWith("#Server: ")) {
        data.message = data.message.substring("#Server: ");
        state.serverNotifications.push(data.message);
      }
    },
    notification(state, data) {
      state.serverNotifications.push(data.message);
    },
    chatMessage(state, data) {
      state.messages.push(data);
    }
  },
  actions: {
    observe(context, gameId) {
      context.commit(
        "games/newGame",
        {
          gameId: gameId,
          yourIndex: -1
        },
        ROOT
      );
      context.dispatch("socket/send", "OBSR " + gameId, ROOT);
    },
    sendChat(context, message) {
      context.dispatch("socket/send", "CHAT " + message, ROOT);
    }
  }
};
