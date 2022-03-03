<template>
  <div
    id="dv-full-screen-container"
    :ref="ref"
  >
    <template v-if="ready">
      <slot />
    </template>
  </div>
</template>

<script>
import autoResize from './autoResize'

export default {
  name: 'DvFullScreenContainer',
  mixins: [autoResize],
  data() {
    return {
      ref: 'full-screen-container',
      allWidth: 0,
      scale: 0,
      datavRoot: '',
      ready: false
    }
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { initConfig, setAppScale } = this

      initConfig()

      setAppScale()

      this.ready = true
    },
    initConfig() {
      const { dom } = this
      // const { width } = window.screen
      // eslint-disable-next-line no-unused-vars
      const [width/* , height */] = [1920, 1080]

      this.allWidth = width

      dom.style.width = `${width}px`
      // dom.style.height = `100vh`
      dom.style.height = `${document.body.offsetHeight}px`
    },
    setAppScale() {
      const { allWidth, dom } = this

      const currentWidth = document.body.clientWidth

      dom.style.transform = `scale(${currentWidth / allWidth})`
    },
    onResize() {
      const { setAppScale } = this

      setAppScale()
    }
  }
}
</script>

<style lang="scss">
body {
  height: 100%;
}
#dv-full-screen-container {
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
  transform-origin: left top;
  // z-index: 999;
}
</style>
