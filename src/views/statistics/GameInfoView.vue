<template>
  <Replay :gameId="gameId" :gameInfo="data" v-if="data !== null" />
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
      data: null
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_URL + "game/" + this.gameId)
      .then(response => {
        this.data = response.data;
      });
  }
};
</script>
