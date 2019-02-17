import Vue from "vue";

let socket = null;
let ROOT = { root: true };
let sendOnOpen = [];

export default {
  namespaced: true,
  state: {
    connected: false,
    authProvider: null,
    authToken: null,
    loggedIn: false
  },
  mutations: {
    setConnected(state, value) {
      state.connected = value;
    },
    loggedIn(state, value) {
      state.loggedIn = value;
    },
    error(/*state, event*/) {}
  },
  actions: {
    authenticate(context, provider) {
      console.log("trying to authenticate with " + provider);
      Vue.auth.authenticate(provider).then(() => {
        console.log("Authenticated with " + provider);
        let auth = {
          token: Vue.auth.getToken(),
          provider: provider
        };
        context.dispatch("socket/login", auth);
      });
    },
    login(context, auth) {
      console.log("login");
      console.log(auth);
      if (auth.provider === "guest") {
        let userName = "guest_" + auth.guestName;
        context.dispatch("send", "USER 30000 " + userName + " -42 XX");
      }
      // token
    },
    send(context, data) {
      if (socket.readyState === 1) {
        console.log("OUT: " + data);
        socket.send(data);
      } else {
        sendOnOpen.push(data);
      }
    },
    onSocketMessage(context, event) {
      console.log(" IN: " + event.data);
      let type = event.data.substring(0, 4);
      let param = event.data.substring(5);
      let params = param.split(" ");
      if (type === "USRK") {
        // login OK
        context.commit("loggedIn", param.trim());
      }
      if (type === "CHAT") {
        context.commit(
          "lobby/chatMessage",
          {
            timestamp: new Date().toLocaleString(),
            message: param
          },
          ROOT
        );
      }
      if (type === "CONN") {
        context.commit(
          "lobby/connected",
          {
            userName: params[0],
            rating: params[1],
            country: params[2]
          },
          ROOT
        );
      }
      if (type === "USER") {
        context.commit(
          "lobby/online",
          {
            userName: params[0],
            rating: params[1],
            country: params[2]
          },
          ROOT
        );
      }
    },
    connect(context) {
      let url = process.env.VUE_APP_URL + "websocket";
      url = url.replace(/^http/g, "ws");
      socket = new WebSocket(url);
      socket.onopen = e => {
        console.log(e);
        console.log("Connected to " + url);
        context.commit("setConnected", true);
        sendOnOpen.forEach(data => {
          context.dispatch("send", data);
        });
        sendOnOpen = [];
      };
      socket.onmessage = e => {
        context.dispatch("onSocketMessage", e);
      };
      socket.onerror = e => {
        context.commit("error", e);
      };
      socket.onclose = e => {
        console.log(e);
        context.commit("setConnected", false);
      };
    }
  }
};
