<template lang="pug">
  svg.radar-chart(:width="width", :height="height")
    g(v-for="(d, i) in dataset", :transform="`translate(${padding + 90*i}, ${padding})`")
      rect(:x="0", :y="0", :width="20", :height="8", :fill="d.color")
      text(:x="30", :y="8", fill="#000") {{d.label}}
    g(:transform="`translate(${padding }, ${padding + descriptionHeight})`")
      //- 描述
      text(v-for="(label, i) in dimensions",
        :transform="`translate(${radarRaidus + textRasius * Math.sin(angles[i]) - padding/3}, ${radarRaidus - textRasius * Math.cos(angles[i]) + padding/6})`") {{label}}
      //- 画网
      polygon(v-for="(n, i) in nets", :points="n", :style="{fill: 'none', stroke: 'gray'}")
      line(v-for="(p, i) in mostOutsizePolygon", :x1="p.x", :y1="p.y", :x2="radarRaidus", :y2="radarRaidus", :style="{stroke: 'gray'}")
      //- 画数据轮廓
      polygon(v-for="(d, i) in dataPolygons", :points="d", :style="{fill: dataset[i].color, fillOpacity: 0.1, stroke: dataset[i].color, strokeWidth: 2}")
       //- 网每层的数值显示
      text(v-for="(v, i) in netValues",
        :transform="`translate(${radarRaidus + 4}, ${radarRaidus * (100-v)/100})`") {{v}}
</template>

<script>
  const padding = 50
  const descriptionHeight = 60

  export default {
    name: 'radar-chart',

		components: {
		},

    props: {
      dataset: { // 数据
        type: Array,
        required: true
      },
      dimensions: { //维度
        type: Array,
        required: true
      },
      width: { // 图表宽
        type: Number,
        required: true
      },
    },

    data () {
      return {
        padding,
        descriptionHeight,
        netValues: [100, 80, 60, 40, 20]
      }
    },

		watch: {
    },

    computed: {
      height () {
        return this.width + descriptionHeight
      },
      dataViewHeight () {
        return this.height - 2*this.padding
      },
      dataViewWidth () {
        return this.width - 2*this.padding
      },
      radarRaidus () {
        return this.dataViewWidth/2
      },
      textRasius () {
        return this.radarRaidus + this.padding/2
      },
      // 返回网格数组包含每层数据，直接用于svg polygon
      nets () {
        return this.netValues.map(v => {
          return this.dimensions.map((label, i) => {
            const point = this.valueToPoint(v, i)
            return point.x + ',' + point.y
          }).join(' ')
        })
      },
      // 最外层多边形坐标，返回{x, y}数组
      mostOutsizePolygon () {
        return this.dimensions.map((_, i) => {
          return this.valueToPoint(100, i)
        })
      },
      // 根据dataset计算出的多边形数组，直接用于svg polygon
      dataPolygons () {
        return this.dataset.map(item => {
          return item.d.map((v, i) => {
            const point = this.valueToPoint(v, i)
            return point.x + ',' + point.y
          }).join(' ')
        })
      },
      angles () {
        var total = this.dimensions.length
        return this.dimensions.map((_, i) => Math.PI * 2 / total * i)
      }
    },

    mounted() {
    },

    methods: {
      valueToPoint (value, index) {
        var total = this.dimensions.length
        var r = this.radarRaidus
        var x     = 0
        var y     = -r*value/100
        var angle = Math.PI * 2 / total * index
        var cos   = Math.cos(angle)
        var sin   = Math.sin(angle)
        var tx    = x * cos - y * sin + r
        var ty    = x * sin + y * cos + r
        return {
          x: tx,
          y: ty
        }
      }
    },
  }
</script>

<style lang="stylus">
  .radar-chart
    .label
      font-size: 18px
      font-weight: bold
</style>
