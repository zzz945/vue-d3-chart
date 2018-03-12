<template lang="pug">
  .bar-chart-demo
    p.title Bar Chart Demo
    bar-chart(:width="800", :height="400", :axis="axis", :dataset="dataset")
</template>

<script>
import {BarChart} from '../src/index.js'

export default {
  name: "bar-chart-demo",

  components: {
    BarChart
  },

  data () {
    return {
      axis: {
        x: [-1, 7],
        xFormat (d) {
          if (d === -1 || d === 7) return ''
          return ['Sunday', 'Monday', 'Tudsday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d]
        },
        y: [0, 100],
        yDiv: 10,
        xLabel: "Day",
        yLabel: "Temp",
      },
      dataset: [
        {x: 0, y: 84, color: 'red'},
        {x: 1, y: 57, color: 'green'},
        {x: 2, y: 76, color: 'red'},
        {x: 3, y: 43, color: 'green'},
        {x: 4, y: 32, color: 'red'},
        {x: 5, y: 38, color: 'green'},
        {x: 6, y: 28, color: 'red'},
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  .bar-chart-demo
    text-align: center
  .title
    text-align: center
    font-size: 32px
    font-weight: bold
</style>

<style lang="stylus">
  .bar-chart-demo
    // 定制坐标轴样式
    .tick text
      font-size: 14px
    .x-axis .tick text
      transform: translateY(4px) rotate(-15deg)
</style>
