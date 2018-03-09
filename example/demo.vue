<template lang="pug">
  .demo
    p.title Demo
    library-example
</template>

<script>
import {LibraryExample} from '../src/index.js'

export default {
  components: {LibraryExample},

  data () {
    return {
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



