import api from '@/api/API';

const MODULE_NAME = '/crm';

export default {
  getMainContacts() {
    return api.get(`${MODULE_NAME}/contacts/mainContacts.json`, {
      params: { customer_id: 'L0Ej' }
    });
  }
};
