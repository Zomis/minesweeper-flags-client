<template>
  <router-link :to="{ name: 'game', params: { gameId: gameId } }">
    <span>{{ gameId }}</span>
  </router-link>
</template>
<script>
export default {
  name: "GameIdField",
  props: ["gameId"]
};
</script>
