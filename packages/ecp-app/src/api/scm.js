import api from '@/api/API';

const MODULE_NAME = '/scm';

export default {
  getOrderList() {
    return api.post(`${MODULE_NAME}/order/list`);
  }
};
