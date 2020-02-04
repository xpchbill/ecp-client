import PageView from '../components/PageView/PageView';
import FragmentView from '../components/FragmentView/FragmentView';

const modulePath = '/scm';

const scm = {
  path: modulePath,
  name: modulePath,
  component: PageView,
  meta: { title: '销售', icon: 'shopping-cart' },
  children: [
    {
      path: `${modulePath}/presales`,
      name: `${modulePath}/presales`,
      meta: { title: '售前' },
      component: FragmentView,
      redirect: `${modulePath}/presales/clue`,
      children: [
        {
          path: `${modulePath}/presales/clue`,
          name: `${modulePath}/presales/clue`,
          meta: { title: '线索' },
          component: () => import('@/views/modules/scm/order/NewOrder.vue')
        },
        {
          path: `${modulePath}/presales/opportunity`,
          name: `${modulePath}/presales/opportunity`,
          meta: { title: '商机' },
          component: () => import('@/views/modules/scm/order/OrderList.vue')
        },
        {
          path: `${modulePath}/presales/quotation`,
          name: `${modulePath}/presales/quotation`,
          meta: { title: '报价单' },
          component: () => import('@/views/modules/scm/order/OrderList.vue')
        }
      ]
    },
    {
      path: `${modulePath}/order`,
      name: `${modulePath}/order`,
      meta: { title: '生产销售' },
      component: FragmentView,
      redirect: `${modulePath}/order/list`,
      children: [
        {
          path: `${modulePath}/order/new`,
          name: `${modulePath}/order/new`,
          meta: { title: '生产订单录入' },
          component: () => import('@/views/modules/scm/order/NewOrder.vue')
        },
        {
          path: `${modulePath}/order/list`,
          name: `${modulePath}/order/list`,
          meta: { title: '生产订单管理' },
          component: () => import('@/views/modules/scm/order/OrderList.vue')
        },
        {
          path: `${modulePath}/order/setting`,
          name: `${modulePath}/order/setting`,
          meta: { title: '订单设置' },
          component: () => import('@/views/modules/scm/order/OrderList.vue')
        }
      ]
    }
  ]
};

export default scm;
