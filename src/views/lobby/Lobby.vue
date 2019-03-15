<template>
  <v-layout row wrap>
    <Invites />
    <v-flex xs12 lg6 fill-height>
      <v-container grid-list-md>
        <v-layout column>
          <v-card xs12 lg6>
            <v-toolbar color="primary" dark>
              <v-toolbar-title class="headline">
                <span>Your Games</span>
              </v-toolbar-title>
            </v-toolbar>
            <v-layout row wrap>
              <v-flex
                xs6
                lg3
                v-for="game in incompleteGames"
                :key="game.gameId"
              >
                <v-card xs12>
                  <IncompleteGame :game="game" />
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex xs12 lg6 fill-height>
      <v-container grid-list-md xs12 lg6>
        <v-layout column>
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title class="headline">
                <span>Online Players</span>
              </v-toolbar-title>
            </v-toolbar>
            <v-layout row wrap>
              <v-flex
                class="box"
                xs6
                lg6
                v-for="user in onlineUsers"
                :key="user.userName"
              >
                <v-layout row justify-center align-center>
                  <v-list-tile class="grow">
                    <v-list-tile-avatar>
                      <img :src="user.picture" v-if="user.picture" />
                      <v-icon large v-else>help</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <span>{{ user.userName }}</span>
                    </v-list-tile-content>
                    <v-layout align-center justify-end fill-height>
                      <v-btn
                        @click="invite(user)"
                        v-if="user.userName !== loggedIn"
                        >Challenge</v-btn
                      >
                      <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-icon>show_chart</v-icon>
                          <span class="subheading mr-2">1542</span>
                        </template>
                        <span>Rating</span>
                      </v-tooltip>
                    </v-layout>
                  </v-list-tile>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-layout>
      </v-container>
    </v-flex>
    <v-container fluid>
      <v-layout column>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title class="headline">
              <span>Messages</span>
            </v-toolbar-title>
          </v-toolbar>
          <Messages @send="sendChat" :messages="messages" />
        </v-card>
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Messages from "./Messages";
import Invites from "./Invites";
import IncompleteGame from "./IncompleteGame";

export default {
  name: "Lobby",
  components: { Messages, Invites, IncompleteGame },
  computed: {
    ...mapState("socket", ["loggedIn"]),
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
