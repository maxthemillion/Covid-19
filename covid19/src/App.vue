<template>
  <div id="wrap">
    <linechart v-bind:opts="opts_casesVS100"/>
    <linechart v-bind:opts="opts_mortalityVS100" />
  </div>
</template>

<script>
import linechart from '@maxthemillion/vued3-linechart'
import * as d3 from "d3"


export default {
  name: "App",
  components: {
    linechart
  },
  data() {
    return {
      opts_mortalityVStime : {
        dataURL: "./data/all_sel.csv",
        chartTitle: "Are countries undertesting?",
        chartSubTitle: "Share of deaths in confirmed COVID-19 cases",
        commentTitle: "Vast differences in testing procedures",
        comment:
          "While Germany and South Korea have very low numbers of deaths in confirmed cases, Italy and originally also the US did not. Assuming (almost) equal standards in health treatment across these industrialized countries, the figures may be an indicator on whether countries are undertesting.",
        binding: {
          x: "date",
          xType: "T",
          y: "death_rate",
          yType: "P",
          color: "country",
          colorType: "N"
        },
        format: {
          y: d3.format(".1%"),
          x: d3.timeFormat("%d %B")
        },
        tick: {
          frequency: d3.timeWeek.every(1)
        },
        scale: {
          x: d3.scaleTime(),
          y: d3.scaleLinear(),
          color: d3.scaleOrdinal()
        },
        xAxisTitle: "Days since 100th case",
        yAxisTitle: null,
        colorScheme: ["steelblue"],
        colorHighlight: ["Germany", "Italy"],
        annotations: []
      },
      opts_mortalityVS100 : {
        dataURL: "./data/all_sel.csv",
        chartTitle: "Is mortality really different across countries?",
        chartSubTitle: "Share of deaths in confirmed COVID-19 cases",
        commentTitle: "Vast differences in testing procedures",
        comment:
          "While Germany and South Korea have very low numbers of deaths in confirmed cases, Italy and originally also the US did not. Assuming (almost) equal standards in health treatment across these industrialized countries, the figures may be an indicator on whether countries are undertesting.",
        binding: {
          x: "days_since100",
          xType: "Q",
          y: "death_rate",
          yType: "P",
          color: "country",
          colorType: "N"
        },
        format: {
          y: d3.format(".1%")
        },
        xAxisTitle: "Days since 100th case",
        yAxisTitle: null,
        colorScheme: ["steelblue"],
        colorHighlight: ["Germany", "Italy"],
        annotations: []
      },
      opts_casesVS100:{
        dataURL: "./data/all_sel.csv",
        chartTitle: "What are the latest figures?",
        chartSubTitle: "Confirmed COVID-19 cases since the 100th case in each country",
        commentTitle: "Exponential growht",
        comment:
          "",
        binding: {
          x: "days_since100",
          xType: "Q",
          y: "confirmed",
          yType: "Q",
          color: "country",
          colorType: "N"
        },
        format: {
          y: d3.format("d")
        },
        xAxisTitle: "Days since 100th case",
        yAxisTitle: null,
        colorScheme: ["steelblue"],
        colorHighlight: ["Germany", "Italy"],
        annotations: []
      }
    }
  }
};
</script>

