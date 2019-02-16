import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Statistics from "./views/Statistics.vue";

import VueAxios from "vue-axios";
//import VueAuthenticate from "vue-authenticate";
import axios from "axios";

Vue.use(VueAxios, axios);
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/stats/:resultType",
      name: "stats",
      props: route => ({
        resultType: route.params.resultType,
        players: route.query.players,
        tags: route.query.tags,
        withoutTags: route.query.withoutTags,
        plugin: route.query.plugin,
        after: route.query.after,
        before: route.query.before,
        pageSize: route.query.pageSize,
        page: route.query.page
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
