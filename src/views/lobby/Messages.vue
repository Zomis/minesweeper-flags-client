<template>
  <div>
    <v-container ref="container" class="messages">
      <template v-for="(item, index) in messages">
        <div
          :key="index"
          :class="!singleElement ? 'class-left' : 'class-right'"
        >
          <div
            v-if="!singleElement"
            class="class-message"
            :class="theme === 'dark' ? 'dark-player' : 'light-player'"
          >
            <div>
              <span style="font-size: 12px">[{{ item.timestamp }}]</span>
              <span> {{ breakMessage(item.message).player }}:</span>
            </div>
            <div>
              <b>{{ breakMessage(item.message).message }}</b>
            </div>
          </div>
          <div
            v-else
            class="class-message"
            :class="theme === 'dark' ? 'dark-enemy' : 'light-enemy'"
          >
            <div>
              <span style="font-size: 12px">[{{ item.timestamp }}]</span>
              <span> {{ breakMessage(item.message).player }}:</span>
            </div>
            <div>
              <b>{{ breakMessage(item.message).message }}</b>
            </div>
          </div>
        </div>
      </template>
    </v-container>

    <v-textarea
      class="message-input pa-2"
      label="Write a message"
      v-model="message"
      @keyup.native.enter="sendMessage"
      style="color: white"
      :style="theme === 'dark' ? 'background: #546e7a' : 'background: #1e88e5'"
      hide-details
    ></v-textarea>
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
    },
  },
  computed: {
    theme: {
      get() {
        return this.$store.state.settings.theme;
      },
      set(value) {
        this.$store.commit("settings/setTheme", value);
      },
    },
  },
  methods: {
    breakMessage(item) {
      const colonIndex = item.indexOf(":");
      if (colonIndex !== -1) {
        const player = item.substring(0, colonIndex).trim();
        const message = item.substring(colonIndex + 1).trim();
        return { player: player, message: message };
      } else {
        console.log("Invalid message");
      }
    },
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
    },
  },
};
</script>
<style scoped>
.messages {
  overflow-y: auto;
  height: 450px;
  line-height: 1.6;
  width: 100%;
  border: 4px solid blue;
  word-break: break-all;
  padding: 12px;
  margin-bottom: 12px;
}

::v-deep ::-webkit-scrollbar {
  background: green;
  width: 0.4rem;
}

::v-deep ::-webkit-scrollbar-thumb {
  background: #cfd9e3;
  border-radius: 1rem;
}

::v-deep ::-webkit-scrollbar-track {
  height: 30rem !important;
}

.light-player {
  background: #1e88e5;
  color: white;
}

.dark-player {
  background: #1e88e5;
}

.light-enemy {
  background: #90a4ae;
  /* color: white; */
}

.dark-enemy {
  background: #546e7a;
}

.class-right {
  text-align: -webkit-right;
}

.class-message {
  width: 80%;
  margin: 6px 0;
  padding: 8px;
  border-radius: 16px;
  text-align: start;
}

::v-deep .v-label {
  color: #fff;
}

::v-deep .v-text-field__slot textarea {
  color: #fff !important;
}
</style>
