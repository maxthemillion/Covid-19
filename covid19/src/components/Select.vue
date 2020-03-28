<template>
  <div id="select-wrapper">
    <select id="selector"> </select>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "selector",
  props: {
    selectVals: {
      type: Array,
      default: function() {
        return [
          "",
          "OneDrive",
          "waffleio",
          "getnikola",
          "Tribler",
          "BobPalmer",
          "novus",
          "rathena",
          "gatsbyjs"
        ];
      }
    },
    data: function() {
      return {
        selection: "",
        transitionDuration: 100
      };
    },
    methods: {
      addOptions: function() {
        d3.select("#selector").on("change", this.dropdownChange);
        d3.select("#selector")
          .selectAll("option")
          .data(this.selectVals)
          .enter()
          .append("option")
          .attr("value", d => d)
          .text(d => d);
      },
      showOptions: function() {
        d3.select("#selector")
          .transition()
          .delay(this.transitionDuration)
          .duration(this.transitionDuration);
      },
      dropdownChange: function() {
        this.selection = d3.select("#selector").property("value");
        this.$emit("userSelect", this.selection);
      }
    },
    computed: {},
    mounted() {
      this.addOptions();
      this.showOptions();
    }
  }
};
</script>

<style scoped></style>
