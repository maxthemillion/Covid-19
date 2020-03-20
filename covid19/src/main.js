import Vue from 'vue'
import app from '@maxthemillion/vued3-linechart'
//import * as moment from 'moment'
import * as d3 from "d3"

Vue.config.productionTip = false

let opts = {
  dataURL: "./data/all_sel.csv",
  chartTitle: "Share of deaths in confirmed COVID19 cases",
  chartSubTitle: "Are countries undertesting?",
  commentTitle: "Who's up to the challenge?",
  comment: "While Germany and South Korea have very low numbers of deaths in confirmed cases, Italy and originally also the US did not. Assuming (almost) equal standards in health treatment across these industrialized countries, the figures may be an indicator on whether countries are undertesting.",
  binding:  { x: "date", y: "death_rate", color: "country"},
  xAxisTitle: "Days since 100th case",
  yAxisTitle: null,
  colorScheme: d3.schemeTableau10,
  annotations: []
}

new Vue({
  render: h => h(app, {props:{ opts: opts}}),
}).$mount('#app')
