import jwt_decode from "jwt-decode";
import router from "../../router";
import axios from "axios";

import setAuthToken from "../../utils/setAuthToken";
import isEmpty from "../../validation/is-empty";

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const defaultState = {
  isAuthenticated: false,
  user: {}
};

const actions = {
  loginUserGoogle: (context, token) => {
    if (token !== undefined && token !== "") {
      // Set Token to Auth Header
      setAuthToken(token);

      // Set token to local storage
      localStorage.setItem("jwtToken", token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      context.commit("SET_CURRENT_USER", decoded);
    }
  },

  logout: context => {
    console.log("logou");
    axios.get("/auth/logout").then(response => {
      console.log(response);
      localStorage.removeItem("jwtToken");
      context.commit("LOGOUT");
      router.push("/login");
    });
  }
};

const mutations = {
  SET_CURRENT_USER: (state, payload) => {
    state.isAuthenticated = !isEmpty(payload);
    state.user = payload;
    // delay(2000).then(() => {
    console.log("going to dashboard");
    router.push("/dashboard");
    // });
  },
  LOGOUT: state => {
    state.isAuthenticated = false;
    state.user = {};
  }
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  userId: state => state.user.id
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
};
