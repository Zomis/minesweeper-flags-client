<template>
  <v-card
    dark
    class="player-view"
    :class="[isMyTurn ? 'active' : '', 'player' + index]"
  >
    <v-container fluid>
      <v-layout align-center justify-center column>
        <v-layout
          class="container fluid"
          row
          align-center
          justify-space-between
        >
          <v-list-tile-avatar>
            <img
              :src="userPicture"
              width="64px"
              height="64px"
              v-if="userPicture"
            />
            <v-icon large v-else>help</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <h1>{{ name }}</h1>
          </v-list-tile-content>
          <v-layout align-center justify-end fill-height>
            <h2>{{ score }}</h2>
          </v-layout>
        </v-layout>
        <v-card-actions v-if="playerData.controllable">
          <v-btn-toggle v-model="activeWeaponIndex" mandatory>
            <v-btn v-for="(weapon, index) in playerWeapons" :key="index">{{
              weaponNames[weapon.key.c]
            }}</v-btn>
          </v-btn-toggle>
        </v-card-actions>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { mapState } from "vuex";

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
    index() {
      return this.playerData.player.index;
    },
    isMyTurn() {
      return (
        this.playerData.player.index ==
        this.playerData.player.map.currentPlayerIndex
      );
    },
    ...mapState("lobby", {
      userPicture(state) {
        let user = state.onlineUsers[this.name];
        return user ? user.picture : null;
      }
    }),
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

.player0 {
  background-color: blue;
}

.player1 {
  background-color: red;
}

.active {
  animation: glow 1s infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px -10px #aef4af;
  }
  to {
    box-shadow: 0 0 10px 10px #aef4af;
  }
}
</style>
