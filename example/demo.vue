<template lang="pug">
  .demo
    bar-chart-demo
    line-chart-demo
</template>

<script>
import BarChartDemo from './bar-chart-demo.vue'
import LineChartDemo from './line-chart-demo.vue'

export default {
  components: {
    BarChartDemo,
    LineChartDemo
  },

  data () {
    return {
    }
  },

  methods: {
  }
}
</script>
