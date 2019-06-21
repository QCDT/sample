<template>
  <div class="tmp-chunk-box">
    <h1 class="title">
        <slot name="title"></slot>
    </h1>
    <div class="content">
       <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
<style scoped lang='less'>
.tmp-chunk-box {
  width: 350px;
  height: 365px;

  border-radius: 5px 5px 0 0;
  background: #fff;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 38px;

  color: #fff;
  border-radius: 5px 5px 0 0;
  background: #00c9ff;

  font-size: 18px;
  font-weight: 500;
}
.content{
    padding: 15px;
}
</style>