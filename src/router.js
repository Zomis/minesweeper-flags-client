import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Lobby from "./views/Lobby";
import Statistics from "./views/statistics/Statistics.vue";

import VueAxios from "vue-axios";
//import VueAuthenticate from "vue-authenticate";
import axios from "axios";

Vue.use(VueAxios, axios);
Vue.use(Router);

export default new Router({
  //  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    { path: "/lobby", name: "Lobby", component: Lobby },
    {
      path: "/stats/:resultType",
      name: "stats",
      props: route => ({
        query2: { ...route.query, resultType: route.params.resultType }
      }),
      component: Statistics
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
