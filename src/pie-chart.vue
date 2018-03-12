<template lang="pug">
  svg.pie-chart(:width="width", :height="height")
    g(v-for="(d, i) in dataset", :transform="`translate(${padding + 90*i}, ${padding})`")
      rect(:x="0", :y="0", :width="20", :height="8", :fill="d.color")
      text(:x="30", :y="8", fill="#000") {{d.label}}
    g(:transform="`translate(${padding + pieRaidus}, ${padding + descriptionHeight + pieRaidus})`")
      path(v-for="(d, i) in arcs", :d="d", :style="{fill: dataset[i].color}")
      text(v-for="(d, i) in arcsData",
        :transform="`translate(${textRasius * Math.sin((d.endAngle + d.startAngle)/2) - padding/3}, ${-textRasius * Math.cos((d.endAngle + d.startAngle)/2) + padding/6})`") {{`${dataset[i].value * 100}%`}}
</template>

<script>
  const padding = 50
  const descriptionHeight = 60

  export default {
    name: 'pie-chart',

		components: {
		},

    props: {
      dataset: { // 数据
        type: Array,
        required: true
      },
      width: {}, // 图表宽
      innerRadius: { // 内半径
        type: Number,
        default: 0
      },
      padAngle: { //间隔角度
        type: Number,
        default: 0
      }
    },

    data () {
      return {
        padding,
        descriptionHeight
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
      pieRaidus () {
        return this.dataViewWidth/2
      },
      textRasius () {
        return this.pieRaidus + this.padding/2
      },
      arcsData () {
        return d3.pie()(this.dataset.map(d => d.value));
      },
      arcs () {
        return this.arcsData.map(d => {
          const arc = d3.arc()
            .innerRadius(this.innerRadius)
            .outerRadius(this.pieRaidus)
            .startAngle(d.startAngle)
            .endAngle(d.endAngle)
            .padAngle(this.padAngle);
          return arc()
        })
      }
    },

    mounted() {
    },

    methods: {
    },
  }
</script>

<style lang="stylus">
  .pie-chart
    .label
      font-size: 18px
      font-weight: bold
</style>
