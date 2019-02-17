<template>
  <transition name="fade">
    <img
      :src="require(`@/assets/images/classic_${fieldImage}.png`)"
      class="field"
      v-bind:style="{ gridArea: field.y + 1 + '/' + (field.x + 1) }"
      @click="click()"
    />
  </transition>
</template>
<script>
export default {
  name: "FieldView",
  props: ["field", "onClick"],
  methods: {
    click: function() {
      this.onClick(this.field);
    }
  },
  computed: {
    fieldImage() {
      if (this.field.blocked) {
        return "blocked";
      }
      if (!this.field.clicked) {
        return "unknown";
      }
      if (this.field.mine) {
        let actualPlayer = this.field.clickedBy + 1;
        return "m" + actualPlayer;
      }
      return this.field.value;
    }
  }
};
</script>
<style scoped>
.field {
  width: 64px;
  height: 64px;
}
</style>
