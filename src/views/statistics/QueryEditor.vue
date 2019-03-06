<template>
  <div class="query-editor">
    <div>{{ query }}</div>
    <div>{{ queryBody }}</div>
    <div>{{ queryURL }}</div>
    <v-text-field label="Player" v-model="anotherPlayer"></v-text-field>
    <v-btn @click="addPlayer()">Add</v-btn>

    <v-text-field
      label="Players"
      placeholder="#AI_Nightmare"
      v-for="(player, index) in query.players"
      :key="index"
      v-model="query.players[index]"
    ></v-text-field>
    <v-text-field label="Result type" v-model="query.resultType"></v-text-field>
  </div>
</template>
<script>
import statsQuery from "./statsQuery";
import { mapState } from "vuex";

export default {
  name: "QueryEditor",
  props: ["queryKey"],
  data() {
    return {
      anotherPlayer: ""
    };
  },
  computed: {
    queryBody() {
      return statsQuery.toServerRequestBody(this.query);
    },
    ...mapState("statistics", {
      query(state) {
        return state.queries[this.queryKey].query;
      },
      queryURL(state) {
        let routerLink = statsQuery.toRouterLink(this.query);
        return routerLink.path + "?" + routerLink.query;
      },
      queryEdit(state) {
        return state.queries[this.queryKey].queryEdit;
      }
    })
  },
  methods: {
    addPlayer() {
      this.query.players.push(this.anotherPlayer);
      this.anotherPlayer = "";
    }
  }
};
</script>
