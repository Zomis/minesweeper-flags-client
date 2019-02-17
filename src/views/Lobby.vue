<template>
  <div class="lobby">
    <Invites />
    <v-container fluid>
      <v-layout align-space-around justify-start column fill-height>
        <div>
          <!-- Running games -->
          Some random stuff
        </div>
        <div>
          <v-container fluid>
            <v-layout row>
              <v-flex xs8>
                <Messages @send="sendChat" :messages="messages" />
              </v-flex>
              <v-flex xs4>
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
                      <v-icon
                        @click="invite(user)"
                        v-if="user.userName !== loggedIn"
                        >extension</v-icon
                      >
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
import Messages from "./lobby/Messages";
import Invites from "./lobby/Invites";

export default {
  name: "Lobby",
  components: { Messages, Invites },
  computed: {
    ...mapState("socket", ["loggedIn"]),
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
