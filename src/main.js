import Vue from "vue";
import ElementUI from "element-ui";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import store from "./store";
import router from "./router";



// require("./mock.js");

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
// axios.defaults.baseURL = 'https://localhost:3000'
axios.defaults.baseURL='https://zhangzec.vip:8080'

// const wsLink="wss:" +  location.hostname + ':'+location.port
// const  wsLink="wss:zhangzec.vip:8080"

// import 'element-ui/lib/theme-chalk/index.css'; //默认
import "./mycss/element-variables.scss"; //修改后的样式
import "./mycss/main.css"
import './assets/icons/eleThirdIcon/iconfont.css'

// 公用方法
String.prototype.endWith = function (endStr) {
  var d = this.length - endStr.length;
  return (d >= 0 && this.lastIndexOf(endStr) == d);
}
String.prototype.endWithImg = function () {
  var imgEnd=['.png','.jpg']
  var flag=false
  for(let item of imgEnd){
    if(this.endWith(item)){
      flag=true
    }
  }
  return flag
}


function revokeIt () {
  console.log("revokeIt")
}


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");