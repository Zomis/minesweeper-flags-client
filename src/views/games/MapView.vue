<template>
  <div class="outer-map">
    <div class="map">
      <div class="fields fields-bg field-views">
        <template v-for="y in game.height">
          <FieldView
            v-for="x in game.width"
            :key="'field' + y + '-' + x"
            :onClick="clickedField"
            :highlighted="highlightedFields[y - 1][x - 1]"
            :onHighlight="onHighlight"
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

function ensureRange(low, value, high) {
  if (value < low) {
    return low;
  }
  if (value > high) {
    return high;
  }
  return value;
}

export default {
  name: "MapView",
  props: ["game", "highlightWeapon"],
  components: { FieldView },
  data() {
    return {
      highlightedField: null
    };
  },
  methods: {
    onHighlight(field) {
      this.highlightedField = field;
    },
    clickedField(field) {
      this.$store.dispatch("games/makeMove", {
        game: this.game,
        weapon: this.highlightWeapon,
        field: field
      });
    }
  },
  computed: {
    highlightedFields() {
      let weapon = this.highlightWeapon;
      let range = weapon == "P" ? 0 : 2;

      let func = (x, y) => false;
      let field = this.highlightedField;
      if (field !== null) {
        let fieldX = ensureRange(range, field.x, this.game.width - range - 1);
        let fieldY = ensureRange(range, field.y, this.game.height - range - 1);
        field = this.game.fields[fieldY][fieldX];
        func = (x, y) => {
          if (field == null) {
            return false;
          }
          let distance = Math.max(Math.abs(x - field.x), Math.abs(y - field.y));
          return distance <= range;
        };
      }

      let result = Array.apply(null, Array(this.game.height)).map((_, y) =>
        Array.apply(null, Array(this.game.width)).map((_, x) => func(x, y))
      );
      return result;
    },
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
