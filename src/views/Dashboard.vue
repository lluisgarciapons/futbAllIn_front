<template>
  <div>
    <v-layout justify-center align-center white--text>
      <h1 class="dashboard">dash</h1>
      <img class="f-logo" src="/images/f.png" alt="futb-all-in" />
      <h1 class="dashboard">board</h1>
    </v-layout>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      date: new Date()
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
</style>
