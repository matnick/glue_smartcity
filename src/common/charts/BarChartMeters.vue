<template>
  <div :class="className"></div>
</template>

<script>
import BaseChart from './BaseChart'
import * as d3 from 'd3'

export default BaseChart.extend({
  name: 'bar-chart',
  props: ['data', 'hideAxis', 'fillParent', 'isDashboard', 'maxValue', 'barColor'],
  data: () => ({
    className: 'bar-chart'
  }),
  mounted: function () {
    window.addEventListener('resize', this.renderChart)
    let that = this

    setTimeout(function() {
      that.renderChart()
    }, 1)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.renderChart)
  },
  methods: {
    renderChart () {
      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild);
      }

      if (!this.data.length) {
        return
      }

      let width;
      let height;
      const parent = this.$el.parentNode;

      if (this.fillParent) {
        width = parent.clientWidth
        height = parent.clientHeight
      } else if (this.isDashboard) {
        width = parent.clientWidth
        height = parent.clientHeight / 4
      } else {
        let baseSize;

        if (window.innerWidth < 960) {
          baseSize = Math.min(parent.offsetWidth, window.innerWidth * 0.5)
        } else {
          baseSize = Math.min(parent.clientWidth, parent.clientHeight) - 16
        }

        if (parent.clientWidth - parent.clientHeight >= 100) {
          height = baseSize
          width = height / 0.75
        } else {
          width = baseSize
          height = width * 0.75
        }
      }
      
      const ticksHidden = width < 300 || this.hideAxis
      const padding = ticksHidden ? 8 : 24
      
      let svg = d3.select(this.$el).append("svg").attr("width", width).attr("height", height);

      var xScale = d3.scaleBand()
        .rangeRound([padding, width - padding])
        .padding(0.1)
        .domain(this.data.map((d) => d.title));

      var yScale = d3.scaleLinear()
        .domain([0, this.maxValue ? this.maxValue : d3.max(this.data, (d) => d.value)])
        .range([height - padding, padding]);

      if (ticksHidden) {
        this.className = `bar-chart axis-hidden`
        svg.append("g")
          .attr("transform", "translate(" + 0 + "," + (height - padding) + ")")
          .call(d3.axisBottom(xScale).tickSizeOuter(0).tickSizeInner(0).tickFormat(''));

        svg.append("g")
          .attr("transform", "translate(" + padding + "," + 0 + ")")
          .call(d3.axisLeft(yScale).tickSizeOuter(0).tickSizeInner(0).tickFormat(''));
      } else {
        svg.append("g")
          .attr("transform", "translate(" + 0 + "," + (height - padding) + ")")
          .call(d3.axisBottom(xScale));

        svg.append("g")
          .attr("transform", "translate(" + padding + "," + 0 + ")")
          .call(d3.axisLeft(yScale));
      }

      svg.append("g")
        .selectAll("rect")
        .data(this.data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.title))
        .attr("y", (d) => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - padding - yScale(d.value))
        .attr("fill", this.barColor ? this.barColor : 'steelblue');
    }
  },
  watch: {
    data: 'renderChart'
  }
})
</script>