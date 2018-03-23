import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Vue2Filters from 'vue2-filters'
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(Vue2Filters)
Vue.use(VueLocalStorage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
