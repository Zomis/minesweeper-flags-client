<template>
  <div>
    <v-container fluid>
      <v-layout column align-center justify-center class="login-options">
        <h1>Minesweeper Flags Extreme</h1>
        <img class="logo" :src="require('@/assets/icon1024.png')" />
        <h2>Choose your login option</h2>
        <v-alert type="error" :value="loginError !== null">{{
          loginError
        }}</v-alert>
        <img
          :src="require('@/assets/logos/google.png')"
          @click="authenticate('google')"
        />
        <img
          :src="require('@/assets/logos/facebook.png')"
          @click="authenticate('facebook')"
        />
        <img
          :src="require('@/assets/logos/github.png')"
          @click="authenticate('github')"
        />
        <v-btn color="info" @click="authenticateGuest()">Guest</v-btn>
      </v-layout>
    </v-container>
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
  computed: mapState("socket", ["loggedIn", "loginError"]),
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
<style scoped>
.logo {
  width: 128px;
  height: 128px;
}

.login-options * {
  margin: 10px;
}
</style>
