<template>
  <div id="page-wrapper">
    <div id="content-wrapper">
      <div><h1>What do COVID-19 case counts really tell us?</h1></div>
      <visitbar />
      <div class="intro text-block">
        <p>
          In recent weeks, figures on COVID-19 cases around the world have been soaring and with them I went mad as well. Frankly, I was
          deeply worried about people and especially my young family. This is when I decided to have a more in depth look at the data myself. Structuring the information overload helps me to put worries aside and focus on what is actually going on.
        </p>
      </div>
      
      <div class="text-block">
        <p>
          <i>Disclaimer: This is a collection of my <u>personal observations</u> that I made when dealing with the COVID-19 data and researching news coverage.
          </i>
        </p>

        <p>
          Data source for all charts is data collected and provided by
          <a href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins University</a>. 
          I use <a href="http://vuejs.org">Vue.js</a> and <a href="https://D3js.org">D3.js</a> to create interactive charts.
          Find the code on <a href="http://github.com/maxthemillion/covid-19">GitHub</a>. I plan to update this as things go on. So it may be worthwile to come back here in a few days
        </p>

        <p>
          <b>Let's dive into it by asking what everyone seems to ask themsevles at the moment...</b>
        </p>

      </div>
      
      <linechart v-if="loaded" v-bind="opts_casesVS100" />

      <div class="text-block">
        <p>
          I plot case counts with a twist widely adopted by COVID-19 visualizations: All curves were normed to the day where each country had their confirmed 100th case. It is clear that many countries were not particularly successful in discovering cases early on. However, it makes the nations' paths in this uphill fight somewhat comparable across time.
           publishes one of the most comprehensive and well structured
          ones that I found so far. All German speakers: Have a look at it!
        </p> 
          
        <p>
          Plotting case counts on a linear y-axis scale chart shows what everyone is talking about: Exponential growth. In recent weeks, 
          transforming the y-axis to a log scale has become increasingly popular, as the trajectory becomes linear and more pleasant to the human eye. Also my favourite COVID-19 report uses that scale. What I dislike about the log-transformed version is that it becomes much harder to spot huge differences in case counts. If you compare the linear display of US and Italy counts above to the log-display that eg. <a href="https://www.zeit.de/wissen/gesundheit/2020-03/coronavirus-deutschland-infektionen-faelle-verbreitung-epidemie-karte#karte">Zeit Online</a> publishes, you'll have a much harder time figuring out that the US has already more than twice as much confirmed cases (as of 04. Apr 2020).
        </p>

        <p>
          Have a look at the chart above again: I highlight Italy and Germany because they seem to follow the same trajectory. Other countries, such as Spain and the US, presumably have higher growth rates. In other countries such as the UK, France and particularly South Korea, case counts increase. But can we conclude that the pandemic spreads with different speeds in those countries?
        </p>

        <p>
          When looking at COVID-19 case counts, we need to keep one important thing in mind: There is no standard procedure to count infections. In fact, countries such as China have changed their criteria for counting someone as infected multiple times. Other countries have not changed their procedures officially but testing capacity are limited and more cases go undetected the more people are infected.
        </p>

        <p>
          I argue that <span class='text-highlight'>case counts are by no means a measue that should be compared across countries</span> if you intend to view the speed with which the pandemic is expanding. At best, case counts may give you a hint how good countries are in uncovering infections.
        </p>

        <p>  
          To compare the severity and the speed of the spread across countries, the number of COVID-19 deaths may be a more reasonable figure to look at. For non-medical naives such as me, the chance for deaths from COVID-19 to go undetected seems to be much lower than missing out on infections. Therefore I expect that deaths mirror the severity of the outbreak across countries much more accurate than the potentially highly biased 
          infection counts.
        </p>

      </div>

      
      <linechart v-if="loaded" v-bind="opts_deathsVS100" />

      <div class="text-block">
        <p>
          In fact, the figures paint a very different picture of Germany's and Italy's situation. The trajectories do not match. 
          Why is that?

        </p>

      </div>

      <linechart v-if="loaded" v-bind="opts_mortalityVS100" />

    </div>
  </div>
</template>

<script>
import linechart from "@bit/maxthemillion.d3charts.c-line";
//import selector from "./components/Select.vue";
import { loadData } from "@bit/maxthemillion.d3charts.utils";
import visitbar from './components/UI/VisitBar/VisitBar.vue'
import * as d3 from "d3";

export default {
  name: "App",
  components: {
    linechart,
    visitbar
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
@import '~@bit/maxthemillion.d3charts.styles';

#page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#content-wrapper {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.intro {
  font-weight: bold;
}

.text-block {
  max-width: 50rem;
}

.text-highlight{
  background-color:#ffeb3d;
}

</style>
