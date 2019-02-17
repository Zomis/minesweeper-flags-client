<template>
  <div class="lobby">
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <template v-for="(item, index) in messages">
          <v-flex xs2 :key="'time-' + index">
            {{ item.timestamp }}
          </v-flex>
          <v-flex xs10 :key="'message-' + index">
            {{ item.message }}
          </v-flex>
        </template>
      </v-layout>
    </v-container>
    <v-text-field
      label="Message"
      v-model="message"
      placeholder="Write a message"
      @keyup.native="sendChat()"
    ></v-text-field>
    <v-btn @change="sendChat()">Send</v-btn>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Lobby",
  data() {
    return {
      message: ""
    };
  },
  computed: mapState("lobby", ["messages"]),
  methods: {
    sendChat() {
      if (event.keyCode !== 13) {
        return;
      }
      if (this.message.trim().length === 0) {
        return;
      }
      this.$store.dispatch("lobby/sendChat", this.message);
      this.message = "";
    }
  }
};
</script>
<style scoped>
.messages {
  height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
