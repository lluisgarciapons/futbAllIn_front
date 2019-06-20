<template>
  <v-container>
    <v-layout justify-center>
      <h1 class="title">TEAMS</h1>
    </v-layout>
    <v-layout justify-end>
      <!-- <v-btn flat dark outline color="#C00000">Join a team</v-btn> -->
      <v-btn flat dark outline icon><v-icon>add</v-icon></v-btn>
    </v-layout>
    <v-layout v-if="$apollo.loading" justify-center=""
      ><img src="images/loader.gif" alt="loader"
    /></v-layout>
    <div v-else-if="!$apollo.queries.teams.loading && teams.length !== 0">
      <v-layout v-for="team in teams" :key="team.id">
        <h1>{{ team.name }}</h1>
        <h2>{{ team.short_name }}</h2>
      </v-layout>
    </div>
    <template v-else-if="!$apollo.queries.teams.loading && teams.length === 0">
      <v-layout justify-center>
        <!-- <h3>no teams</h3> -->
        <v-flex>FCB</v-flex>
        <v-flex>FCUbiqum</v-flex>
        <v-flex><v-icon dark color="#C00000">group_add</v-icon></v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

export default {
  apollo: {
    teams: gql`
      query {
        teams {
          id
          name
          short_name
        }
      }
    `
  }
};
</script>

<style>
.title {
  font-weight: 100;
  border-bottom: 4px solid #c00000;
}
</style>
