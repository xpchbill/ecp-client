import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import vuexCache from 'vuex-cache';

Vue.use(Vuex);

const profileStorage = new VuexPersistence({
  key: 'profile',
  storage: window.localStorage,
  reducer: state => ({
    account: state.auth.account,
    address: state.address.profileAddress
  })
});

const deviceStorage = new VuexPersistence({
  key: 'devices',
  storage: window.localStorage,
  reducer: state => ({
    collection: state.device.collection
  }),
  filter: mutation => mutation.type === 'setStateKV',
  asyncStorage: false
});

export default new Vuex.Store({
  state: {
    env: `${process.env.NODE_ENV}`,
    serverUrl: `${process.env.VUE_APP_SERVER_URL}`,
    restApiRoot: `${process.env.VUE_APP_ROOT_API}`,
    clientUrl: `${process.env.VUE_APP_CLIENT_URL}`
  },
  mutations: {},
  actions: {},
  plugins: [profileStorage.plugin, deviceStorage.plugin, vuexCache({ timeout: 3000 })],
  modules: {}
});
