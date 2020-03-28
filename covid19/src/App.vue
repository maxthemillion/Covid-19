<template>
  <div id="wrap">
    <selector @userSelect="setSelect" v-bind:selectVals="this.selectVals" />
    <div v-if="loaded">
      <linechart v-bind="opts_casesVS100" />
      <linechart v-bind="opts_mortalityVS100" />
    </div>
  </div>
</template>

<script>
import linechart from "@bit/maxthemillion.d3charts.linechart";
import selector from "./components/Select.vue";
import { loadData } from "@bit/maxthemillion.d3charts.utils";
import * as d3 from "d3";

export default {
  name: "App",
  components: {
    linechart,
    selector
  },
  data() {
    return {
      loaded: false,
      selectVals: ["Italy", "Germany", "France"],
      opts_mortalityVStime: {
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
      opts_mortalityVS100: {
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
      opts_casesVS100: {
        dataURL: "./data/all_sel.csv",
        chartTitle: "What are the latest figures?",
        chartSubTitle:
          "Confirmed COVID-19 cases since the 100th case in each country",
        commentTitle: "Exponential growht",
        comment: "",
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
    };
  },
  methods: {
    setSelect: function(selection) {
      this.opts_casesVS100.colorHighlight = [selection];
      this.opts_mortalityVS100.colorHighlight = [selection];
    }
  },
  beforeMount: function() {
    const _this = this;
    let a = [
      this.opts_casesVS100,
      this.opts_mortalityVS100,
      this.opts_casesVS100
    ];
    let l = [];
    a.map(function(o) {
      const _o = o;
      l.push(
        loadData(o).then(function(data) {
          _o.vizData = data;
        })
      );
    });

    Promise.all(l).then(function() {
      _this.loaded = true;
    });
  }
};
</script>
