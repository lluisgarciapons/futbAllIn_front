<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped fixed app dark>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left dark color="black">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-toolbar-title>FUTB-ALL-IN</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <!-- <img class="toolbar-title-logo" src="/images/word-red.png" alt="title" /> -->
      <!-- <img class="toolbar-f-logo" src="/images/f.png" alt="f" /> -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      drawer: null
    };
  }
};
</script>
<style scoped>
.toolbar-title-logo {
  height: 40px;
}
.toolbar-f-logo {
  height: 40px;
}
</style>

