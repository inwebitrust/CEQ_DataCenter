import Vue from 'vue'
// import * as _ from 'lodash'
Vue.mixin({
  methods: {
    getColor (colorRef) {
      return this.$store.state.colorPalettes[this.$store.state.colorPaletteIndex].colors[colorRef]
    }
  }
})
