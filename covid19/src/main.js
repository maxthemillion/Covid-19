import Vue from 'vue'
import app from './App.vue'
//import * as moment from 'moment'
// eslint-disable-next-line no-unused-vars  
import * as d3 from "d3"

Vue.config.productionTip = false

new Vue({
  render: h => h(app),
}).$mount('#app')
