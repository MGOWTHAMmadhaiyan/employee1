
import Vue from "vue";
import VueRouter from "vue-router";

import formpage from "./components/formpage.vue";
import tablepage from "./components/tablepage.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "tablepage",
        component: tablepage,
    },
    {
        path: "/form",
        name: "formpage",
        component: formpage,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL, routes,
});

export default router;

