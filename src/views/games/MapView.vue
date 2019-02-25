<template>
  <div class="map-rect">
    <resize-observer @notify="updateMapRect" />
    <div class="map-square" :style="{height: mapRect + 'px', width: mapRect + 'px'}">
      <div class="map-reset">
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
                    :key="selector.playerIndex"
                    :class="'selector-' + selector.playerIndex"
                    v-bind:style="{ gridArea: selector.y + 1 + '/' + (selector.x + 1) }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FieldView from "./FieldView";
import "vue-resize/dist/vue-resize.css";

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
      highlightedField: null,
      mapRect: 280,
    };
  },
  methods: {
    updateMapRect() {
        this.mapRect = Math.min(this.$el.clientHeight, this.$el.clientWidth);
    },
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

      let func = () => false;
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
.selector {
  width: 100%;
  height: 100%;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.selectors {
    pointer-events: none;
    display: none;
}

.fields {
  grid-template-columns: repeat(16, minmax(16px, 1fr));
  grid-template-rows: repeat(16, minmax(16px, 1fr));
}

/*
I've looked into this, and found the following to work fairly well.
There's some issues with padding and `game {id}` becoming not visible.

The way this works is it keeps the boxes from `.resizable` down to
fill to 100% meaning that `outer-map` (`map-rect`) should be the
exact size of _only the unspecified space_. (Think everything around
`outer-map` is padding, just not specified how much)

The rest is then works as followed.

This class is in charge of two things:

1. Centers `map-square` which `map` will be relative to.
2. Finds the width and the height not being used in the .resizable.
    map-rect.min = max(min(map-rect.height, map-rect.width), 280)

    Some variables will have the comment `map-rect.min` next to them.
    This means they should be set in JS to the value of `map-rect.min`.

    (The max shouldn't be needed, as we specified the minimum below)
*/
.map-rect {
  width: 100%;
  height: 100%;
  min-width: 280px;
  min-height: 280px;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*
Build a square that map will be relative to.
I've not implemented the JS to do this.
If only there were a way to do this in CSS. :(

I've asked a question to see if there is a nicer way to do this:
https://stackoverflow.com/q/54858625
*/
.map-square {
  width: 280px; /* map-rect.min */
  height: 280px; /* map-rect.min */
}

/*
The following is using a mix between the following two answers:
https://stackoverflow.com/a/6615994
https://stackoverflow.com/a/20117454
*/
.map-reset {
  position: relative;
  height: 100%;
  width: 100%;
}

.map-reset:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.map {
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  /* normal box settings here */
  height: 100%;
  border: 12px solid #6d5720;
  border-radius: 12px;
}
</style>
