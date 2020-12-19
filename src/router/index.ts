import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";
import Login from "../views/Login.vue";
import Review from "../views/Review.vue";
import Sidebar from "../views/Sidebar.vue";
import Search from "../views/Search.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      guest: true
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      guest: true
    },
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
    },
    meta: {
      needsAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    components: {
      default: Login,
      sidebar: Sidebar
    },
    meta: {
      guest: true
    }
  },
  {
    path: "/review",
    name: "Review",
    components: {
      default: Review,
      sidebar: Sidebar
    },
    meta: {
      needsAuth: true
    }
  },
  {
    path: "/search",
    name: "Search",
    components: {
      default: Search,
      sidebar: Sidebar
    },
    meta: {
      needsAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
