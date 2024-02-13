<template>
  <v-container fluid class="padding-mobile">
    <Invites />
    <div class="display-box">
      <div>
        <LobbyBox title="Your Games">
          <div
            class="incomplete-game"
            v-for="(game, index) in incompleteGames"
            :key="index"
          >
            <IncompleteGame :game="game" />
          </div>
        </LobbyBox>

        <LobbyBox title="Online Players" transition="true">
          <template v-for="(user, i) in onlineRealUsers">
            <OnlineUser class="pa-2" :user="user" :key="i" :invite="invite" />
          </template>
        </LobbyBox>

        <LobbyBox title="Online AIs">
          <template v-for="user in onlineAIs">
            <OnlineUser :key="user.userName" :user="user" :invite="invite" />
          </template>
        </LobbyBox>

        <LobbyBox title="Other Games" transition="true">
          <template v-for="(game, index) in lobbyGames">
            <div :key="index">
              <LobbyGame :game="game" />
            </div>
          </template>
        </LobbyBox>
      </div>
      <div>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title class="headline">
              <span>Chat</span>
            </v-toolbar-title>
          </v-toolbar>
          <Messages class="pa-2" @send="sendChat" :messages="messages" />
        </v-card>
      </div>
    </div>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Messages from "./Messages";
import Invites from "./Invites";
import IncompleteGame from "./IncompleteGame";
import LobbyBox from "./LobbyBox";
import LobbyGame from "./LobbyGame";
import OnlineUser from "./OnlineUser";

export default {
  name: "Lobby",
  components: {
    Messages,
    Invites,
    IncompleteGame,
    LobbyBox,
    LobbyGame,
    OnlineUser,
  },
  computed: {
    onlineRealUsers() {
      let users = this.onlineUsers;
      return Object.keys(users)
        .filter((userName) => !userName.startsWith("#AI"))
        .map((key) => users[key])
        .sort((user1, user2) => user1.rating - user2.rating);
    },
    onlineAIs() {
      let users = this.onlineUsers;
      return Object.keys(users)
        .filter((userName) => userName.startsWith("#AI"))
        .map((key) => users[key])
        .sort((user1, user2) => user1.rating - user2.rating);
    },
    ...mapState("games", ["incompleteGames"]),
    ...mapGetters("games", ["activeGame"]),
    ...mapState("lobby", ["messages", "onlineUsers", "lobbyGames"]),
  },
  watch: {
    activeGame(value) {
      if (value) {
        this.$router.push("/activeGame");
      }
    },
  },
  methods: {
    invite(user) {
      this.$store.dispatch("invites/sendInvite", {
        target: user,
        plugin: "PluginClassicGame",
      });
    },
    sendChat(message) {
      this.$store.dispatch("lobby/sendChat", message);
    },
  },
};
</script>
<style scoped>
.small-box {
  transition: all 1.5s;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.display-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

@media (max-width: 767px) {
  .padding-mobile {
    padding: 8px;
  }
  .display-box {
    display: grid;
    grid-template-columns: 1fr;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-leave-active {
  position: absolute;
}
</style>
