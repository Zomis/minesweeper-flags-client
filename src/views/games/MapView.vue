<template>
  <div class="outer-map">
    <div class="map">
      <div class="fields fields-bg field-views">
        <template v-for="y in game.height">
          <FieldView
            v-for="x in game.width"
            :key="'field' + y + '-' + x"
            :onClick="clickedField"
            :field="game.fields[y - 1][x - 1]"
          />
        </template>
      </div>
      <div class="fields fields-bg selectors">
        <div
          v-for="selector in selectors"
          class="selector"
          :class="'selector-' + selector.playerIndex"
          v-bind:style="{ gridArea: selector.y + 1 + '/' + (selector.x + 1) }"
        />
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
  },
  computed: {
    selectors() {
      return this.game.players
        .map((player, index) => {
          if (player.lastClicked === null) {
            return null;
          }
          return {
            playerIndex: index,
            x: parseInt(player.lastClicked.x, 10),
            y: parseInt(player.lastClicked.y, 10)
          };
        })
        .filter(s => s !== null);
    }
  }
};
</script>
<style scoped>
.selectors {
  pointer-events: none;
}

.selector {
  width: 64px;
  height: 64px;
  border: 5px solid #000000;
}

.selector-0 {
  border-color: #0000ff;
}

.selector-1 {
  border-color: #ff0000;
}

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
