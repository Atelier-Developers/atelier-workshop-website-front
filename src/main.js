import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from "./store/index"
import VuePageTransition from 'vue-page-transition'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.use(VuePageTransition)

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
// eslint-disable-next-line no-console
console.log("token")
// eslint-disable-next-line no-console
console.log(token)
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
