<template>
  <v-card class="player-view">
    <v-card-title primary-title>
      <v-container fluid>
        <v-layout align-center justify-center column>
          <h1>{{ name }}</h1>
          <h2>{{ score }}</h2>
          <v-card-actions v-if="playerData.controllable">
            <v-btn-toggle v-model="activeWeaponIndex" mandatory>
              <v-btn v-for="(weapon, index) in playerWeapons" :key="index">{{
                weaponNames[weapon.key.c]
              }}</v-btn>
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
  props: ["playerData"],
  data() {
    return {
      weaponNames: {
        80: "Click", // 80 = char 'P' = 'Play' = Regular move
        66: "Bomb" // 66 = char 'B' = 'Bomb'
      },
      activeWeaponIndex: 0
    };
  },
  watch: {
    activeWeaponIndex(value) {
      this.$store.commit("games/selectWeapon", {
        player: this.playerData,
        selectedWeapon: value
      });
    }
  },
  computed: {
    playerWeapons() {
      return this.playerData.player.weapons.toArray();
    },
    selectedWeapon() {
      return this.playerData.selectedWeapon;
    },
    name() {
      return this.playerData.player.controller.name;
    },
    score() {
      return this.playerData.player.score;
    }
  }
};
</script>
<style scoped>
.player-view {
  width: 100%;
}
</style>
