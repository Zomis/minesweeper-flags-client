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
      this.$store.dispatch("statistics/openQuery", query);
    }
  }
};
</script>
