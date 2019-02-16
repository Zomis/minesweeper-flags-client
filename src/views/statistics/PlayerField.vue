<template>
  <div>
    <span v-if="query.players === null || query.players.length === 0">
      {{ player }}
    </span>
    <span v-else>
      {{ player }}
    </span>
  </div>
</template>
<script>
export default {
  name: "PlayerField",
  props: ["player", "query"]
};
</script>
