<template>
  <Replay :gameId="gameId" :gameInfo="replayData" v-if="replayData !== null" />
  <v-layout v-else-if="error" fill-height justify-center align-center>
    <h1>{{ error }}</h1>
  </v-layout>
  <v-progress-circular indeterminate v-else />
</template>
<script>
import axios from "axios";
import Replay from "../replay/Replay";

export default {
  name: "GameInfoView",
  props: ["gameId"],
  components: { Replay },
  data() {
    return {
      replayData: null,
      error: null
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_URL + "game/" + this.gameId)
      .then(response => {
        if (response.status === 200) {
          this.replayData = response.data;
        } else if (response.status === 204) {
          this.error = "Game not found";
        } else {
          this.error = "HTTP Result " + response.status;
        }
      })
      .catch(err => {
        this.error = err;
      });
  }
};
</script>
