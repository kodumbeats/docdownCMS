import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Appwrite from "appwrite";

import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";
import Login from "../views/Login.vue";
import Review from "../views/Review.vue";
import Sidebar from "../views/Sidebar.vue";
import Search from "../views/Search.vue";

import store from "../store/";

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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.needsAuth)) {
    if (localStorage.getItem("cookieFallback") == null) {
      next({
        path: "/login"
      });
    } else {
      const { apiEndpoint, apiProject } = store.getters.getApiUrl;
      const appwrite = new Appwrite()
        .setEndpoint(apiEndpoint)
        .setProject(apiProject);
      appwrite.account
        .get()
        .then(() => {
          next();
        })
        .catch(err => {
          if (err.message === "Unauthorized") {
            console.log("401 Unauthorized");
          } else {
            console.log(err);
          }
          next({
            path: "/login"
          });
        });
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("cookieFallback") == null) {
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
