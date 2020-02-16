import PageView from '../components/PageView/PageView';
import FragmentView from '../components/FragmentView/FragmentView';

const modulePath = '/crm';

const scm = {
  path: modulePath,
  name: modulePath,
  component: PageView,
  meta: { title: '客户', icon: 'user' },
  children: [
    {
      path: `${modulePath}/contacts`,
      name: `${modulePath}/contacts`,
      meta: { title: '客户管理' },
      component: FragmentView,
      redirect: `${modulePath}/contacts/maincontacts`,
      children: [
        {
          path: `${modulePath}/contacts/maincontacts`,
          name: `${modulePath}/contacts/maincontacts`,
          meta: { title: '客户管理' },
          component: () => import('@/views/modules/crm/contacts/MainContacts.vue')
        }
      ]
    }
  ]
};

export default scm;
