import axios from 'axios';
// import Url from 'url-parse';
// import { clearDb } from '@/persistence/db_util.js';
// import store from '@/store/store';
import router from '@/router';
import Modal from 'ant-design-vue/es/modal';
// import Vue from 'vue';

axios.defaults.transformRequest = [
  function(data) {
    let ret = '';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    return ret;
  }
];

const BASE_URL = `${process.env.VUE_APP_API_URL}` || 'http://localhost:3033/rest/v1';

console.log(BASE_URL); // eslint-disable-line

const getUrlVars = () => {
  const vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
};

const getUrlParam = (parameter, defaultvalue) => {
  var urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
};

// const setCookie = (name, value, hour) => {
//   var exp = new Date();
//   exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
//   document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
// };

const token = getUrlParam('ecp_cookie');
// setCookie('ecp_cookie', token);

// const getCookie = name => {
//   var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
//   if (arr != null) {
//     return unescape(arr[2]);
//   }
//   return '';
// };

const axiosApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  retry: 2 ** 31,
  withCredentials: true,
  headers: {
    ecp_cookie: token,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

// axiosApi.interceptors.request.use(
//   config => {
//     if (config.method === 'post') {
//       config.data = JSON.stringify(config.data);
//     }
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
