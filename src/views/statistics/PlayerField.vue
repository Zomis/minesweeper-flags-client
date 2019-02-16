<template>
  <div>
    <router-link :to="clonedQueryWithPlayer">
      {{ player }}
    </router-link>
  </div>
</template>
<script>
import statsQuery from "./statsQuery";

export default {
  name: "PlayerField",
  props: ["player", "query"],
  computed: {
    clonedQueryWithPlayer() {
      let routerLink = statsQuery.toRouterLink(this.query);
      if (routerLink.query.players === null) {
        routerLink.query.players = [];
      }
      routerLink.query.players.push(this.player);
      if (routerLink.query.players.length >= 2) {
        routerLink.path = "/stats/games";
      }
      return routerLink;
    }
  }
};
</script>
