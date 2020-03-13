import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRX from 'vue-rx';
import {Observable, Subject} from 'rxjs'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueRX, {
  Observable,
  Subject
});

new Vue({
  render: h => h(App),
}).$mount('#app')
