import Vue from 'vue';
import Router from 'vue-router';

import cloud from './cloud';
import scm from './scm';

Vue.use(Router);

export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: '/scm/order/list' },
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    children: [cloud, scm]
  },
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "error" */ '@/views/exception/403')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "error" */ '@/views/exception/404')
  },
  {
    path: '/500',
    component: () => import(/* webpackChunkName: "error" */ '@/views/exception/500')
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
