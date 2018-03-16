<template lang="pug">
  svg.line-chart(:width="width", :height="height")
    g(:transform="`translate(${padding}, ${padding})`")
      //- X轴
      g.x-axis(v-axis:y="yAxis")
        text.label(fill="#000", transform="translate(60, 4)") {{axis.xLabel}}
      //- Y轴
      g.y-axis(v-axis:x="xAxis", :transform="`translate(0, ${dataViewHeight})`")
        text.label(fill="#000", :transform="`translate(${dataViewWidth - 10}, -20)`") {{axis.yLabel}}
      //- 网格
      g.grid(v-show="showGrid")
        line(v-for="x in gridX", :x1="x", :y1="0", :x2="x", :y2="dataViewHeight")
        line(v-for="y in gridY", :x1="0", :y1="y", :x2="dataViewWidth", :y2="y")
      //- 数据
      g.group(v-for="(l, i) in pathDataOfLines", @click="onClickGroup(i)")
        //- 沿着线画一条粗的透明线用来扩大click和hover区域
        path(:d="l.d", :style="{fill: 'none', stroke: 'transparent', strokeWidth: 20}")
        //- 画线
        path(:d="l.d", :style="{fill: 'none', stroke: l.stroke, strokeWidth: 2}")
        //- 画label
        g(v-if="pathDataOfLines.length > 1",
          :transform="`translate(${dataViewWidth - 80}, ${20*i})`")
          rect(:x="0", :y="0", :width="20", :height="4", :fill="l.stroke")
          text(:x="40", :y="8", fill="#000") {{l.label}}
        //- 画点
        g.dots(v-show="showDots")
          circle(v-for="(p, j) in scaledDataset[i]", :cx="p.x", :cy="p.y", :r="4", @click.stop="onClickDot(i, j)")
      //- 跟踪鼠标交叉线
      g.cross(v-show="trackMouse", v-on:mousemove="onMouseMove", v-on:mouseleave="onMouseLeave")
        rect.placeholder(:x="0", :y="0", :width="dataViewWidth", :height="dataViewHeight", fill="transparent")
        template(v-for="(p, i) in crossLine")
          //- 竖线只画一条
          template(v-if="!i")
            line(:x1="p.xScaled", :y1="0", :x2="p.xScaled", :y2="dataViewHeight")
            text(:x="p.xScaled + 8", :y="0") {{p.x}}
          //- 横线
          template
            line(:x1="0", :y1="p.yScaled", :x2="dataViewWidth", :y2="p.yScaled")
            text(:x="8", :y="p.yScaled - 8") {{p.y}}
          //- 交点
          circle(:cx="p.xScaled", :cy="p.yScaled", :r="4")
</template>

<script>
  import AxisDirectorMixin from './utils/_axis-director-mixin.js'
  import _inRange from 'lodash/inRange'
  import _throttle from 'lodash/throttle'

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
      },
      showDots: { // 显示点
        type: Boolean,
        required: false
      },
      trackMouse: {
        type: Boolean, // 跟踪鼠标显示十字坐标
        required: false
      }
    },

    data () {
      return {
        padding,
        ACT_CLICK_LINE: 1,
        ACT_CLICK_DOT: 2,
        crossLine : []
      }
    },

		watch: {
    },

    computed: {
      // 确保line为数组, 如果不是转成数组
      lines () {
        return Array.isArray(this.line) ? this.line : [this.line]
      },
      // dataViewHeight & dataViewWidth: 图表数据区域宽和高
      dataViewHeight () {
        return this.height - 2*this.padding
      },
      dataViewWidth () {
        return this.width - 2*this.padding
      },
      // xScale & yScale: 数据坐标到视图坐标转换器
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
      // xAxis & yAxis: 坐标轴数据
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
      // gridX & gridY: 网格横竖坐标集合
      gridX () {
        const [start, end] = this.axis.x
        return d3.ticks(start, end, this.axis.xDiv).map(x => +this.xScale(x).toFixed(2))
      },
      gridY () {
        const [start, end] = this.axis.y
        return d3.ticks(start, end, this.axis.yDiv).map(y => +this.yScale(y).toFixed(2))
      },
      // 返回每组数据对应的视图坐标
      scaledDataset () {
        return this.lines.map(l => {
          return l.dataset.map(p => {
            return {
              x: +this.xScale(p.x).toFixed(2),
              y: +this.yScale(p.y).toFixed(2)
            }
          })
        })
      },
      // 返回每组数据对应的svg path data
      pathDataOfLines () {
        let path = d3.line()
          .x(d => +this.xScale(d.x).toFixed(2))
          .y(d => +this.yScale(d.y).toFixed(2));

        return this.lines.map(l => {
          const p = l.curve ? path.curve(l.curve) : path
          return {
            d: p(l.dataset),
            label: l.label,
            stroke: l.color ? l.color : 'black'
          }
        })
      },
    },

    mounted() {
    },

    methods: {
      // 点击每组数据对应的视图元素，包括线和label等
      onClickGroup (i) {
        this.$emit('action', {
          origin: this,
          act: this.ACT_CLICK_LINE,
          payload: i
        })
      },
      // 点击数据点
      onClickDot (lineIndex, pointIndex) {
        this.$emit('action', {
          origin: this,
          act: this.ACT_CLICK_DOT,
          payload: {
            lineIndex,
            pointIndex
          }
        })
      },
      // onMouseMove & onMouseLeave: 鼠标在数据区域内移动和离开
      onMouseMove (e) {
        const _onMouseMove = _throttle(e => {
          const offsetX = e.offsetX - this.padding
          if (!_inRange(offsetX, 0, this.dataViewWidth)) return
          const x = this.xScale.invert(offsetX).toFixed(2)
          const bisect = d3.bisector(d => d.x).left
          this.crossLine = this.lines.map(l => {
            const i = bisect(l.dataset, x)
            const p0 = l.dataset[i]
            const p1 = l.dataset[i - 1]
            const y = +(p0.y + (p1.y - p0.y)/(p1.x - p0.x) * (x - p0.x)).toFixed(2)
            return {
              x,
              y,
              xScaled: offsetX,
              yScaled: +this.yScale(y).toFixed(2)
            }
          })
        }, 20)
        _onMouseMove(e)
      },
      onMouseLeave () {
        this.crossLine  = []
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
    .cross
      circle
        stroke: black
      line
        stroke: black
      text
        fill: black
</style>