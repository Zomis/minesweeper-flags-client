let ROOT = { root: true };

export default {
  namespaced: true,
  state: {
    messages: []
  },
  mutations: {
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
