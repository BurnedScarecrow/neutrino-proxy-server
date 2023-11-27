import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { transition: "slide-left" },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { transition: "slide-right" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
