<template>
  <v-card class="player-view">
    <v-card-title primary-title>
      <v-container fluid>
        <v-layout align-center justify-center column>
          <h1>{{ player.name }}</h1>
          <h2>{{ player.score }}</h2>
          <v-card-actions v-if="controllable">
            <v-btn-toggle v-model="activeWeaponIndex" mandatory>
              <v-btn>Click</v-btn>
              <v-btn>Bomb</v-btn>
            </v-btn-toggle>
          </v-card-actions>
        </v-layout>
      </v-container>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  name: "PlayerView",
  props: ["player", "controllable", "onWeaponChange"],
  data() {
    return {
      weapons: ["P", "B"],
      activeWeaponIndex: 0
    };
  },
  watch: {
    activeWeaponIndex(newValue) {
      this.onWeaponChange(this.weapons[newValue]);
    }
  }
};
</script>
<style scoped>
.player-view {
  width: 600px;
}
</style>
