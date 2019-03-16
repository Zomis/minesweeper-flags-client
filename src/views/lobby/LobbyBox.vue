<template>
  <v-flex>
    <v-container fluid grid-list-md>
      <v-layout column>
        <v-card xs12 lg6>
          <v-toolbar color="primary" dark>
            <v-toolbar-title class="headline">
              <span>{{ title }}</span>
            </v-toolbar-title>
          </v-toolbar>
          <transition-group
            v-if="transition"
            name="fade"
            tag="div"
            class="layout row wrap transition-tool"
          >
            <slot></slot>
          </transition-group>
          <v-layout v-else row wrap>
            <slot></slot>
          </v-layout>
        </v-card>
      </v-layout>
    </v-container>
  </v-flex>
</template>
<script>
export default {
  name: "LobbyBox",
  props: ["title", "transition"]
};
</script>
