<template functional>
  <div class="lin-empty-box">
    <img
      class="img"
      :src="props.img"
    >
    <div
      v-if="props.description"
      class="text"
    >{{ props.description }}</div>
  </div>
</template>

<style lang='scss'>
.lin-empty-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .img {
    width: 50%;
    max-width: 300px;
  }

  .text {
    margin-top: 20px;
  }
}
</style>
