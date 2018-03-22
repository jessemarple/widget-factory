// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
// import VueTimeago from 'vue-timeago'
import Vue2Filters from 'vue2-filters'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(Vue2Filters)
// Vue.use(VueTimeago, {
//   name: 'timeago',
//   locale: 'en-US',
//   locales: {
//     'en-US': require('vue-timeago/locales/en-US.json')
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
