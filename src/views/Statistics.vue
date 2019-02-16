<template>
  <div>
    Statistics

    <v-btn @click="request">Fetch</v-btn>

    <v-data-table
      v-if="response && response.summary"
      :headers="headers.summary"
      :items="dataItems"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.player }}</td>
        <td>{{ props.item.playerWins }}</td>
        <td>{{ props.item.oppWins }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Statistics",
  data() {
    return {
      headers: {
        summary: [
          {
            text: "Player",
            align: "left",
            sortable: true,
            value: "player"
          },
          { text: "Player wins", value: "playerWins" },
          { text: "Opponent wins", value: "oppWins" }
        ]
      },
      queryBody: {
        players: ["#AI_Nightmare"],
        plugin: null,
        tags: null,
        withoutTags: null,
        after: null,
        before: null,
        resultType: "summary",
        page: 0,
        pageSize: 100
      },
      response: null
    };
  },
  methods: {
    request() {
      axios
        .post("http://localhost:8082/query", this.queryBody)
        .then(response => (this.response = response.data));
    }
  },
  computed: {
    dataItems() {
      return this.response ? this.response.summary : [];
    }
  }
};
</script>
