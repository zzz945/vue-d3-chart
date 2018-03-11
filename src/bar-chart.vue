<template lang="pug">
  svg.bar-chart(:width="width", :height="height")
    g(:transform="`translate(${padding}, ${padding})`")
      g(class="y-axis", v-axis:y="yAxis")
        text(class="label", fill="#000", transform="translate(60, 4)") {{axis.xLabel}}
      g(class="x-axis", v-axis:x="xAxis", :transform="`translate(0, ${dataViewHeight})`")
        text(class="label", fill="#000", :transform="`translate(${dataViewWidth - 10}, -20)`") {{axis.yLabel}}
      rect(v-for="r in rectList", :x="r.x", :y="r.y", :width="r.width", :height="r.height", :fill="r.color")
</template>

<script>
  import AxisDirectorMixin from './utils/_axis-director-mixin.js'

  const padding = 40

  export default {
    name: 'bar-chart',

    mixins: [AxisDirectorMixin],

		components: {
		},

    props: {
      axis: { // 坐标轴
        type: Object,
        required: true
      }, 
      dataset: { // 数据
        type: Array,
        required: true
      }, 
      width: {}, // 图表宽
      height: {}, // 图表高
      curve: {}, // 曲线类型，undefined为直线
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
      xDiv () {
        return this.axis.xDiv ? this.axis.xDiv : this.axis.x[1] - this.axis.x[0]
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
          div: this.xDiv
        };
      },
      yAxis () {
        return {
          scale: this.yScale,
          format: this.axis.yFormat,
          div: this.axis.yDiv
        };
      },
      bandWidth () {
        return this.dataViewWidth/this.xDiv
      },
      rectList () {
        return this.dataset.map(d => {
          const h = this.yScale(d.y)
          const w = this.bandWidth/2 // Bar宽度为X轴单位宽度的一半
          return {
            x: this.xScale(d.x) - w/2,
            y: h,
            width: w,
            height: this.dataViewHeight - h,
            color: d.color ? d.color : 'red'
          }
        })
      },
    },

    mounted() {
    },

    methods: {
    },
  }
</script>

<style lang="stylus">
  .bar-chart
    .tick text
      font-size: 14px
    .label
      font-size: 18px
      font-weight: bold
</style>
