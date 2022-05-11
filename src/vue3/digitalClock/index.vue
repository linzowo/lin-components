<template>
  <div class="digital-clock-container">
    <numberItem v-for="(i, index) in hour" :key="'hour' + index" :value="i" />
    <span class="separator">:</span>
    <numberItem
      v-for="(i, index) in minute"
      :key="'minute' + index"
      :value="i"
    />
    <span class="separator">:</span>
    <numberItem
      v-for="(i, index) in second"
      :key="'second' + index"
      :value="i"
    />
  </div>
</template>

<script setup name="digitalClock">
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()
import { ref, onMounted, onBeforeMount, onUnmounted } from "vue"
import numberItem from "./numberItem.vue"
const hour = ref([0, 0])
const minute = ref([0, 0])
const second = ref([0, 0])

onBeforeMount(() => {
  timechange()
})

onMounted(() => {
  setInterval(() => {
    timechange()
  }, 1000)
})

onMounted(() => {
  timer = setInterval(() => {
    timechange()
  }, 1000)
})

function PrefixInteger(num, length) {
  return (Array(length).join("0") + num).slice(-length)
}

function timechange() {
  const date = new Date()
  const h = PrefixInteger(date.getHours(), 2)
  const m = PrefixInteger(date.getMinutes(), 2)
  const s = PrefixInteger(date.getSeconds(), 2)
  hour.value[0] = h[0]
  hour.value[1] = h[1]
  minute.value[0] = m[0]
  minute.value[1] = m[1]
  second.value[0] = s[0]
  second.value[1] = s[1]
}
</script>

<style lang="less">
.digital-clock-container {
  width: 100%;
  display: flex;
  align-items: center;

  .separator {
    color: #46d5f6;
    font-size: 28px;
    font-weight: 700;
    display: inline-block;
  }
}
</style>
