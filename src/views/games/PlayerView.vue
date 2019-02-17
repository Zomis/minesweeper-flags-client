<template>
  <div>Player {{ player.name }} score: {{ player.score }}</div>
</template>
<script>
export default {
  name: "PlayerView",
  props: ["player"]
};
</script>
