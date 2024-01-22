<template>
  <v-card dark>
    <v-container
      fluid
      class="player-view pa-0"
      :class="[isMyTurn ? 'active' : '', 'player' + index]"
    >
      <div class="pa-2 display-grid">
        <div>
          <img
            :src="userPicture"
            style="border-radius: 50px"
            width="24px"
            height="24px"
            v-if="userPicture"
          />
          <v-icon large v-else>help</v-icon>
          <span> {{ name }} - {{ score }} </span>
        </div>
        <div v-if="playerData.controllable">
          <v-btn-toggle v-model="activeWeaponIndex" mandatory>
            <v-btn v-for="(weapon, index) in playerWeapons" :key="index">
              {{ weaponNames[weapon.key.c] }}
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
    </v-container>
    <div></div>
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
        66: "Bomb", // 66 = char 'B' = 'Bomb'
      },
      activeWeaponIndex: 0,
    };
  },
  watch: {
    activeWeaponIndex(value) {
      this.$store.commit("games/selectWeapon", {
        player: this.playerData,
        selectedWeapon: value,
      });
    },
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
      },
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
    },
  },
};
</script>
<style scoped>
.player-view {
  width: 100%;
  margin-bottom: 10px;
  margin-right: 10px;
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

.display-grid {
  display: grid;
  grid-template-columns: 60% 40%;
}
</style>
