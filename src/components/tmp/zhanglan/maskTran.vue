<template>
  <div class="masking-wrap" :style="{
      backgroundColor:`rgba(0, 0, 0,${rgba})`
  }">
    <div class="title" :title="title"></div>
    <div class="in" :style="{backgroundColor:bgc}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    bgc: { type: String, default: '#fff' }, // .in 的背景色
    rgba: { type: Number, default: 0.1 } // 模板透明度
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
  background-color: rgba(0, 0, 0, 0.1);
}
.title {
  height: 87px;
  cursor: not-allowed;

  background-color: transparent;
}
.in {
  width: calc(100% - 40px);

  padding: 0 20px;
  height: calc(100% - 87px);
  cursor: default;
}
</style>
