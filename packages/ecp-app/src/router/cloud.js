import PageView from '../components/PageView/PageView';
import FragmentView from '../components/FragmentView/FragmentView';

const modulePath = '/cloud';

const scm = {
  path: modulePath,
  name: modulePath,
  component: PageView,
  meta: { title: '企业云', icon: 'cloud' },
  children: [
    {
      path: `${modulePath}/dd`,
      name: `${modulePath}/dd`,
      meta: { title: '订单分析' },
      component: FragmentView,
      redirect: `${modulePath}/dd/list`,
      children: [
        {
          path: `${modulePath}/dd/new`,
          name: `${modulePath}/dd/new`,
          meta: { title: '订单分析1' },
          component: () => import('@/views/modules/scm/order/NewOrder.vue')
        },
        {
          path: `${modulePath}/dd/list`,
          name: `${modulePath}/dd/list`,
          meta: { title: '订单分析2' },
          component: () => import('@/views/modules/scm/order/OrderList.vue')
        }
      ]
    },
    {
      path: `${modulePath}/sc`,
      name: `${modulePath}/sc`,
      meta: { title: '生产统计' },
      component: FragmentView,
      redirect: `${modulePath}/sc/list`,
      children: [
        {
          path: `${modulePath}/sc/new`,
          name: `${modulePath}/sc/new`,
          meta: { title: '生产统计1' },
          component: () => import('@/views/modules/scm/order/NewOrder.vue')
        },
        {
          path: `${modulePath}/sc/list`,
          name: `${modulePath}/sc/list`,
          meta: { title: '生产统计2' },
          component: () => import('@/views/modules/scm/order/OrderList.vue')
        }
      ]
    }
  ]
};

export default scm;
