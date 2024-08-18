import { createWebHistory, createRouter } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import Home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue";
import Forgot from "../views/Forgot.vue";
import Dashboard from "../views/Dashboard.vue";
import ResetPwd from "../views/ResetPwd.vue";
import Notebooks from "../views/Notebooks.vue";
import ProfilePage from "../views/ProfilePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Escriben | A Markdown Note Taking Web Application",
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: {
      title: "Register | Escriben | A Markdown Note Taking Web Application",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      title: "Login | Escriben | A Markdown Note Taking Web Application",
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: Forgot,
    meta: {
      title:
        "Forgot Password | Escriben | A Markdown Note Taking Web Application",
    },
  },
  {
    path: "/reset-password?:token&:email",
    name: "reset-password",
    component: ResetPwd,
    meta: {
      title:
        "Reset Password | Escriben | A Markdown Note Taking Web Application",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title: "Dashboard | Escriben | A Markdown Note Taking Web Application",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    meta: {
      requiresAuth: true,
      title: "Profile | Escriben | A Markdown Note Taking Web Application",
    },
  },
  {
    path: "/notebooks?notebook_id=:notebook_id",
    name: "notebooks",
    component: Notebooks,
    meta: {
      requiresAuth: true,
      title: "Notebooks | Escriben | A Markdown Note Taking Web Application",
    },
  },
  {
    path: "/port",
    beforeEnter: () => {
      location.href = "https://robertorivera.dev";
    },
    component: { template: "<div>Going to https://robertorivera.dev</div>" },
  },
  {
    path: "/instagram",
    beforeEnter: () => {
      location.href = "https://www.instagram.com/xerafenix/";
    },
    component: {
      template: "<div>Going to https://www.instagram.com/xerafenix/",
    },
  },
  {
    path: "/threads",
    beforeEnter: () => {
      location.href =
        "https://www.threads.net/@xerafenix?xmt=AQGzDZ1U138aT8iCQUGgKSTueEldyfHN98hibwqq1Oeylm0";
    },
    component: {
      template:
        "<div>Going to https://www.threads.net/@xerafenix?xmt=AQGzDZ1U138aT8iCQUGgKSTueEldyfHN98hibwqq1Oeylm0",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Check if user is authenticated
router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  document.title =
    (to.meta.title as string) ||
    "Escriben | A Markdown Note Taking Web Application";
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
