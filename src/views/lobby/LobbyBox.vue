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
          <v-layout row wrap>
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
  props: ["title"]
};
</script>
