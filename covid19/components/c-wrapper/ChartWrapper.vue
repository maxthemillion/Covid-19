<template>
  <div id="pageWrapper">
    <div id="contentWrapper">
      <div id="chartTitle" ref="chartTitle" v-if="chartTitle !== null">
        {{ this.chartTitle }}
      </div>
      <div id="chartSubTitle" v-if="chartSubTitle !== null">
        {{ this.chartSubTitle }}
      </div>
      <div id="chartWrapper" ref="chartWrapper">
        <div class="xAxisTitle axisTitle" v-if="xAxisTitle !== null">
          {{ this.xAxisTitle }}
        </div>
        <div class="yAxisTitle axisTitle" v-if="yAxisTitle !== null">
          {{ this.yAxisTitle }}
        </div>
        <svg id="yAxisViewport">
          <g ref="yAxis" class="yaxis axis" transform="translate(50, 0)" />
        </svg>
        <svg id="chartSVG" ref="chartSVG">
          <g ref="chartGroup">
            <g ref="plotArea" transform="translate(0,0)" />
            <g ref="plotLegend" />
          </g>
        </svg>
        <svg id="xAxisViewport">
          <g ref="xAxis" class="xaxis axis" />
        </svg>
      </div>
      <div id="comment">
        <b>{{ this.commentTitle }}</b> - {{ this.comment }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ChartWrapper",
  props: {
    chartTitle: {
      type: String,
      default: "Chart Title"
    },
    chartSubTitle: {
      type: String,
      default: "subtitle"
    },
    comment: { type: String, default: "comment" },
    commentTitle: { type: String, default: "comment title" },
    xAxisTitle: { type: String, default: "xAxis" },
    yAxisTitle: { type: String, default: "yAxis" }
  },
  data: function() {
    return {};
  },
};
</script>

<style lang='scss'>
@import '~@bit/maxthemillion.d3charts.styles';

.axisTitle {
  font-size: small;
  font-weight: bold;
}

.xAxisTitle {
  position: absolute;
  bottom: 2px;
  right: 0;
}

.yAxisTitle {
  position: absolute;
  bottom: 10%;
  left: -40px;
  transform: rotate(-90deg);
  transform-origin: top left;
}

.chartLine {
  fill: none;
  stroke: black;
}

#pageWrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
}

#contentWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  max-width: 700px;
}

#chartWrapper {
  height: 400px;
  width: 100%;
  position: relative;
}

#chartSVG {
  height: 100%;
  width: 100%;
  overflow: visible;
}

#chartTitle {
  font-size: $h2size;
  margin: 0.5em 0 0 0;
  text-align: left;
  width: 100%;
}

#chartSubTitle {
  font-size: $h5size;
  text-align: left;
  margin-bottom: 1rem;
  width: 100%;
}

#comment {
  font-size: $psize*0.8;
  margin-top: 30px;
  width: 100%;
  text-align: left;
}

#xAxisViewport {
  width: 100%;
  overflow: visible;
  position: absolute;
  height: 50px;
  bottom: -50px;
  left: 0;
}
#yAxisViewport {
  overflow: visible;
  width: 50px;
  height: 100%;
  position: absolute;
  left: -50px;
}
</style>