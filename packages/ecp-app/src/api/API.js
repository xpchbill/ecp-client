import axios from 'axios';
// import Url from 'url-parse';
// import { clearDb } from '@/persistence/db_util.js';
// import store from '@/store/store';
import router from '@/router';
import Modal from 'ant-design-vue/es/modal';
// import Vue from 'vue';

const BASE_URL = `${process.env.VUE_APP_API_URL}` || 'http://localhost:3033/rest/v1';

console.log(BASE_URL); // eslint-disable-line

const axiosApi = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  retry: 2 ** 31
});

// axiosApi.interceptors.request.use(
//   config => {
//     const url = new Url(config.url);
//     const token = getToken(config.method.toUpperCase(), url.pathname, config.data);
//     config.headers.common['Authorization'] = 'Bearer ' + token;
//     config.headers.common['Accept-Language'] = navigator.language || navigator.userLanguage;
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

axiosApi.interceptors.response.use(
  function(response) {
    if (response.data.error && response.data.error.code === 500) {
      let config = response.config;
      if (!config || !config.retry) {
        return Promise.reject(response);
      }

      config.__retryCount = config.__retryCount || 0;
      if (config.__retryCount >= config.retry) {
        return Promise.reject(response);
      }

      config.__retryCount += 1;
      var backOff = new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });

      return backOff.then(() => {
        return axiosApi(config);
      });
    }

    // const timeLag = Math.abs(response.headers['x-server-time'] / 1000000 - Date.parse(new Date()));
    // if (timeLag > 600000) {
    //   store.dispatch('showTime');
    //   return Promise.reject(response);
    // } else {
    //   store.dispatch('hideTime');
    // }

    if (response.data.error) {
      switch (response.data.error.code) {
        case 401:
          router.push('/signin');
          break;
      }
      return Promise.reject(response);
    }

    return response;
  },
  function(error) {
    let config = error.config;

    if (!config || !config.retry) {
      Modal.error({
        title: 'Request Failed:',
        content: error.message,
        centered: true
      });
      return Promise.reject(error);
    }
    config.__retryCount += 1;
    var backOff = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 200);
    });

    return backOff.then(() => {
      return axiosApi(config);
    });
  }
);

export default axiosApi;
