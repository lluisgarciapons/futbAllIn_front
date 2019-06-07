<template>
  <v-layout fill-height column align-center justify-space-around>
    <img
      src="https://i.ibb.co/R4Hpcd8/futb-all-in.png"
      alt="futb-all-in"
      border="0"
    />
    <img
      class="google-login-btn"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7NABN7FsJQ8rVSl_iRB5zO8vnOzf6Vck1XPNozMxQ7xkBcEjU"
      alt="google login logo"
      @click="this.googleRedirect"
    />
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    if (this.$route.query.hasOwnProperty("code")) {
      console.log(this.$route.query.code);
      let code = this.$route.query.code;
      this.loginUserGoogle(code);
    }
  },
  methods: {
    ...mapActions("auth", {
      loginUserGoogle: "loginUserGoogle"
    }),
    googleRedirect: () => {
      window.location = "http://localhost:4000/auth/google";
    }
  }
};
</script>

<style scoped>
.google-login-btn {
  width: 225px;
  border-radius: 5px;
}
</style>

