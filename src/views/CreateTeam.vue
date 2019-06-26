<template>
  <v-container grid-list-xl>
    <v-layout wrap justify-space-between>
      <v-flex xs12 md4>
        <v-form ref="form">
          <v-text-field
            v-model="teamName"
            :counter="max"
            :rules="nameRules"
            label="Team name"
            color="green"
            clearable
            dark
          ></v-text-field>
          <v-text-field
            v-model="shortName"
            :counter="min"
            :rules="shortNameRules"
            label="Name Abbr."
            color="green"
            clearable
            dark
          ></v-text-field>
          <v-checkbox
            v-model="privateTeam"
            label="Private team"
            dark
            color="green"
          ></v-checkbox>
        </v-form>
      </v-flex>

      <v-flex xs12 md6>
        <h3>Choose your avatar</h3>
        <v-avatars @update="onUpdateChild" type="teams"></v-avatars>
      </v-flex>
      <v-flex xs12>
        <v-btn @click="handleClick()" outline dark color="success" round>
          CREATE
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
    teamName: "",
    shortName: "",
    max: 20,
    maxShort: 3,
    min: 3,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length >= 3) || `A minimum of 3 characters is required`,
      v => (v && v.length <= 20) || "Name must be less than 20 characters"
    ],
    shortNameRules: [
      v => !!v || "Name is required",
      v =>
        (v && v.length == 3) || `The acronym must be exactly 3 characters long`
    ],
    avatar: "",
    privateTeam: false
  }),
  computed: {
    ...mapGetters("auth", {
      userId: "userId"
    })
  },

  watch: {
    max: "validateField",
    min: "validateField"
  },

  methods: {
    onUpdateChild(avatar) {
      this.avatar = avatar;
    },
    validateField() {
      this.$refs.form.validate();
    },
    handleClick() {
      console.log(
        this.teamName,
        this.shortName,
        this.avatar,
        this.userId,
        this.privateTeam
      );
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation createTeam(
              $name: String!
              $short_name: String!
              $avatar: String!
              $userId: ID!
              $private: Boolean!
            ) {
              createTeam(
                name: $name
                short_name: $short_name
                avatar: $avatar
                userId: $userId
                private: $private
              ) {
                name
              }
            }
          `,
          // Parameters
          variables: {
            name: this.teamName,
            short_name: this.shortName,
            avatar: this.avatar,
            userId: this.userId,
            private: this.privateTeam
          },
          refetchQueries: [`teams`]
        })
        .then(data => {
          console.log(data);
          this.$router.push("/teams");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
