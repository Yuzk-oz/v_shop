import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './plugins/element.js'

import axios from 'axios'
Vue.prototype.$http = axios
    // 配置请求根路径
axios.defaults.baseURL = 'http://119.23.53.78:8888/api/private/v1/'

// 导入全局样式表
import './assets/css/global.css'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');