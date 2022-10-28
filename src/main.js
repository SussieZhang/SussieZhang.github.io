import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueLazyload from 'vue-lazyload'
import axios from "axios";

Vue.use(iView)
Vue.use(VueLazyload)
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.BASE_URL;
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
