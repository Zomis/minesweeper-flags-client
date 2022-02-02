<template>
  <v-app :dark="theme === 'dark'">
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span class="text-uppercase">Minesweeper Flags Extreme</span>
        <span v-if="loggedIn"> - {{ loggedIn }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <SettingsView />
      <v-btn v-if="statistics" flat to="/stats/summary">
        <span class="mr-2">Statistics</span>
      </v-btn>
      <v-btn flat to="/lobby">
        <span class="mr-2">Lobby</span>
      </v-btn>
      <v-btn flat to="/logout">
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-snackbar
        v-model="snackbarDisconnected"
        color="warning"
        :timeout="5000"
        top
      >
        Disconnected from server
        <v-btn dark flat @click="snackbarDisconnected = false">
          Close
        </v-btn>
      </v-snackbar>
      <v-snackbar
        v-model="serverNotification"
        color="info"
        :timeout="30000"
        top
        auto-height
        multi-line
        vertical
      >
        <div v-for="(notification, index) in serverNotifications" :key="index">
          {{ notification }}
        </div>
        <v-btn dark flat @click="serverNotification = false">
          Close
        </v-btn>
      </v-snackbar>

      <router-view />
    </v-content>
    <v-footer fixed app>
      <span
        >&copy; 2019-2022 Simon Forsberg -
        <a href="https://github.com/Zomis/minesweeper-flags-client" target="_blank">GitHub</a> -
        {{ buildProps.environment }} - {{ buildProps.gitBranch }} - build
        {{ buildProps.buildNumber }} - commit {{ buildProps.commitHash }} -
        {{ buildProps.timestamp }}
      </span>
    </v-footer>
  </v-app>
</template>
<script>
import SettingsView from "./views/SettingsView";
import { mapState } from "vuex";

export default {
  name: "App",
  components: { SettingsView },
  data() {
    return {
      serverNotification: false,
      snackbarDisconnected: false
    };
  },
  watch: {
    serverNotifications(value) {
      if (value.length > 0) {
        this.serverNotification = true;
      }
    },
    serverNotification(value) {
      if (!value) {
        this.$store.commit("lobby/clearServerNotifications");
      }
    },
    connected(value) {
      console.log("connected is now " + value);
      if (!value) {
        this.snackbarDisconnected = true;
      }
    }
  },
  computed: {
    ...mapState("settings", ["theme"]),
    ...mapState("socket", ["loggedIn", "connected"]),
    ...mapState("lobby", ["serverNotifications"]),
    statistics() {
      return process.env.VUE_APP_FEATURE_STATISTICS;
    },
    buildProps() {
      return {
        environment: process.env.NODE_ENV,
        timestamp: process.env.VUE_APP_BUILD_TIME,
        buildNumber: process.env.VUE_APP_BUILD_NUMBER,
        commitHash: process.env.VUE_APP_GIT_COMMIT
          ? process.env.VUE_APP_GIT_COMMIT.substring(0, 8)
          : "",
        gitBranch: process.env.VUE_APP_GIT_BRANCH
      };
    }
  }
};
</script>
