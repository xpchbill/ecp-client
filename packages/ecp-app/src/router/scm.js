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
      path: `${modulePath}/diyorder`,
      name: `${modulePath}/diyorder`,
      meta: { title: '生产销售' },
      component: FragmentView,
      redirect: `${modulePath}/diyorder/list`,
      children: [
        {
          path: `${modulePath}/diyorder/new`,
          name: `${modulePath}/diyorder/new`,
          meta: { title: '生产订单录入' },
          component: () => import('@/views/modules/scm/diyorder/NewOrder.vue')
        },
        {
          path: `${modulePath}/diyorder/list`,
          name: `${modulePath}/diyorder/list`,
          meta: { title: '生产订单管理' },
          component: () => import('@/views/modules/scm/diyorder/OrderList.vue')
        },
        {
          path: `${modulePath}/diyorder/setting`,
          name: `${modulePath}/diyorder/setting`,
          meta: { title: '订单设置' },
          component: () => import('@/views/modules/scm/diyorder/OrderList.vue')
        }
      ]
    }
  ]
};

export default scm;
