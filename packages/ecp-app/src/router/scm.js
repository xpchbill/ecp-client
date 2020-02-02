import PageView from '../components/PageView/PageView';
import FragmentView from '../components/FragmentView/FragmentView';

const modulePath = '/scm';

const scm = {
  path: modulePath,
  name: modulePath,
  component: PageView,
  meta: { title: '销售', icon: 'form' },
  children: [
    {
      path: `${modulePath}/order`,
      name: `${modulePath}/order`,
      meta: { title: '售前' },
      component: FragmentView,
      redirect: `${modulePath}/order/list`,
      children: [
        {
          path: `${modulePath}/order/new`,
          name: `${modulePath}/order/new`,
          meta: { title: '新增生产订单' },
          component: () => import('@/views/modules/scm/order/NewOrder.vue')
        },
        {
          path: `${modulePath}/order/list`,
          name: `${modulePath}/order/list`,
          meta: { title: '生产订单列表' },
          component: () => import('@/views/modules/scm/order/OrderList.vue')
        }
      ]
    }
  ]
};

export default scm;
