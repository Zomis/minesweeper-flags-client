<template>
  <v-card class="player-view">
    <v-card-title primary-title>
      <v-container fluid>
        <v-layout align-center justify-center column>
          <h1>{{ name }}</h1>
          <h2>{{ score }}</h2>
          <v-card-actions v-if="controllable">
            <v-btn-toggle v-model="activeWeaponIndex" mandatory>
              <v-btn v-for="weapon in playerWeapons">{{
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
import { mapState } from "vuex";

export default {
  name: "PlayerView",
  props: ["player", "controllable"],
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
      return this.player ? this.player.weapons : [];
    },
    selectedWeapon() {
      return this.player ? this.player.selectedWeapon : 0;
    },
    name() {
      return this.player ? this.player.name : "???";
    },
    score() {
      return this.player ? this.player.score : 0;
    }
  }
};
</script>
<style scoped>
.player-view {
  width: 100%;
}
</style>
