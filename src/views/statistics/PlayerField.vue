<template>
  <div>
    <a @click="clonedQueryWithPlayer()">
      {{ player }}
    </a>
  </div>
</template>
<script>
import statsQuery from "./statsQuery";

export default {
  name: "PlayerField",
  props: ["player", "query"],
  methods: {
    clonedQueryWithPlayer() {
      let query = statsQuery.add(this.query, {
        players: [this.player]
      });
      if (query.players.length >= 2 && query.resultType === "summary") {
        query.resultType = "games";
      }
      this.$store.dispatch("statistics/openQuery", query);
    }
  }
};
</script>
