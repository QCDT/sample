<template>
  <div class="tmp-row-empty">
    <!-- XXX:输入框 | 选择框 -->
    <span class="tmp-row-empty-title">
      <slot></slot>:
    </span>
    <i class="tmp-row-empty-input">
      <slot name="elUI"></slot>
    </i>
  </div>
</template>
<script>
export default {}
</script>
<style lang='less'>
.tmp-row-empty {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-right: 20px;
}
.tmp-row-empty-title {
  margin-right: 0.5em;
  white-space: nowrap;
}
.tmp-row-empty-input {
  font-style: normal;
}
</style>
