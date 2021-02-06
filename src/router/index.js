import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/script.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/self',
        name: 'Self',
        component: () => import('../views/self/script.vue'),
    },
    {
        path: '/check',
        name: 'Check',
        component: Home,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
    base: '/',
});

export default router;
