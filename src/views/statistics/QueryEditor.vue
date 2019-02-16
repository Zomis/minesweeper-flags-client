<template>
  <div class="query-editor">
    <v-text-field
      label="Players"
      placeholder="#AI_Nightmare"
      v-model="query.players"
    ></v-text-field>
    <v-text-field label="Result type" v-model="query.resultType"></v-text-field>
  </div>
</template>
<script>
export default {
  name: "QueryEditor",
  props: ["query"]
};
</script>
