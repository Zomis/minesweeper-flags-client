<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <HelloWorld/>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2019 Simon Forsberg
        - <a href="https://github.com/Zomis/minesweeper-flags-client">GitHub</a>
        - {{ buildProps.environment }}
        - {{ buildProps.gitBranch }}
        - build {{ buildProps.buildNumber }}
        - commit {{ buildProps.commitHash }}
        - {{ buildProps.timestamp }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  computed: {
    buildProps() {
      return {
        environment: process.env.NODE_ENV,
        timestamp: process.env.VUE_APP_BUILD_TIME,
        buildNumber: process.env.VUE_APP_BUILD_NUMBER,
        commitHash: process.env.VUE_APP_GIT_COMMIT,
        gitBranch: process.env.VUE_APP_GIT_BRANCH
      }
    }
  }
}
</script>
