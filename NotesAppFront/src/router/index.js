import { createRouter, createWebHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Notes from "../views/Notes.vue";
import CreateNote from '../views/CreateNote.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/notes",
        name: "Notes",
        component: Notes,
        meta: { requiresAuth: true }
    },
    {
        path: "/create-note",
        name: "CreateNote",
        component: CreateNote,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router;
