<template>
  <div class="lobby">
    <v-container
      id="message-container"
      grid-list-md
      text-xs-left
      class="messages"
    >
      <v-layout id="message-content" row wrap>
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
  watch: {
    messages(val) {
      this.$nextTick(() => {
        let container = document.getElementById("message-container");
        container.scrollTop = container.scrollHeight;
      });
    }
  },
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
