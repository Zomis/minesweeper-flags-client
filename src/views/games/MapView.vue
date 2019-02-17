<template>
  <div class="outer-map">
    <div class="map">
      <div class="fields fields-bg">
        <template v-for="y in game.height">
          <FieldView
            v-for="x in game.width"
            :key="'field' + y + '-' + x"
            :onClick="clickedField"
            :field="game.fields[y - 1][x - 1]"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import FieldView from "./FieldView";

export default {
  name: "MapView",
  props: ["game"],
  components: { FieldView },
  methods: {
    clickedField(field) {
      this.$store.dispatch("games/makeMove", {
        game: this.game,
        weapon: "P",
        field: field
      });
    }
  }
};
</script>
<style scoped>
.fields {
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.map {
  width: 1048px;
  height: 1048px;

  position: relative;
  overflow: hidden;
  border: 12px solid #6d5720;
  border-radius: 12px;
  margin: auto;
}

.map .fields {
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(16, 1fr);
}
</style>
