<template>
  <div>
    <v-navigation-drawer
      class="drawer"
      v-model="drawer"
      width="250"
      clipped
      fixed
      app
      dark
    >
      <v-list dense class="pa-2">
        <v-list-tile v-if="!$apollo.loading" avatar>
          <v-list-tile-avatar>
            <img :src="user.avatar" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ user.username }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider />
      <v-list dense>
        <v-list-tile to="/dashboard">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-spacer></v-spacer>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout()">
          <v-list-tile-action>
            <v-icon>logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
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
      <v-btn icon to="/createPlayer">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn icon to="/profile">
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import gql from "graphql-tag";

export default {
  data() {
    return {
      drawer: null
    };
  },
  apollo: {
    user: {
      query: gql`
        query getUser($id: ID!) {
          user(id: $id) {
            id
            username
            avatar
          }
        }
      `,
      variables() {
        return { id: this.userId };
      }
    }
  },
  methods: {
    ...mapActions("auth", {
      logout: "logout"
    })
  },
  computed: {
    ...mapGetters("auth", {
      userId: "userId"
    })
  }
};
</script>
<style scoped>
.drawer {
  display: flex;
  flex-direction: column;
}

.toolbar-title-logo {
  height: 40px;
}
.toolbar-f-logo {
  height: 40px;
}
</style>

