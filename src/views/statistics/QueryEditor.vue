<template>
  <div class="query-editor">
    <v-text-field label="Player" v-model="anotherPlayer"></v-text-field>
    <v-btn @click="addPlayer()">Add</v-btn>

    <v-text-field
      label="Players"
      placeholder="#AI_Nightmare"
      v-for="(player, index) in query.players"
      v-model="query.players[index]"
    ></v-text-field>
    <v-text-field label="Result type" v-model="query.resultType"></v-text-field>
  </div>
</template>
<script>
export default {
  name: "QueryEditor",
  props: ["query"],
  data() {
    return {
      anotherPlayer: ""
    };
  },
  methods: {
    addPlayer() {
      this.query.players.push(this.anotherPlayer);
      this.anotherPlayer = "";
    }
  }
};
</script>
