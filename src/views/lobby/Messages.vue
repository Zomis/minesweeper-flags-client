<template>
  <div>
    <v-container ref="container" grid-list-md text-xs-left class="messages">
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
      @keyup.native="keyPress()"
    ></v-text-field>
    <v-btn @change="sendMessage()">Send</v-btn>
  </div>
</template>
<script>
export default {
  name: "Messages",
  props: ["messages"],
  data() {
    return { message: "" };
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        let container = this.$refs.container;
        container.scrollTop = container.scrollHeight;
      });
    }
  },
  methods: {
    keyPress() {
      if (event.keyCode !== 13) {
        return;
      }
      this.sendMessage();
    },
    sendMessage() {
      if (this.message.trim().length === 0) {
        return;
      }
      this.$emit("send", this.message);
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
