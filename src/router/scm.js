import PageView from '../components/PageView/PageView';

const scm = {
  path: '/scm',
  name: '/scm',
  component: PageView,
  meta: { title: '生产订单', icon: 'form' },
  children: [
    {
      path: `/order/new`,
      name: `/order/new`,
      meta: { title: '新增生产订单', icon: 'profile' },
      component: () => import('@/views/scm/order/NewOrder.vue')
    },
    {
      path: `/order/list`,
      name: `/order/list`,
      meta: { title: '生产订单列表', icon: 'profile' },
      component: () => import('@/views/scm/order/OrderList.vue')
    }
  ]
};

export default scm;
