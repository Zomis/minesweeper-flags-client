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
          <div v-if="singleElement">
            [{{ item.timestamp }}] {{ item.message }}
          </div>
          <template v-else>
            <v-flex xs4 lg2 :key="'time-' + index">
              {{ item.timestamp }}
            </v-flex>
            <v-flex xs8 lg10 :key="'message-' + index">
              {{ item.message }}
            </v-flex>
          </template>
        </template>
      </v-layout>
    </v-container>
    <v-text-field
      class="message-input"
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
  props: ["messages", "singleElement"],
  data() {
    return { message: "" };
  },
  mounted() {
    this.scrollToBottom();
  },
  watch: {
    messages() {
      this.scrollToBottom();
    }
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        let container = this.$refs.container;
        container.scrollTop = container.scrollHeight;
      });
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
  margin-left: -5px;
}
.message-input {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
