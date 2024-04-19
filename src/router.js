import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./views/HomeView.vue";
import ResultView from "./views/ResultView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/result",
    name: "result",
    component: ResultView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
