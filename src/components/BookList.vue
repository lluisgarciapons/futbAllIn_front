<template>
  <div v-if="!$apollo.loading">
    <h3>Welcome Back, {{ user.name }}</h3>
    <ul id="book-list">
      <li v-for="book in books" :key="book.id">{{ book.name }}</li>
    </ul>
  </div>
</template>
<script>
import gql from "graphql-tag";
import { mapGetters } from "vuex";

export default {
  apollo: {
    books: gql`
      query {
        books {
          name
          id
          author {
            name
            age
          }
        }
      }
    `,
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
