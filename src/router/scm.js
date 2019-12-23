import PageView from '../components/PageView/PageView';

const modulePath = '/scm';

const scm = {
  path: modulePath,
  name: modulePath,
  component: PageView,
  meta: { title: '生产订单', icon: 'form' },
  children: [
    {
      path: `${modulePath}/order/new`,
      name: `${modulePath}/order/new`,
      meta: { title: '新增生产订单', icon: 'profile' },
      component: () => import('@/views/scm/order/NewOrder.vue')
    },
    {
      path: `${modulePath}/order/list`,
      name: `${modulePath}/order/list`,
      meta: { title: '生产订单列表', icon: 'profile' },
      component: () => import('@/views/scm/order/OrderList.vue')
    }
  ]
};

export default scm;
