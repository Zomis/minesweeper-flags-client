<template>
  <div>
    This is start screen
    <v-btn @click="authenticateGuest()">Guest {{ guestName }}</v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  props: [],
  data() {
    return {
      guestName: null
    };
  },
  mounted() {
    this.$store.dispatch("socket/connect");

    let lastUsedProvider = localStorage.lastUsedProvider;
    if (typeof localStorage.guestName === "undefined") {
      localStorage.guestName =
        "v" + (Math.floor(Math.random() * 90000) + 10000);
    }
    this.guestName = localStorage.guestName;
    if (this.lastUsedProvider !== null) {
      this.$store.dispatch("socket/login", {
        provider: lastUsedProvider,
        guestName: this.guestName
      });
    }
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
    authenticateGuest: function() {
      localStorage.lastUsedProvider = "guest";
      let auth = { provider: "guest" };
      this.$store.dispatch("socket/login", auth);
    },
    authenticate: function(provider) {
      localStorage.lastUsedProvider = provider;
      this.$store.dispatch("socket/authenticate", provider);
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
