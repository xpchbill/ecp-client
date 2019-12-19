import Vue from 'vue';
import Router from 'vue-router';

import scm from './scm';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    children: [...scm]
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFound.vue')
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
