import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/script.vue";
import Step from "../views/step/index.vue";
import Lower from "../views/lower/index.vue";
import Williams from "../views/williams/index.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/step",
        name: "step",
        component: Step,
    },
    {
        path: "/lower",
        name: "lower",
        component: Lower,
    },
    {
        path: "/williams",
        name: "williams",
        component: Williams,
    },
];

const router = new VueRouter({
    routes,
    mode: "history",
    base: "/ui",
});

export default router;
