import Vue from "vue";
import Router from "vue-router";
import store from "./store/store";

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./views/Dashboard.vue"),
      // beforeEnter: (to, from, next) => {
      //   if (!store.state.auth.isAuthenticated) {
      //     next("/login");
      //   } else next();
      // },
      meta: { requiresAuth: true }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/createPlayer",
      name: "createPlayer",
      component: () => import("./views/CreatePlayer.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(
    to.fullPath,
    "authenticated: " + store.state.auth.isAuthenticated
  );
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !store.state.auth.isAuthenticated
  ) {
    console.log("redirected to login");
    next("/login");
  } else if (to.fullPath === "/login" && store.state.auth.isAuthenticated) {
    next("dashboard");
  } else next();
});

Vue.use(Router);

export default router;
