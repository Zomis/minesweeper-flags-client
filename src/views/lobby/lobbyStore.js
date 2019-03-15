let ROOT = { root: true };

function setOnline(state, user) {
  state.onlineUsers[user.userName] = {
    userId: user.userId,
    userName: user.userName,
    picture: user.picture,
    rating: user.rating,
    country: user.country
  };
}

export default {
  namespaced: true,
  state: {
    serverNotifications: [],
    onlineUsers: {},
    messages: []
  },
  mutations: {
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
    sendChat(context, message) {
      context.dispatch("socket/send", "CHAT " + message, ROOT);
    }
  }
};
