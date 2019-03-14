<template>
  <div class="lobby">
    <Invites />
    <v-container fluid>
      <v-layout align-space-around justify-start column fill-height>
        <div>
          <IncompleteGame
            v-for="game in incompleteGames"
            :game="game"
            :key="game.gameId"
          />
        </div>
        <div>
          <v-container>
            <v-layout :column="$vuetify.breakpoint.smAndDown">
              <v-flex xs12 md8>
                <Messages @send="sendChat" :messages="messages" />
              </v-flex>
              <v-flex xs12 md4>
                <!-- User list -->
                <v-list>
                  <v-list-tile
                    v-for="user in onlineUsers"
                    :key="user.userId"
                    avatar
                  >
                    <v-list-tile-avatar>
                      <v-icon>help</v-icon>
                      <!-- <img :src="user.avatar" /> -->
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="user.userName"
                      ></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            @click="invite(user)"
                            v-if="user.userName !== loggedIn"
                            v-on="on"
                            >extension</v-icon
                          >
                        </template>
                        <span>Challenge!</span>
                      </v-tooltip>
                    </v-list-tile-action>
                  </v-list-tile></v-list
                >
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-layout>
    </v-container>
  </div>
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
