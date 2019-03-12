<template>
  <Replay :gameId="gameId" :gameInfo="replayData" v-if="replayData !== null" />
  <v-layout
    v-else-if="responseCode === 204"
    fill-height
    justify-center
    align-center
  >
    <h1>Game not found</h1>
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
      responseCode: null
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_URL + "game/" + this.gameId)
      .then(response => {
        if (response.status === 200) {
          this.replayData = response.data;
        } else {
          this.responseCode = response.status;
        }
      });
  }
};
</script>
