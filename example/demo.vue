<template lang="pug">
  .demo
    bar-chart-demo
    line-chart-demo
    pie-chart-demo
    radar-chart-demo
</template>

<script>
import RadarChartDemo from './radar-chart-demo.vue'
import PieChartDemo from './pie-chart-demo.vue'
import BarChartDemo from './bar-chart-demo.vue'
import LineChartDemo from './line-chart-demo.vue'

export default {
  components: {
    BarChartDemo,
    LineChartDemo,
    PieChartDemo,
    RadarChartDemo
  },

  data () {
    return {
    }
  },

  methods: {
  }
}
</script>
