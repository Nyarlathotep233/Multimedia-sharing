import Vue from "vue";
import ElementUI from "element-ui";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import store from "./store";
import router from "./router";



require("./mock.js");

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

// import 'element-ui/lib/theme-chalk/index.css'; //默认
import "./mycss/element-variables.scss"; //修改后的样式
import "./mycss/main.css"
import './assets/icons/eleThirdIcon/iconfont.css'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");