import Vue from 'vue'
import App from './App.vue'
import router  from './router'
import './axios'
import {store} from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueCarousel from 'vue-carousel';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(VueCarousel);
Vue.use(ElementUI);

new Vue({
  
  store,
  router,
  render: h => h(App),
}).$mount('#app')
