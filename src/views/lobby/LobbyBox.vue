<template>
  <v-card class="mb-4">
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="headline">
        <span>{{ title }}</span>
      </v-toolbar-title>
    </v-toolbar>
    <transition-group
      v-if="transition"
      name="fade"
      tag="div"
      class="class-grid"
    >
      <slot></slot>
    </transition-group>
    <div v-else class="class-grid">
      <slot></slot>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "LobbyBox",
  props: ["title", "transition"],
};
</script>

<style scoped>
.class-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px;
}

@media (max-width: 767px) {
  .class-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 10px;
  }
}
</style>