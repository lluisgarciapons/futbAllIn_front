<template>
  <v-container v-if="!$apollo.queries.user.loading" grid-list-xl>
    <v-layout wrap justify-space-between>
      <v-flex xs12 md4>
        <v-form ref="form">
          <v-text-field
            v-model="user.username"
            :counter="max"
            :rules="rules"
            label="Username"
            color="green"
            clearable
            dark
          ></v-text-field>
        </v-form>
      </v-flex>

      <v-flex xs12 md6>
        <h3>Choose your avatar</h3>
        <v-avatars
          :image="user.photoURL"
          @update="onUpdateChild"
          type="avatars"
        ></v-avatars>
      </v-flex>
      <v-flex xs12>
        <v-btn @click="handleClick()" outline dark color="success" round>
          UPDATE
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import { mapGetters } from "vuex";
import AvatarList from "../components/AvatarList";

export default {
  components: {
    "v-avatars": AvatarList
  },
  data: () => ({
    allowSpaces: false,
    match: "Foobar",
    max: 20,
    min: 3,
    avatar: ""
  }),
  apollo: {
    user: {
      query: gql`
        query getUser($id: ID!) {
          user(id: $id) {
            id
            photoURL
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

      if (this.min) {
        const rule = v =>
          (v || "").length >= this.min ||
          `A minimum of ${this.min} characters is required`;

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
    onUpdateChild(avatar) {
      this.avatar = avatar;
    },
    validateField() {
      this.$refs.form.validate();
    },
    handleClick() {
      console.log(this.user.username, this.user.photoURL, this.userId);
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation modifyInfo(
              $username: String!
              $avatar: String!
              $userId: ID!
            ) {
              modifyInfo(
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
            username: this.user.username,
            avatar: this.avatar || this.user.avatar,
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
