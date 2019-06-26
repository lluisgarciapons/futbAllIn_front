<template>
  <v-container>
    <v-layout justify-center>
      <h1 class="title">TEAMS</h1>
    </v-layout>
    <v-layout justify-end>
      <!-- <v-btn flat dark outline color="#C00000">Join a team</v-btn> -->
      <v-btn flat dark outline round to="/createTeam">+ NEW</v-btn>
    </v-layout>
    <v-layout v-if="$apollo.loading" justify-center>
      <img src="images/loader.gif" alt="loader" />
    </v-layout>
    <div v-else-if="!$apollo.queries.teams.loading && teams.length !== 0">
      <v-layout v-for="team in teams" :key="team.id" align-center>
        <img class="logo" :src="team.avatar" alt="logo" />
        <span class="team-name">{{ team.name }}</span>
        <div class="join-team" v-if="team.public">
          <v-icon dark color="#C00000">group_add</v-icon>
        </div>
      </v-layout>
    </div>
    <template v-else-if="!$apollo.queries.teams.loading && teams.length === 0">
      <v-layout align-center>
        <!-- <h3>no teams</h3> -->
        <img class="logo" src="uploads/teams/111181.png" alt="logo" />
        <span class="team-name">F.C.Ubiqum</span>
        <div class="join-team">
          <v-icon dark color="#C00000">group_add</v-icon>
        </div>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import { mapGetters } from "vuex";

export default {
  apollo: {
    teams: gql`
      query getTeams {
        teams {
          id
          name
          short_name
          avatar
          public
          full
        }
      }
    `
  },
  methods: {
    createNewTeam: function() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation createTeam(
              $name: String!
              $short_name: String!
              $avatar: String!
              $userId: ID!
              $public: Boolean!
            ) {
              createTeam(
                name: $name
                short_name: $short_name
                avatar: $avatar
                userId: $userId
                public: $public
              ) {
                name
              }
            }
          `,
          // Parameters
          variables: {
            name: "Mupidu",
            short_name: "MFC",
            avatar: "uploads/teams/57992.png",
            userId: this.userId,
            public: true
          },
          refetchQueries: [`getTeams`]
        })
        .then(data => {
          console.log(data);
        });
    }
  },
  computed: {
    ...mapGetters("auth", {
      userId: "userId"
    })
  }
};
</script>

<style>
.title {
  font-weight: 100;
  border-bottom: 4px solid #c00000;
}

.logo {
  width: 70px;
}

.team-name {
  font-size: 30px;
  font-weight: lighter;
}

.join-team {
  margin-left: auto;
  margin-right: 20px;
}
</style>
