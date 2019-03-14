<template>
  <div>
    <v-container
      ref="container"
      grid-list-md
      text-xs-left
      fluid
      class="messages"
    >
      <v-layout id="message-content" row wrap>
        <template v-for="(item, index) in messages">
          <v-flex xs4 lg2 :key="'time-' + index">
            {{ item.timestamp }}
          </v-flex>
          <v-flex xs8 lg10 :key="'message-' + index">
            {{ item.message }}
          </v-flex>
        </template>
      </v-layout>
    </v-container>
    <v-text-field
      label="Message"
      v-model="message"
      placeholder="Write a message"
      @keyup.native.enter="sendMessage"
    ></v-text-field>
    <v-btn @click="sendMessage">Send</v-btn>
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
