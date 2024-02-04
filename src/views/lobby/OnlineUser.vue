<template>
  <v-card>
    <v-list-tile>
      <v-list-tile-avatar>
        <img :src="user.picture" v-if="user.picture" />
        <v-icon large v-else>help</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <span>{{ user.userName }}</span>
      </v-list-tile-content>
      <v-tooltip left v-if="ratingFeature">
        <template v-slot:activator="{ on }">
          <v-icon>show_chart</v-icon>
          <span class="subheading mr-2">{{ user.rating }}</span>
        </template>
        <span>Rating</span>
      </v-tooltip>
      <v-btn @click="invite(user)" v-if="user.userName !== loggedIn"
        >Challenge
      </v-btn>
    </v-list-tile>
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
    ...mapState("socket", ["loggedIn"]),
  },
};
</script>

<style scoped>
@media (max-width: 767px) {
  ::v-deep .v-list__tile {
    padding: 0 4px;
  }
}
</style>