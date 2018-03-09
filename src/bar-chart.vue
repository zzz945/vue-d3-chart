<template lang="pug">
  .bar-chart
    svg(:width="width", :height="height")
      g(:transform="`translate(${padding}, ${padding})`")
        g(v-axis:y="yAxis")
        g(v-axis:x="xAxis", :transform="`translate(0, ${dataViewHeight})`")
        path(:d="line")
</template>

<script>
  import AxisDirectorMixin from './utils/_axis-director-mixin.js'

  const padding = 40

  export default {
    name: 'bar-chart',

    mixins: [AxisDirectorMixin],

		components: {
		},

    props: ['axis', 'dataset', 'width', 'height'],

    data () {
      return {
        padding,
      }
    },

		watch: {
    },

    computed: {
      dataViewHeight () {
        return this.height - 2*this.padding
      },
      dataViewWidth () {
        return this.width - 2*this.padding
      },
      xScale () {
        return d3.scaleLinear()
          .domain(this.axis.x)
          .range([0, this.dataViewWidth]);
      },
      yScale () {
        return d3.scaleLinear()
          .domain(this.axis.y)
          .range([this.dataViewHeight, 0]);
      },
      xAxis () {
        return {
          scale: this.xScale,
          div: this.axis.xDiv
        };
      },
      yAxis () {
        return {
          scale: this.yScale,
          div: this.axis.yDiv
        };
      },
      line () {
        const path = d3.line()
          .x(d => this.xScale(d.name))
          .y(d => this.yScale(d.value));
        return path(this.dataset)
      }
    },

    mounted() {
    },

    methods: {
    },
  }
</script>

<style lang="stylus" scoped>
  .bar-chart
    font-size: 20px
</style>
