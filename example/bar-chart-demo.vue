<template lang="pug">
  .demo
    p.title Bar Chart Demo
    bar-chart(:width="800", :height="400", :axis="axis", :dataset="dataset")
</template>

<script>
import {BarChart} from '../src/index.js'

export default {
  components: {
    BarChart
  },

  data () {
    return {
      axis: {
        x: [2011, 2018],
        xDiv: 6,
        y: [0, 100],
        yDiv: 10
      },
      dataset: [
        {name: 2011, value: 84},
        {name: 2012, value: 57},
        {name: 2013, value: 76},
        {name: 2014, value: 43},
        {name: 2015, value: 32},
        {name: 2016, value: 38},
        {name: 2017, value: 28},
        {name: 2018, value: 8},
      ],
    }
  },

  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  .title
    font-size: 32px
    font-weight: bold
</style>



