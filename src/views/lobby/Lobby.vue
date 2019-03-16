<template>
  <v-container fluid>
    <v-layout row wrap align-space-around>
      <Invites />
      <LobbyBox class="xs12 lg6" title="Your Games">
        <SmallBox
          class="xs12 md6 lg4"
          v-for="game in incompleteGames"
          :key="game.gameId"
        >
          <IncompleteGame :game="game" />
        </SmallBox>
      </LobbyBox>

      <LobbyBox class="xs12 lg6" title="Online Players" transition="true">
        <template v-for="(user, i) in onlineRealUsers">
          <SmallBox class="xs12 xl6" :key="i">
            <OnlineUser :user="user" :key="i" :invite="invite" />
          </SmallBox>
        </template>
      </LobbyBox>

      <LobbyBox class="xs12 lg6" title="Online AIs">
        <SmallBox
          class="xs12 xl6"
          v-for="user in onlineAIs"
          :key="user.userName"
        >
          <OnlineUser :user="user" :invite="invite" />
        </SmallBox>
      </LobbyBox>

      <LobbyBox class="xs12 lg6" title="Other Games" transition="true">
        <template v-for="(game, index) in lobbyGames">
          <SmallBox class="xs12 md6 lg4" :key="index">
            <LobbyGame :game="game" />
          </SmallBox>
        </template>
      </LobbyBox>

      <LobbyBox class="xs12" title="Chat">
        <Messages @send="sendChat" :messages="messages" />
      </LobbyBox>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Messages from "./Messages";
import Invites from "./Invites";
import IncompleteGame from "./IncompleteGame";
import LobbyBox from "./LobbyBox";
import SmallBox from "./SmallBox";
import LobbyGame from "./LobbyGame";
import OnlineUser from "./OnlineUser";

export default {
  name: "Lobby",
  components: {
    Messages,
    Invites,
    IncompleteGame,
    LobbyBox,
    SmallBox,
    LobbyGame,
    OnlineUser
  },
  computed: {
    onlineRealUsers() {
      let users = this.onlineUsers;
      return Object.keys(users)
        .filter(userName => !userName.startsWith("#AI"))
        .map(key => users[key]);
    },
    onlineAIs() {
      let users = this.onlineUsers;
      return Object.keys(users)
        .filter(userName => userName.startsWith("#AI"))
        .map(key => users[key]);
    },
    ...mapState("games", ["incompleteGames"]),
    ...mapGetters("games", ["activeGame"]),
    ...mapState("lobby", ["messages", "onlineUsers", "lobbyGames"])
  },
  watch: {
    activeGame() {
      this.$router.push("/activeGame");
    }
  },
  methods: {
    invite(user) {
      this.$store.dispatch("invites/sendInvite", {
        target: user,
        plugin: "PluginClassicGame"
      });
    },
    sendChat(message) {
      this.$store.dispatch("lobby/sendChat", message);
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
