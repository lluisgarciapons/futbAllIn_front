<template>
  <div v-if="!$apollo.queries.user.loading">
    <no-player-alert v-if="user.player === null" />
    <v-container>
      <v-layout justify-center align-center white--text mb-3>
        <h1 class="dashboard">dash</h1>
        <img class="f-logo" src="/images/f.png" alt="futb-all-in" />
        <h1 class="dashboard">board</h1>
      </v-layout>
      <v-layout v-if="$apollo.loading" justify-center=""
        ><img src="images/loader.gif" alt="loader"
      /></v-layout>

      <v-layout v-else wrap white--text>
        <v-flex><h3 class="matches-title">TODAY'S MATCHES</h3></v-flex>
        <v-flex xs12 v-for="match in dayMatches" :key="match.id">
          <v-match :match="match"></v-match>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapGetters } from "vuex";
import MatchCard from "../components/MatchCard";
import NoPlayerAlert from "../components/NoPlayerAlert";

export default {
  components: {
    "v-match": MatchCard,
    "no-player-alert": NoPlayerAlert
  },
  data() {
    return {
      // date: new Date()
      date: new Date("2019-06-02T22:01:43.985Z")
    };
  },
  apollo: {
    books: gql`
      query {
        books {
          name
          id
          genre
          author {
            name
            age
          }
        }
      }
    `,
    matches: gql`
      query {
        matches {
          date
          teams {
            name
          }
        }
      }
    `,
    dayMatches: {
      query: gql`
        query dayMatches($date: String!) {
          dayMatches(date: $date) {
            date
            teams {
              id
              name
              short_name
            }
          }
        }
      `,
      variables() {
        return { date: this.date };
      }
    },
    user: {
      query: gql`
        query getUser($id: ID!) {
          user(id: $id) {
            id
            name
            player {
              id
              username
            }
          }
        }
      `,
      variables() {
        return { id: this.userId };
      }
    }
  },
  computed: {
    ...mapGetters("auth", {
      userId: "userId"
    })
  }
};
</script>

<style scoped>
.f-logo {
  height: 100px;
}
.dashboard {
  font-weight: 100;
  border-bottom: 4px solid #c00000;
}
.matches-title {
  font-weight: 200;
}
</style>
