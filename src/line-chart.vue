<template lang="pug">
  svg.line-chart(:width="width", :height="height")
    g(:transform="`translate(${padding}, ${padding})`")
      g.x-axis(v-axis:y="yAxis")
        text.label(fill="#000", transform="translate(60, 4)") {{axis.xLabel}}
      g.y-axis(v-axis:x="xAxis", :transform="`translate(0, ${dataViewHeight})`")
        text.label(fill="#000", :transform="`translate(${dataViewWidth - 10}, -20)`") {{axis.yLabel}}
      g.grid(v-show="showGrid")
        line(v-for="x in gridX", :x1="x", :y1="0", :x2="x", :y2="dataViewHeight")
        line(v-for="y in gridY", :x1="0", :y1="y", :x2="dataViewWidth", :y2="y")
      g.group(v-for="(l, i) in lines", @click="onClickGroup(i)")
        //- 沿着线画一条粗的透明线用来扩大click和hover区域
        path(:d="l.d", :style="{fill: 'none', stroke: 'transparent', strokeWidth: 20}")
        //- 画线
        path(:d="l.d", :style="{fill: 'none', stroke: l.stroke, strokeWidth: 2}")
        //- 画label
        g(v-if="lines.length > 1",
          :transform="`translate(${dataViewWidth - 80}, ${20*i})`")
          rect(:x="0", :y="0", :width="20", :height="4", :fill="l.stroke")
          text(:x="40", :y="8", fill="#000") {{l.label}}
      g.dots(v-show="showGrid")
        template(v-for="(l, i1) in scaledDataset")
          circle(v-for="(p, i2) in l", :cx="p.x", :cy="p.y", :r="4", @click="onClickDot(i1, i2)")
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
      showGrid: { // 显示格子
        type: Boolean,
        required: false
      }
    },

    data () {
      return {
        padding,
        ACT_CLICK_LINE: 1,
        ACT_CLICK_DOT: 2
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
      gridX () {
        const [start, end] = this.axis.x
        return d3.ticks(start, end, this.axis.xDiv).map(x => +this.xScale(x).toFixed(2))
      },
      gridY () {
        const [start, end] = this.axis.y
        return d3.ticks(start, end, this.axis.yDiv).map(y => +this.yScale(y).toFixed(2))
      },
      scaledDataset () {
        if (Array.isArray(this.line)) {
          return this.line.map(l => {
            return l.dataset.map(p => {
              return {
                x: +this.xScale(p.x).toFixed(2),
                y: +this.yScale(p.y).toFixed(2)
              }
            })
          })
        } else {
          const scaled = this.line.dataset.map(p => {
            return {
              x: +this.xScale(p.x).toFixed(2),
              y: +this.yScale(p.y).toFixed(2)
            }
          })
          return [scaled]
        }
      },
      lines () {
        let path = d3.line()
          .x(d => +this.xScale(d.x).toFixed(2))
          .y(d => +this.yScale(d.y).toFixed(2));

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
      onClickGroup (i) {
        this.$emit('action', {
          origin: this,
          act: this.ACT_CLICK_LINE,
          payload: i
        })
      },
      onClickDot (lineIndex, pointIndex) {
        this.$emit('action', {
          origin: this,
          act: this.ACT_CLICK_DOT,
          payload: {
            lineIndex,
            pointIndex
          }
        })
      }
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
    .group
      cursor pointer
      &:hover
        opacity 0.5
    .grid line
      stroke: gray
    .dots circle
      cursor pointer
      stroke: black
</style>