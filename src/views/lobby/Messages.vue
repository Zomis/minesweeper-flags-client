<template>
  <div>
    <v-container
      ref="container"
      class="messages"
      :style="theme === 'dark' ? 'background: #37474F' : 'background: #e0e0e0'"
    >
      <template v-for="(item, index) in messages">
        <div
          :key="index"
          :class="!checkYourUser(item) ? 'class-left' : 'class-right'"
        >
          <div v-if="!checkYourUser(item)">
            <b>{{ breakMessage(item.message).player }}</b>
            <div
              class="class-message"
              :class="theme === 'dark' ? 'dark-player' : 'light-player'"
            >
              <span> {{ breakMessage(item.message).message }}</span>
            </div>
            <div style="font-size: 12px">
              {{ item.timestamp.split(",")[1] }}
            </div>
          </div>
          <div v-else>
            <b>{{ breakMessage(item.message).player }}</b>
            <div
              class="class-message"
              :class="theme === 'dark' ? 'dark-enemy' : 'light-enemy'"
            >
              <span> {{ breakMessage(item.message).message }}</span>
            </div>
            <div style="font-size: 12px">
              {{ item.timestamp.split(",")[1] }}
            </div>
          </div>
        </div>
      </template>
    </v-container>

    <v-textarea
      class="pa-1"
      label="Write a message"
      v-model="message"
      @keyup.native.enter="sendMessage"
      style="color: black"
      :style="theme === 'dark' ? 'background: #37474F' : 'background: #E0E0E0'"
      hide-details
    ></v-textarea>
    <v-btn block @click="sendMessage">Send</v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Messages",
  props: ["messages"],
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
    ...mapState("lobby", {
      userPicture(state) {
        let user = state.onlineUsers[this.name];
        return user ? user.picture : null;
      },
    }),
  },
  methods: {
    checkYourUser(item) {
      const checkYourName = this.$store.state.socket.loggedIn;
      return checkYourName === this.breakMessage(item.message).player;
    },
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
  background: #fff;
  color: black;
}

.dark-player {
  background: #e0e0e0;
  color: black;
}

.light-enemy {
  background: #1c85fe;
  color: white;
}

.dark-enemy {
  background: #1c85fe;
}

.class-right {
  text-align: -webkit-right;
}

.class-message {
  width: fit-content;
  padding: 8px;
  border-radius: 16px;
  text-align: start;
}

/* ::v-deep .v-label {
  color: black;
} */
</style>
