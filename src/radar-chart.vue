<template lang="pug">
  svg.radar-chart(:width="width", :height="height")
    g(:transform="`translate(${padding}, ${padding})`")
      //- 画坐标系
      g(:transform="`translate(0, ${descriptionHeight})`")
        //- 维度Label
        text.dimension-label(v-for="(label, i) in dimensions",
          :transform="`translate(${(radarRaidus + textRasius * Math.sin(angles[i]) - padding/3).toFixed()}, ${(radarRaidus - textRasius * Math.cos(angles[i]) + padding/6).toFixed()})`",
          @click="onClickDimensionLabel(i)") {{label}}
        //- 画网
        polygon(v-for="(n, i) in nets", :points="n", :style="{fill: 'none', stroke: 'gray'}")
        line(v-for="(p, i) in mostOutsizePolygon", :x1="p.x", :y1="p.y", :x2="radarRaidus", :y2="radarRaidus", :style="{stroke: 'gray'}")
        //- 网每层的数值显示
        text(v-for="(v, i) in netValues",
          :transform="`translate(${radarRaidus + 4}, ${radarRaidus * (100-v)/100})`") {{v}}
      //- 画数据
      g.group(v-for="item in dataPolygons", @click="onClickGroup(item.index)", v-on:mouseover="onGroupHover(item.index)")
        //- 数据Label
        g.label(:transform="`translate(${90*item.index}, 0)`")
          rect(:x="0", :y="0", :width="20", :height="8", :fill="dataset[item.index].color")
          text(:x="30", :y="8", fill="#000") {{dataset[item.index].label}}
        //- 数据多边形
        g(:transform="`translate(0, ${descriptionHeight})`")
          polygon.data-polygon(:points="item.d",
            :style="{fill: dataset[item.index].color, stroke: dataset[item.index].color}")

</template>

<script>

  import _cloneDeep from 'lodash/cloneDeep'

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
        netValues: [100, 80, 60, 40, 20],
        focusIndex: 0,
        ACT_CLICK: 1,
        ACT_CLICK_DIMENSION_LABEL: 2
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
      // 根据dataset和focusIndex计算出的多边形数组，直接用于svg polygon
      dataPolygons () {
        // svg中不支持通过style设置z-index, 而是最后一个子元素z-index最高
        // 这里把focusIndex对应的数据放到末尾使其位于最上层
        const ds = _cloneDeep(this.dataset).map((d, i) => {
          d.index = i
          return d
        })
        const focusItem = ds[this.focusIndex]
        ds.splice(this.focusIndex, 1)
        ds.push(focusItem)

        // 构建Polygons
        return ds.map(item => {
          const d = item.d.map((v, i) => {
            const point = this.valueToPoint(v, i)
            return point.x + ',' + point.y
          }).join(' ')
          return {
            index: item.index, // 原dataset中的index
            d
          }
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
          x: tx.toFixed(2),
          y: ty.toFixed(2)
        }
      },
      onClickGroup (i) {
        this.$emit('action', {
          origin: this,
          act: this.ACT_CLICK,
          payload: i
        })
      },
      onClickDimensionLabel (i) {
        this.$emit('action', {
          origin: this,
          act: this.ACT_CLICK_DIMENSION_LABEL,
          payload: i
        })
      },
      onGroupHover (i) {
        this.focusIndex = i
      }
    },
  }
</script>

<style lang="stylus">
  .radar-chart
    .group
      cursor pointer
      .data-polygon
        stroke-width: 2
        fill-opacity 0.2
      &:hover .label
        opacity 0.5
      &:hover .data-polygon
        fill-opacity 1
    .dimension-label
      cursor pointer
</style>
