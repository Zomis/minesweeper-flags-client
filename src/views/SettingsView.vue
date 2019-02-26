<template>
  <v-menu transition="slide-y-transition" offset-y>
    <v-btn slot="activator" flat>
      <v-icon>settings</v-icon>
    </v-btn>
    <v-list>
      <v-slider
        class="slider"
        v-model="volume"
        prepend-icon="volume_up"
        @click:prepend="mute"
      />
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: "SettingsView",
  data() {
    let volume = parseInt(localStorage.volume || "42", 10);
    return {
      previousVolume: volume,
      volume: volume
    };
  },
  watch: {
    volume(value) {
      localStorage.volume = value.toString();
    }
  },
  methods: {
    mute() {
      let previousVolume = this.volume;
      this.volume = this.volume === 0 ? this.previousVolume : 0;
      this.previousVolume = previousVolume;
    }
  }
};
</script>
<style scoped>
.slider {
  margin-right: 12px;
}
</style>
