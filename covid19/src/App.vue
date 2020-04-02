<template>
  <div id="page-wrapper">
    <div id="content-wrapper">
      <div class="app-title">Exploring COVID-19 case counts</div>
      <div class="intro">
        <p>
          In the recent weeks, figures on COVID-19 cases around the world have really gone mad. Being confronted with those figures every day
          really made me go mad as well as I only saw case counts surging and death rates increasing. I didn't understand what was going on. Frankly, I was
          deeply worried about people and especially my young family. This is when I decided to have a more in depth look at the data myself. Structuring the information overload helps me to put
          worries aside and focus on what is actually going on.
        </p>

        <p>
          Disclaimer: This is a personal project, not a scientific summary of facts. It is a 
          collection of my personal observations and a summary of my own learning process that I went through when dealing with the COVID-19 data.
        </p>

      </div>
      <div>
        <p>
          Data source for all charts is data collected and provided by
          <a href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins University</a>. COVID-19 Visualizations
          out there have been steadily improving.
          <a
            href="https://www.zeit.de/wissen/gesundheit/2020-03/coronavirus-deutschland-infektionen-faelle-verbreitung-epidemie-karte#karte"
          >Zeit Online</a> publishes one of the most comprehensive and well structured
          ones that I found so far. All German speakers: Have a look at it!
        </p>

        <p>
          I use
          <a href="http://vuejs.org">Vue.js</a> and
          <a href="https://D3js.org">D3.js</a> to create interactive charts.
          Find the code on
          <a href="http://github.com/maxthemillion/covid-19">GitHub</a>.
          I plan to update this as things go on. So it may be worthwile to come back here in a few days
        </p>
      </div>
      <div v-if="loaded">
        <linechart v-bind="opts_casesVS100" />
      </div>
      <div>
        <p>
          This chart plots case counts with a twist: I normed all curves to the day where each country had their confirmed 100th case. It is 
          clear that many countries were not particularly successful in discovering cases early on. However, it makes the nations' paths 
          in this uphill fight somewhat comparable across time.
        </p> 
          
        <p>
          Plotting case counts on a linear y-axis scale chart shows what everyone is talking about: Exponential growth. In recent weeks, 
          transforming the y-axis to a log scale has become increasingly popular, as the trajectory becomes linear and more pleasant to the
          human eye. What I particularly like about the standard linear version is that - concerning case counts - you can easily spot Germany being on the same path as
          Italy. The difference is, that Italy is few weeks ahead.
        </p>

        <p>
          A few countries, such as Spain and the US, presumably have higher growth rates. From what I read about testing in these countries, I would
          assume reasons for those higher growth rates can partly be seen in a delay in testing. Take the US for example: Testing kits were not available,
          officials denied necessity to test on a larger scale. With New York becoming one of the hotspots of COVID-19 in the western world, 
          efforts have changed dramatically. The US tested much more than before and is uncovering many cases that previously went undetected. We will
          thus see smaller growth rates soon as "old cases" are then covered and only new cases will add to the curve. 
          However, this does not mean that efforts to contain the spread are already working.
        </p>

        <p>
          When viewing COVID-19 case counts, we need to keep one important thing in mind: There is no standard procedure to count infections. 
          In fact, countries such as China have changed their criteria for counting someone as infected multiple times. Other countries
          have not changed their procedures officially but testing capacity are limited and more cases may go undetected the more people are 
          infected. To assess severity of the spread across countries, we should thus ask another question that may be more robust to 
          differences in testing procedures:
        </p>

      </div>

      <div v-if="loaded">
        <linechart v-bind="opts_deathsVS100" />
      </div>

      <div>
        <p>
          For non-medical naives such as me, the chance for deaths from COVID-19 to go undetected seems to be much lower than missing out on infections.
          Therefore I expect that deaths mirror the severity of the outbreak across countries much more accurate than the potentially highly biased 
          infection counts. In fact, the figures paint a very different picture of Germany's and Italy's situation. The trajectories do not match. 
          Why is that?

        </p>

      </div>

      <div v-if="loaded">
        <linechart v-bind="opts_mortalityVS100" />
      </div>
    </div>
  </div>
</template>

<script>
import linechart from "@bit/maxthemillion.d3charts.c-line";
//import selector from "./components/Select.vue";
import { loadData } from "@bit/maxthemillion.d3charts.utils";
import * as d3 from "d3";

export default {
  name: "App",
  components: {
    linechart
  },
  data() {
    return {
      loaded: false,
      selectVals: ["Italy", "Germany", "France"],
      opts_deathsVS100: {
        dataURL: "./data/all_sel.csv",
        chartTitle: "How do deaths develop?",
        chartSubTitle: "Confirmed COVID19 deaths",
        commentTitle: "Exponential growth with a lag",
        binding: {
          x: "days_since100",
          xType: "Q",
          y: "deaths",
          yType: "Q",
          color: "country",
          colorType: "N"
        },
        scale: {
          x: d3.scaleLinear(),
          y: d3.scaleLinear(),
          color: d3.scaleOrdinal()
        },
        format: {
          y: d3.format("~s")
        },
        xAxisTitle: "Days since 100th case",
        yAxisTitle: null,
        colorScheme: ["#0e84ff"],
        colorHighlight: ["Germany", "Italy"],
        annotations: []
      },
      opts_mortalityVS100: {
        dataURL: "./data/all_sel.csv",
        chartTitle: "Does mortality differ across countries?",
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
        colorScheme: ["#0e84ff"],
        colorHighlight: ["Germany", "Italy"],
        annotations: []
      },
      opts_casesVS100: {
        dataURL: "./data/all_sel.csv",
        chartTitle: "What are the latest case counts?",
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
          y: d3.format("~s")
        },
        scale: {
          x: d3.scaleLinear(),
          y: d3.scaleLinear(),
          color: d3.scaleOrdinal()
        },
        xAxisTitle: "Days since 100th case",
        yAxisTitle: null,
        colorScheme: ["#0e84ff"],
        colorHighlight: ["Germany", "Italy"],
        annotations: []
      }
    };
  },
  methods: {
    setSelect: function(selection) {
      this.opts_casesVS100.colorHighlight = [selection];
      this.opts_mortalityVS100.colorHighlight = [selection];
      this.opts_deathsVS100.colorHighlight = [selection];
    }
  },
  beforeMount: function() {
    const _this = this;
    let a = [
      this.opts_casesVS100,
      this.opts_mortalityVS100,
      this.opts_deathsVS100
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

<style lang="scss" scoped>
#page-wrapper {
  font-family: "Raleway";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
  align-items: center;

  line-height: 1.6em;
}

#content-wrapper {
  max-width: 800px;
}

.app-title {
  line-height: 3em;
  font-size: 2.5em;
}

.intro {
  font-weight: bold;
}

a,
a:visited {
  color: #0e84ff;
  text-decoration: none;
}
</style>
