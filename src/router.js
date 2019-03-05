import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Lobby from "./views/Lobby";
import ActiveGame from "./views/games/ActiveGame";
import Statistics from "./views/statistics/Statistics.vue";

import VueAxios from "vue-axios";
import VueAuthenticate from "vue-authenticate";
import axios from "axios";
import VueResize from "vue-resize";

console.log("Using redirectUri " + process.env.VUE_APP_AUTH_REDIRECT_URL);

Vue.use(VueResize);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: process.env.VUE_APP_AUTH_API_URL,
  providers: {
    github: {
      clientId: process.env.VUE_APP_AUTH_CLIENT_ID_GITHUB,
      redirectUri: process.env.VUE_APP_AUTH_REDIRECT_URL
    },
    google: {
      clientId: process.env.VUE_APP_AUTH_CLIENT_ID_GOOGLE,
      redirectUri: process.env.VUE_APP_AUTH_REDIRECT_URL
    },
    facebook: {
      clientId: process.env.VUE_APP_AUTH_CLIENT_ID_FACEBOOK,
      redirectUri: process.env.VUE_APP_AUTH_REDIRECT_URL
    }
  }
});
Vue.use(Router);

export default new Router({
  //  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      props: {
        logout: false
      },
      component: Home
    },
    {
      path: "/logout",
      name: "logout",
      props: {
        logout: true
      },
      component: Home
    },
    { path: "/lobby", name: "Lobby", component: Lobby },
    {
      path: "/stats/:resultType",
      name: "stats",
      props: route => ({
        query2: {
          ...route.query,
          resultType: route.params.resultType,
          pageSize: 100
        }
      }),
      component: Statistics
    },
    {
      path: "/games/:gameId",
      name: "games",
      props: route => ({
        gameInfo: { ...route.params }
      }),
      component: ActiveGame
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
