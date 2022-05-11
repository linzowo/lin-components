export default {
  data() {
    return {
      debounceTimer: undefined
    }
  },
  methods: {
    /**
     * 防抖函数
     * @param {Function} fn 要防抖的函数
     * @param {Number} wait 防抖时间
     */
    debounce(fn, wait) {
      if (this.debounceTimer !== null) {
        clearTimeout(this.debounceTimer)
      }
      this.debounceTimer = setTimeout(fn, wait)
    }
  }
}
