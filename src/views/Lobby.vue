<template>
  <div class="lobby">
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
                      <v-icon @click="invite(user)">extension</v-icon>
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
import { mapState } from "vuex";
import Messages from "./lobby/Messages";

export default {
  name: "Lobby",
  components: { Messages },
  computed: mapState("lobby", ["messages", "onlineUsers"]),
  methods: {
    sendChat(message) {
      this.$store.dispatch("lobby/sendChat", message);
    }
  }
};
</script>
