const scm = (pre => [
  {
    path: `${pre}/order/new`,
    name: `${pre}/order/new`,
    component: () => import('@/views/scm/order/NewOrder.vue')
  }
])('scm');

export default scm;
