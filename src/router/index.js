import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Chat";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/home",
  //   name: "Home",
  //   component: () => import("../views/Home/index.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
