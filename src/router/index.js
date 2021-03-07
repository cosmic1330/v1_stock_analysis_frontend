import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/script.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/:id",
        name: "Chart",
        component: Home,
    },
];

const router = new VueRouter({
    routes,
    mode: "history",
    base: "/ui",
});

export default router;
