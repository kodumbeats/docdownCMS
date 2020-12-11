import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";
import Review from "../views/Review.vue";
import Sidebar from "../views/Sidebar.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/edit",
    name: "Edit",
    components: {
      default: Edit,
      sidebar: Sidebar
    }
  },
  {
    path: "/review",
    name: "Review",
    components: {
      default: Review,
      sidebar: Sidebar
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
