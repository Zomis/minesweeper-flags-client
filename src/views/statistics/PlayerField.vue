<template>
  <div>
    <span v-if="query.players === null || query.players.length === 0">
      <router-link :to="clonedQueryWithPlayer">
        {{ player }}
      </router-link>
    </span>
    <span v-else>
      <router-link :to="clonedQueryWithPlayer">
        {{ player }}
      </router-link>
    </span>
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
      } else {
        routerLink.query.players.push(this.player);
      }
      return routerLink;
    }
  }
};
</script>
