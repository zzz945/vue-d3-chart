<template lang="pug">
  .radar-chart-demo
    p.title Radar Chart Demo
    radar-chart(:width="400", :dimensions="dimensions", :dataset="dataset", @action="onRadarChartAction")
</template>

<script>
import {RadarChart} from '../src/index.js'

export default {
  name: "radar-chart-demo",

  components: {
    RadarChart
  },

  data () {
    return {
      dimensions: ["Eat", "Drink", "Run", "Sleep", "Code", "Design", "Play"],
      dataset: [
        {
          label: "Lucy",
          color: "red",
          d: [50, 60, 20, 58, 20, 59, 88]
        },
        {
          label: "Mike",
          color: "green",
          d: [20, 70, 53, 23, 67, 90, 43]
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    onRadarChartAction (params) {
      const {origin, act, payload} = params

      switch (act) {
        case origin.ACT_CLICK:
          alert(`Region ${payload} clicked`)
          break
        case origin.ACT_CLICK_DIMENSION_LABEL:
          alert(`${this.dimensions[payload]} clicked`)
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .radar-chart-demo
    text-align: center
  .title
    text-align: center
    font-size: 32px
    font-weight: bold
</style>
