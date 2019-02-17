<template>
  <div class="lobby">
    <v-container fluid>
      <v-layout align-space-around justify-start column fill-height>
        <div>Some random stuff</div>
        <div>
          <v-container fluid>
            <v-layout row>
              <v-flex grow>
                <Messages @send="sendChat" :messages="messages" />
              </v-flex>
              <v-flex xs4>
                Some more stuff
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
  computed: mapState("lobby", ["messages"]),
  methods: {
    sendChat(message) {
      this.$store.dispatch("lobby/sendChat", message);
    }
  }
};
</script>
