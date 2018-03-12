<template lang="pug">
  .line-chart-demo
    p.title Line Chart Demo
    line-chart(:width="800", :height="400", :axis="c1.axis", :line="c1.line")
    line-chart(:width="800", :height="400", :axis="c2.axis", :line="c2.line")
    line-chart(:width="800", :height="400", :axis="c3.axis", :line="c3.line")
</template>

<script>
import {LineChart} from '../src/index.js'

const c1 = {
  axis: {
    x: [100, 200],
    xDiv: 5,
    y: [0, 100],
    yDiv: 10,
    xLabel: "USD",
    yLabel: "KG",
  },
  line: {
    dataset: [
      {x: 104, y: 84},
      {x: 150, y: 57},
      {x: 134, y: 76},
      {x: 186, y: 43},
      {x: 148, y: 32},
      {x: 177, y: 38},
      {x: 190, y: 28},
      {x: 132, y: 8},
      {x: 154, y: 34},
      {x: 198, y: 51},
      {x: 145, y: 67},
      {x: 132, y: 43},
      {x: 113, y: 21},
      {x: 103, y: 57},
      {x: 187, y: 56},
      {x: 174, y: 20},
    ].sort((a, b) => d3.ascending(a.x, b.x)),
    curve: d3.curveBasis,
  }
}

const c2 = {
  axis: {
    x: [0, 6],
    xFormat (d) {
      return ['Sun', 'Mon', 'Tus', 'Wen', 'Thu', 'Fri', 'Sat'][d]
    },
    xDiv: 7,
    y: [0, 100],
    yDiv: 10,
    xLabel: "Day",
    yLabel: "Temp",
  },
  line: {
    dataset: [
      {x: 0, y: 84},
      {x: 1, y: 57},
      {x: 2, y: 76},
      {x: 3, y: 43},
      {x: 4, y: 32},
      {x: 5, y: 38},
      {x: 6, y: 28},
    ]
  },
}

const c3 = {
  axis: c2.axis,
  line: [
    Object.assign({}, c2.line, {
      label: 'China',
      color: 'green',
    }),
    {
      label: 'American',
      color: 'red',
      dataset: [
        {x: 0, y: 34},
        {x: 1, y: 56},
        {x: 2, y: 67},
        {x: 3, y: 89},
        {x: 4, y: 45},
        {x: 5, y: 67},
        {x: 6, y: 77},
      ],
    }
  ]
}

export default {
  name: "line-chart-demo",

  components: {
    LineChart
  },

  data () {
    return {
      c1,
      c2,
      c3
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  .line-chart-demo
    text-align: center
  .title
    text-align: center
    font-size: 32px
    font-weight: bold
</style>



