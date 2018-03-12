<template lang="pug">
  .pie-chart-demo
    p.title Pie Chart Demo
    pie-chart(:width="400", :dataset="dataset")
    pie-chart(:width="400", :innerRadius="100", :padAngle="0.05", :dataset="dataset")
</template>

<script>
import {PieChart} from '../src/index.js'

export default {
  name: "pie-chart-demo",

  components: {
    PieChart
  },

  data () {
    return {
      dataset: [
        {label: "CN", value: 0.2, color: 'red'},
        {label: "US", value: 0.4, color: 'green'},
        {label: "UK", value: 0.3, color: 'gray'},
        {label: "JP", value: 0.1, color: 'yellow'},
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
  .pie-chart-demo
    text-align: center
  .title
    text-align: center
    font-size: 32px
    font-weight: bold
</style>
