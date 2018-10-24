<template>
  <div class="donut-outer">
    <svg class="donut-chart-extended"></svg>
  </div>
</template>

<script>
import BaseChart from './BaseChart'
import * as d3 from 'd3'

export default BaseChart.extend({
  name: 'donut-chart',
  props: ['data'],
  mounted: function () {
    window.addEventListener('resize', this.renderChart)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.renderChart)
  },
  methods: {
    renderChart () {
      const svgElement = this.$el.firstChild
      while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
      }

      if (!this.data.length) {
        return
      }

      const parent = this.$el.parentNode
      let baseSize

      if (window.innerWidth < 960) {
        baseSize = Math.min(parent.offsetWidth, window.innerWidth * 0.33)
      } else {
        baseSize = Math.min(parent.clientWidth, parent.clientHeight) - 16
      }

      const width = baseSize
      const height = width
      const radius = Math.min(width, height) / 2;
      const legendLeftOffset = 'calc(50% - 70px)'
      const legendTopOffset = (Math.min(width, height) - (this.data.length * 20)) / 2

      const outerRadius = (radius < 60) ? 60 : radius
      const innerRadius = (radius - 50) < 50 ? 50 : (radius - 50)

      const arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

      const pie = d3.pie()
        .sort(null)
        .value((data) => data.value);

      const svg = d3.select(this.$el)
        .select("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("height", height)
        .attr("width", width)
        .append("svg")
        .attr("class", "chart")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const g = svg.selectAll(".arc")
        .data(pie(this.data))
        .enter()
        .append("g")
        .attr("class", "arc");

      g.append("path")
        .attr("d", arc)
        .style("fill", (data) => data.data.color);

      const svgLegend = d3.select(this.$el)
        .select("svg")
        .append("svg")
        .attr("class", "legend");

      const legend = svgLegend.selectAll('.legend')
        .data(this.data)
        .enter()
        .append('g')
        .attr("class", "legend-item")
        .style("transform", (d, i) => `translate(${legendLeftOffset}, ${(i * 20) + legendTopOffset}px)`)
        
      legend.append('rect')
        .attr("x", 6)
        .attr("y", 2)
        .attr("width", 8)
        .attr("height", 8)
        .style("fill", (data) => data.color)
      
      legend.append('text')
        .attr("x", 20)
        .attr("y", 10)
        .text((data) => data.title)
        .attr("class", "textselected")
        .style("text-anchor", "start")
        .style("font-size", 12)
    }
  },
  watch: {
    data: 'renderChart'
  }
})
</script>