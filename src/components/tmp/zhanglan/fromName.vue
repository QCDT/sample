<template>
  <div class="from-name">
    <!-- 这是一个表格名称 -->
    <!-- 在表格的最上边,左右有个蓝色条条的 -->
    <h1>
      <slot></slot>
    </h1>
  </div>
</template>
<script>
export default {}
</script>
<style scoped lang='less'>
.from-name {
  h1 {
    margin-bottom: 10px;
    padding-left: 0.5em;

    border-left: 3px solid #3cd7ff;
    height: 28px;
    line-height: 28px;
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
