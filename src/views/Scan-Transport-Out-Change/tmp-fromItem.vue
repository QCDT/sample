<template>
  <div class="tmp-fromItem-box">
    *<span>订单号</span>:
    <input type="text">
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
.tmp-fromItem-box {
  display: flex;
  padding: 0 50px;
}
span {
  width: 6rem;
  text-align-last: justify;
   
}
input {
  outline: none;
  border: 0;
  border-radius: 3px;
  border: 1px solid #999;
  height: 20px;
  margin: 0 10px;
}
</style>