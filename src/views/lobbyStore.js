let ROOT = { root: true };

function setOnline(state, user) {
  state.onlineUsers[user.userName] = {
    userId: user.userName,
    userName: user.userName,
    avatar: "",
    rating: user.rating,
    country: user.country
  };
}

export default {
  namespaced: true,
  state: {
    onlineUsers: {},
    messages: []
  },
  mutations: {
    connected(state, data) {
      setOnline(state, data);
      state.messages.push({
        timestamp: new Date().toLocaleString(),
        message: data.userName + " is now online"
      });
    },
    online(state, data) {
      setOnline(state, data);
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
