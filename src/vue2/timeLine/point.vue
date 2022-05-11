<template>
  <div class="lin-timeline-point-box">
    <div
      class="line"
      :class="{left: !start}"
    />
    <div
      class="line"
      :class="{right: !end}"
    />
    <div
      class="point"
      :style="style"
    />
    <div
      class="point-name"
      :style="nameStyle"
      @click="pointClick"
    >{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'TimePoint',
  props: {
    start: {
      type: Boolean,
      default: false
    },
    end: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#ccc'
    },
    selected: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: '点位名称'
    }
  },
  data() {
    return {}
  },
  computed: {
    style() {
      return {
        borderColor: this.color,
        backgroundColor: this.selected ? this.color : '#fff'
      }
    },
    nameStyle() {
      return {
        backgroundColor: this.selected ? '#f5f6f8' : ''
      }
    }
  },
  methods: {
    /**
     * 时间点点击事件
     */
    pointClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang='scss'>
.lin-timeline-point-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 50px;

  .point {
    width: 14px;
    height: 14px;
    background: #fff;
    border: 2px solid #ccc;
    border-radius: 50%;
    position: relative;
    z-index: 9;
  }

  .point-name {
    font-size: 16px;
    font-weight: 400;
    color: #595959;
    cursor: pointer;
    padding: 10px 20px;
    margin-top: 12px;
    white-space: nowrap;
    max-width: 14em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      background-color: #f5f6f8;
    }
  }

  .line {
    position: absolute;
    top: 7px;
    height: 1px;
    width: 0;
    border-bottom: 1px dashed #2a9faa;

    &.right,
    &.left {
      width: 50%;
    }

    &.right {
      right: 0;
    }
    &.left {
      left: 0;
    }
  }
}
</style>
