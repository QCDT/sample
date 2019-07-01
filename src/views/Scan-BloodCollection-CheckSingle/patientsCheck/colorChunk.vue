<template>
  <div class="color-chunk-box">
    <h6 class="title">
      <slot name="title"></slot>
    </h6>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.color-chunk-box {
  box-shadow: 0 0 3px #000;
}
.title {
  background-color: #31d4ff;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16.5px;
  font-weight: 500;
  text-shadow: 0 0 2px #000;
}
.content {
  padding: 20px 25px 15px;
  color: #656565;

}
</style>
