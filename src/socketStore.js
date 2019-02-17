import Vue from "vue";

let socket = null;
let ROOT = { root: true };
let sendOnOpen = [];

import SoundClick from "@/assets/sound/click.mp3";
import SoundMine from "@/assets/sound/mine.mp3";
import SoundInvite from "@/assets/sound/invite.mp3";
import SoundBomb from "@/assets/sound/bomb.mp3";

let audios = {
  mine: () => new Audio(SoundMine),
  invite: () => new Audio(SoundInvite),
  bomb: () => new Audio(SoundBomb),
  field: () => new Audio(SoundClick)
};

const messageTypes = {
  USRK: { commit: "socket/loggedIn", handler: e => e.fullParam },
  CHAT: {
    commit: "lobby/chatMessage",
    extra: e => ({
      timestamp: new Date().toLocaleString(),
      message: e.fullParam
    })
  },
  CONN: {
    commit: "lobby/connected",
    params: ["userName", "rating", "country"]
  },
  NAME: {
    commit: "games/setNames",
    params: ["gameId", "player1", "player2"] // TODO: Fix to support more players, use "e.restParams(1)"
  },
  MDAT: {
    commit: "games/mapData",
    params: ["gameId", "type", "value"]
  },
  PDAT: {
    commit: "games/playerData",
    params: ["gameId", "playerIndex", "type", "value"]
  },
  FDAT: {
    commit: "games/fieldData",
    params: ["gameId", "x", "y", "type", "playerIndex", "values"]
  },
  YEND: {
    commit: "games/yourElimination",
    params: ["gameId", "result"]
  },
  ELIM: {
    commit: "games/playerEliminated",
    params: ["gameId", "name", "score", "winPosition"]
  },
  INVT: {
    commit: "invites/addInvite",
    params: ["host", "plugin"],
    extra: () => ({
      response: null
    })
  },
  INVY: {
    commit: "invites/onInviteResponse",
    params: ["userName"],
    extra: () => ({
      accepted: true
    })
  },
  INVN: {
    commit: "invites/onInviteResponse",
    params: ["userName"],
    extra: () => ({
      accepted: false
    })
  },
  GAME: {
    commit: "games/newGame",
    params: ["gameId", "yourIndex"]
  },
  SEND: {
    commit: "games/changeGameId",
    extra: e => e.fullParam
  },
  USER: {
    commit: "lobby/online",
    params: ["userName", "rating", "country"]
  }
};

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
      let param = event.data.substring(5).trim();
      if (param.charCodeAt(param.length - 1) == 0) {
        param = param.substring(0, param.length - 1);
      }
      let params = param.split(" ");

      let e = {
        fullParam: param,
        params: params
      };

      if (type === "ADIO") {
        audios[param]().play();
        return;
      }

      let handler = messageTypes[type];
      if (typeof handler === "undefined") {
        console.log("No handler for " + type);
        return;
      }

      let data = null;
      if (handler.handler) {
        data = handler.handler(e);
      } else {
        data = {};
        if (handler.extra) {
          data = handler.extra(e);
        }
        if (handler.params) {
          handler.params.forEach(
            (value, index) => (data[value] = e.params[index])
          );
        }
      }

      context.commit(handler.commit, data, ROOT);
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
