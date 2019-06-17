<template>
  <v-container grid-list-xl>
    <v-layout wrap justify-space-between>
      <v-flex xs12 md4>
        <v-form ref="form">
          <v-text-field
            v-model="username"
            :counter="max"
            :rules="rules"
            label="Username"
            color="green"
            dark
          ></v-text-field>
        </v-form>
      </v-flex>

      <v-flex xs12 md6>
        <v-checkbox
          v-model="allowSpaces"
          label="Use same Avatar as Google."
          color="green"
          dark
        ></v-checkbox>
      </v-flex>
      <v-flex xs12>
        <v-btn @click="handleClick()" outline dark color="warning" round
          >CREATE</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    allowSpaces: false,
    match: "Foobar",
    max: 20,
    username: ""
  }),
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
  computed: {
    ...mapGetters("auth", {
      userId: "userId"
    }),
    rules() {
      const rules = [];

      if (this.max) {
        const rule = v =>
          (v || "").length <= this.max ||
          `A maximum of ${this.max} characters is allowed`;

        rules.push(rule);
      }

      return rules;
    }
  },

  watch: {
    match: "validateField",
    max: "validateField",
    model: "validateField"
  },

  methods: {
    validateField() {
      this.$refs.form.validate();
    },
    handleClick() {
      console.log(this.username, this.user.photoURL, this.userId);
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation createPlayer(
              $username: String!
              $avatar: String!
              $userId: ID!
            ) {
              createPlayer(
                username: $username
                avatar: $avatar
                userId: $userId
              ) {
                username
              }
            }
          `,
          // Parameters
          variables: {
            username: this.username,
            avatar: this.user.photoURL,
            userId: this.userId
          },
          refetchQueries: [`getUser`]
        })
        .then(data => {
          console.log(data);
        });
    }
  }
};
</script>

<style>
</style>
