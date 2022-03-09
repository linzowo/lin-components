<template>
  <div
    class="number-item-box"
    :class="{ running: running }"
    :style="{ width: width, height: height }"
  >
    <div class="time front" :data-number="time"></div>
    <div class="time back" :data-number="Number(time) + 1"></div>
  </div>
</template>

<script lang="ts" setup name="numberItem">
  import { watch, ref, onBeforeMount } from 'vue'

  interface Props {
    value?: string | number
    width?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    value: 0,
    width: '33px',
  })

  const time = ref(0)
  const running = ref(false)
  const height = ref('50px')
  const aspectRatio = 33 / 50

  onBeforeMount(() => {
    let widthValue = props.width
    widthValue = widthValue.replace('px', '')

    height.value = Number(Number(widthValue) / aspectRatio) + 'px'
  })

  watch(
    () => props.value,
    (newV) => {
      running.value = true
      setTimeout(() => {
        time.value = Number(newV)

        running.value = false
      }, 500)
    },
    { immediate: true },
  )
</script>

<style lang="less">
  @font-face {
    font-family: digitalClockFont;
    src: url('./300-CAI978.TTF');
  }

  /**
*翻页数字容器
 */
  .number-item-box {
    position: relative;
    box-sizing: border-box;
    font-family: digitalClockFont;
    font-size: 200%;
    background: #031749;
    color: #46d5f6;
    border-radius: 2px 2px 0px 0px;
    overflow: hidden;
    margin: 0 4px;
  }

  /**
*页样式,用前后伪元素实现翻页的样式
*前后伪元素的值为.time中data-number属性的值
*before是上半页，after是下半页
*伪元素一个：是css2写法,两个：：是css3写法
 */
  .time::before,
  .time::after {
    content: attr(data-number);
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
    background: #031749;
    color: #46d5f6;
    perspective: 100px;
    -webkit-perspective: 160px;
    text-align: center;
    box-shadow: #2d64bf 0px 0px 8px inset;
  }
  .time::before {
    top: 0;
    bottom: 50%;
    border-bottom: 2px solid #010a1e; /*转轴*/
  }
  .time::after {
    top: 50%;
    bottom: 0;
    line-height: 0;
  }
  /*翻转前*/
  .number-item-box .front::after,
  .number-item-box .back::before {
    z-index: 1;
  }
  .number-item-box .back::after {
    z-index: 2;
    transform-origin: center top;
    -webkit-transform-origin: center top;
    transform: rotateX(0.5turn); /*转半圈*/
    -webkit-transform: rotateX(0.5turn);
  }
  .number-item-box .front::before {
    z-index: 3;
  }

  /*翻转后*/
  .number-item-box.running .front::before {
    transform-origin: center bottom;
    -webkit-transform-origin: center bottom;
    animation: frontFlipDown 0.6s ease-in-out;
    -webkit-animation: frontFlipDown 0.6s ease-in-out;
    box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
    backface-visibility: hidden; /*隐藏背面*/
    -webkit-backface-visibility: hidden;
  }
  .number-item-box.running .back::after {
    animation: backFlipDown 0.6s ease-in-out;
    -webkit-animation: backFlipDown 0.6s ease-in-out;
  }

  /**
*动画
*/
  @keyframes frontFlipDown {
    to {
      transform: rotateX(0.5turn);
    }
  }
  @keyframes backFlipDown {
    to {
      transform: rotateX(0);
    }
  }

  @-webkit-keyframes frontFlipDown {
    to {
      -webkit-transform: rotateX(0.5turn);
    }
  }
  @-webkit-keyframes backFlipDown {
    to {
      -webkit-transform: rotateX(0);
    }
  }
</style>
