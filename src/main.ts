import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRX from 'vue-rx';
import {Observable, Subject} from 'rxjs'
import socketio from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';
import App from './App.vue'
import './registerServiceWorker'


Vue.config.productionTip = false

Vue.use(BootstrapVue);
// https://github.com/probil/vue-socket.io-extended
const socket = socketio('http://localhost:3030');
Vue.use(VueSocketIOExt, socket);

Vue.use(VueRX, {
  Observable,
  Subject
});


new Vue({
  render: h => h(App),
}).$mount('#app')
