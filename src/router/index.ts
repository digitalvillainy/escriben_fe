import {createWebHistory, createRouter} from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import Home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue";
import ForgotPage from "../views/ForgotPage.vue";
import DashBoard from "../views/DashBoard.vue";
import ResetPwd from "../views/ResetPwd.vue";
import NotebooksPage from "../views/NotebooksPage.vue";
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
        component: ForgotPage,
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
        component: DashBoard,
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
        component: NotebooksPage,
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
        component: {template: "<div>Going to https://robertorivera.dev</div>"},
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

    // Set document title
    document.title =
        (to.meta.title as string) ||
        "Escriben | A Markdown Note Taking Web Application";

    // If the user is authenticated and they are on the home page, redirect to the dashboard
    if (to.name === "home" && isAuthenticated) {
        next({name: "dashboard"});
    }
    // If the route requires authentication and the user is not authenticated, redirect to login
    else if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
        next({name: "login"});
    }
    // Otherwise, allow navigation
    else {
        next();
    }
});
export default router;
