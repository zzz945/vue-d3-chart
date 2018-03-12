<template lang="pug">
  svg.line-chart(:width="width", :height="height")
    g(:transform="`translate(${padding}, ${padding})`")
      g(class="x-axis", v-axis:y="yAxis")
        text(class="label", fill="#000", transform="translate(60, 4)") {{axis.xLabel}}
      g(class="y-axis", v-axis:x="xAxis", :transform="`translate(0, ${dataViewHeight})`")
        text(class="label", fill="#000", :transform="`translate(${dataViewWidth - 10}, -20)`") {{axis.yLabel}}
      path(v-for="l in lines", :d="l.d", :style="{fill: 'none', stroke: l.stroke}")
      g(v-if="lines.length > 1", v-for="(l, i) in lines", :transform="`translate(${dataViewWidth - 80}, ${20*i})`")
        rect(:x="0", :y="0", :width="20", :height="4", :fill="l.stroke")
        text(:x="40", :y="8", fill="#000") {{l.label}}
</template>

<script>
  import AxisDirectorMixin from './utils/_axis-director-mixin.js'

  const padding = 40

  export default {
    name: 'line-chart',

    mixins: [AxisDirectorMixin],

		components: {
		},

    props: {
      axis: { // 坐标轴
        type: Object,
        required: true
      },
      line: { // 数据
        type: Array | Object,
        required: true
      },
      width: { // 图表宽
        type: Number,
        required: true
      },
      height: { // 图表高
        type: Number,
        required: true
      },
    },

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
          format: this.axis.xFormat,
          div: this.axis.xDiv
        };
      },
      yAxis () {
        return {
          scale: this.yScale,
          format: this.axis.yFormat,
          div: this.axis.yDiv
        };
      },
      lines () {
        let path = d3.line()
          .x(d => this.xScale(d.x))
          .y(d => this.yScale(d.y));

        if (Array.isArray(this.line)) {
          return this.line.map(l => {
            const p = l.curve ? path.curve(l.curve) : path
            return {
              d: p(l.dataset),
              label: l.label,
              stroke: l.color ? l.color : 'black'
            }
          })
        }
        path = this.line.curve ? path.curve(this.line.curve) : path

        return [{
          d: path(this.line.dataset),
          label: this.line.label,
          stroke: this.line.color ? this.line.color: 'black'
        }]
      }
    },

    mounted() {
    },

    methods: {
    },
  }
</script>

<style lang="stylus">
  .line-chart
    .tick text
      font-size: 14px
    .label
      font-size: 18px
      font-weight: bold
</style>