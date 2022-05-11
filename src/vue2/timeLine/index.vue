<template>
  <overlay-scrollbars>
    <div class="lin-timeline-box">
      <div class="point-list">
        <point
          v-for="(item, i) in data"
          :key="i"
          :start="i === 0"
          :end="i === (len - 1)"
          :selected="i === selected"
          :color="color[item.state]"
          :name="item.name"
          @click="pointClick(i)"
        />
      </div>
    </div>
  </overlay-scrollbars>
</template>

<script>
import point from './point'

export default {
  name: 'LinTimeline',
  components: { point },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      color: ['#595959', '#2A9FAA', '#F8AB24'],
      selected: 0
    }
  },
  computed: {
    len() {
      return this.data.length
    }
  },
  methods: {
    /**
     * 点位点击事件
     */
    pointClick(index) {
      if (this.selected === index) return

      this.selected = index
      this.$emit('change', index)
    }
  }
}
</script>

<style lang='scss'>
.lin-timeline-box {
  max-width: 100%;
  position: relative;
  display: inline-block;

  .point-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: -50px;
  }
}
</style>
