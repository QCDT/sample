<template>
  <div class="masking-wrap" :style="{backgroundColor:`rgba(0, 0, 0, ${rgba})`}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    rgba: { type: Number, default: 0.3 },
    bgc: String // .in 背景色
  },
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.masking-wrap {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
