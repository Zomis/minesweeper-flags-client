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
                weapon.displayName
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
      activeWeaponIndex: 0
    };
  },
  watch: {
    activeWeaponIndex(value) {
      this.$store.commit("games/selectWeapon", {
        player: this.player,
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
