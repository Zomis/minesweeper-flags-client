<template>
  <div>
    This is start screen
    <v-btn @click="authenticateGuest()">Guest {{ guestName }}</v-btn>
    <v-btn color="info" @click="authenticate('github')">Github</v-btn>
    <v-btn color="info" @click="authenticate('google')">Google</v-btn>
    <v-btn color="info" @click="authenticate('facebook')">Facebook</v-btn>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  props: ["logout"],
  data() {
    let guestName = Math.floor(Math.random() * 90000) + 10000;
    if (typeof localStorage.guestName === "undefined") {
      localStorage.guestName = guestName;
    } else {
      guestName = localStorage.guestName;
    }
    return {
      guestName: guestName
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.logout) {
        this.$store.dispatch("socket/connect");
        this.autoLogin();
      } else {
        this.$store.dispatch("socket/disconnect");
        this.$store.dispatch("socket/connect");
        delete localStorage.lastUsedProvider;
      }
    });
  },
  watch: {
    loggedIn(newValue) {
      console.log("loggedIn changed to " + newValue);
      if (newValue !== null) {
        this.$router.push("/lobby");
      }
    }
  },
  computed: mapState("socket", ["loggedIn"]),
  methods: {
    autoLogin() {
      let lastUsedProvider = localStorage.lastUsedProvider;
      if (lastUsedProvider) {
        this.$store.dispatch("socket/login", {
          token: this.$auth.getToken(),
          provider: lastUsedProvider,
          guestName: this.guestName
        });
      }
    },
    authenticateGuest() {
      localStorage.lastUsedProvider = "guest";
      let auth = { provider: "guest", guestName: this.guestName };
      this.$store.dispatch("socket/login", auth);
    },
    authenticate(provider) {
      console.log("trying to authenticate with " + provider);
      this.$auth.authenticate(provider).then(() => {
        console.log("Authenticated with " + provider);
        let auth = {
          token: this.$auth.getToken(),
          provider: provider
        };
        localStorage.lastUsedProvider = provider;
        this.$store.dispatch("socket/login", auth);
      });
    },
    getToken() {
      if (this.$auth.isAuthenticated()) {
        return this.$auth.getToken();
      }
      return false;
    }
  }
};
</script>
