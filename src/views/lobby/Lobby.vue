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

      <LobbyBox class="xs12 lg6" title="Online Players">
        <SmallBox
          class="xs12 xl6"
          v-for="user in onlineUsers"
          :key="user.userName"
        >
          <OnlineUser :user="user" :invite="invite" />
        </SmallBox>
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
import OnlineUser from "./OnlineUser";

export default {
  name: "Lobby",
  components: {
    Messages,
    Invites,
    IncompleteGame,
    LobbyBox,
    SmallBox,
    OnlineUser
  },
  computed: {
    ...mapState("games", ["incompleteGames"]),
    ...mapGetters("games", ["activeGame"]),
    ...mapState("lobby", ["messages", "onlineUsers"])
  },
  watch: {
    activeGame(value) {
      this.$router.push("/games/" + value.gameId);
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
