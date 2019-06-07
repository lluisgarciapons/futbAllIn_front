import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { createProvider } from "./vue-apollo";
import { mapActions } from "vuex";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App),
  methods: {
    ...mapActions("auth", {
      loginUserGoogle: "loginUserGoogle"
    })
  },
  created() {
    if (localStorage.getItem("jwtToken")) {
      this.loginUserGoogle(localStorage.getItem("jwtToken"));
    }
  }
}).$mount("#app");
