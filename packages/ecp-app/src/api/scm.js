import api from '@/api/API';

const MODULE_NAME = '/scm';

export default {
  getOrderList(params) {
    return api.get(`${MODULE_NAME}/order/list`, { params });
  },
  addOrder(params) {
    return api.post(`${MODULE_NAME}/order`, { params });
  }
};
