<template>
  <v-app>
    <v-content class="background">
      <Toolbar v-if="isAuthenticated" />
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import Toolbar from "./components/Toolbar";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { Footer, Toolbar },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapGetters("auth", {
      isAuthenticated: "isAuthenticated"
    })
  }
};
</script>
<style>
.background {
  background-color: black;
  /* min-height: 100vh - 100px; */
}
</style>

