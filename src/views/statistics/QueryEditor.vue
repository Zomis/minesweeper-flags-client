<template>
  <div class="query-editor">
    <div>{{ query }}</div>
    <div>{{ queryBody }}</div>
    <div>{{ queryURL }}</div>

    <!--
      Each search condition here, with a delete button.<br />
      Some fields to modify/add more conditions<br />

      REQUIRED ComboBox:<br />
      resultType: nullIfEmpty(params.resultType),<br />

      chip players: listify(params.players),<br />
      chip tags: listify(params.tags),<br />
      chip withoutTags: listify(params.withoutTags),<br />

      ComboBox plugin: nullIfEmpty(params.plugin),<br />
      TimeSelector before: nullIfEmpty(params.before),<br />
      TimeSelector after: nullIfEmpty(params.after),<br />

      Controlled by pagination:<br />
      page: nullIfEmpty(params.page),<br />
      pageSize: nullIfEmpty(params.pageSize)<br />
-->

    <v-chip
      v-for="(filter, index) in searchFilters"
      close
      @input="removeFilter(filter)"
      :key="index"
    >
      <span>({{ filter.type }})&nbsp;</span>
      <strong>{{ filter.name }}</strong>
    </v-chip>

    <v-combobox
      v-model="queryEdit.resultType"
      :items="['summary', 'games']"
      label="Result type"
    >
    </v-combobox>
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
    queryURL() {
      let routerLink = statsQuery.toRouterLink(this.query);
      return routerLink.path + "?" + routerLink.query;
    },
    searchFilters() {
      let query = this.queryEdit;
      let players = query.players.map(player => ({
        type: "player",
        name: player
      }));
      let withTags = query.tags.map(tag => ({ type: "tag", name: tag }));
      let withoutTags = query.withoutTags.map(tag => ({
        type: "without-tag",
        name: tag
      }));
      return players.concat(withTags).concat(withoutTags);
    },
    queryBody() {
      return statsQuery.toServerRequestBody(this.query);
    },
    ...mapState("statistics", {
      query(state) {
        return state.queries[this.queryKey].query;
      },
      queryEdit(state) {
        return state.queries[this.queryKey].queryEdit;
      }
    })
  },
  methods: {
    removeFilter(filter) {
      let queryCopy = statsQuery.copyQuery(this.queryEdit);
      let filterTypeToObjectKey = {
        player: "players",
        tag: "tags",
        "without-tag": "withoutTags"
      };
      let objectKey = filterTypeToObjectKey[filter.type];
      let array = queryCopy[objectKey];
      array.splice(array.indexOf(filter.name), 1);
      this.$store.dispatch("statistics/openQuery", queryCopy);
    }
  }
};
</script>
