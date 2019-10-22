<template>
  <div class="tmp-fromItem-box">
    <em>*</em>
    <span><slot></slot></span>
    <slot name="input"></slot>
    <!-- <input type="text" v-model="value"> -->
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      value:''
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.tmp-fromItem-box {
  display: flex;
  padding: 0 50px;
}
em{
  color: red
}
span {
  width: 7rem;
  text-align: left
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
