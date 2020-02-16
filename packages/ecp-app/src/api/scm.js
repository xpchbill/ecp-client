import api from '@/api/API';

const MODULE_NAME = '/scm';

export default {
  getOrderList(params) {
    return api.post(`${MODULE_NAME}/diyorder/orders.json`, params);
  },
  addOrder(params) {
    return api.post(`${MODULE_NAME}/diyorder`, { params });
  }
};
