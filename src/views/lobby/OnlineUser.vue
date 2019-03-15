<template>
  <v-card>
    <v-layout row justify-center align-center class="online-user">
      <v-list-tile class="grow">
        <v-list-tile-avatar>
          <img :src="user.picture" v-if="user.picture" />
          <v-icon large v-else>help</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <span>{{ user.userName }}</span>
        </v-list-tile-content>
        <v-layout align-center justify-end fill-height>
          <v-btn @click="invite(user)" v-if="user.userName !== loggedIn"
            >Challenge</v-btn
          >
          <v-tooltip left v-if="ratingFeature">
            <template v-slot:activator="{ on }">
              <v-icon>show_chart</v-icon>
              <span class="subheading mr-2">1542</span>
            </template>
            <span>Rating</span>
          </v-tooltip>
        </v-layout>
      </v-list-tile>
    </v-layout>
  </v-card>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "OnlineUser",
  props: ["user", "invite"],
  computed: {
    ratingFeature() {
      return process.env.VUE_APP_FEATURE_RATING;
    },
    ...mapState("socket", ["loggedIn"])
  }
};
</script>
