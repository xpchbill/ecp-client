import scmAPI from '@/api/scm';

const user = {
  state: {
    orderList: []
  },

  mutations: {
    SET_ORDER_LIST: (state, orderList) => {
      state.orderList = orderList;
    }
  },

  actions: {
    getOrderList({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        scmAPI
          .getOrderList(userInfo)
          .then(response => {
            const result = response.result;
            commit('SET_ORDER_LIST', result.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;
