import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from "./store";
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
require('./mock.js')

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')