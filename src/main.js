// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import MQ from 'vue-match-media';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill'
import axios from 'axios';
import VueAxios from 'vue-axios';
import promise from 'es6-promise';
promise.polyfill();
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
// Vue.use(MQ);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  // mq: {
  //   phone: '(max-width: 768px)',
  //   tablet: '(max-width: 1024px)',
  //   desktop: '(min-width: 1024px)'
  // },
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
