<template>
  <v-content>
    <v-layout fill-height align-center justify-center white--text column>
      <img :src="user.avatar" alt="avatar" class="user-avatar" />
      <h2 class="name">{{ user.username }}</h2>
    </v-layout>
  </v-content>
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
  computed: {
    ...mapGetters("auth", {
      userId: "userId"
    })
  }
};
</script>

<style scoped>
.user-avatar {
  height: 150px;
  border-radius: 50%;
}
.name {
  font-weight: 100;
  letter-spacing: 2px;
}
</style>
