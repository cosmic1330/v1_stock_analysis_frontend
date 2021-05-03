import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/script.vue";
import Eps from "../views/eps/index.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/eps",
        name: "eps",
        component: Eps,
    },
];

const router = new VueRouter({
    routes,
    mode: "history",
    base: "/ui",
});

export default router;
