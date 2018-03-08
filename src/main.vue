<template lang="pug">
  .vue-d3-chart {{content}}
</template>

<script>
  export default {
    name: 'vue-d3-chart',

		components: {
		},

    props: {
    },

    data () {
      return {
        content: "Hello vue library boilerplate!"
      }
    },

		watch: {
    },

    computed: {
    },

    methods: {
    },

    mounted() {
    },
  }
</script>

<style lang="stylus" scoped>
  .vue-d3-chart
    font-size: 20px
</style>
