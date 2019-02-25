<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span class="text-uppercase">Minesweeper Flags Extreme</span>
        <span v-if="loggedIn"> - {{ loggedIn }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/">
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn flat to="/stats/summary">
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
      <router-view />
    </v-content>
    <v-footer fixed app>
      <span
        >&copy; 2019 Simon Forsberg -
        <a href="https://github.com/Zomis/minesweeper-flags-client">GitHub</a> -
        {{ buildProps.environment }} - {{ buildProps.gitBranch }} - build
        {{ buildProps.buildNumber }} - commit {{ buildProps.commitHash }} -
        {{ buildProps.timestamp }}
      </span>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState("socket", ["loggedIn"]),
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
