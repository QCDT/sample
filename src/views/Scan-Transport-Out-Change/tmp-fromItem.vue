<template>
  <div class="tmp-fromItem-box">
    <em>*</em>
    <span><slot></slot></span>
    <slot name="input"></slot>
    <slot name="inputAddress"></slot>
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
  align-items: center;
  padding: 10px 50px;
}
em{
  color: red
}
span {
  width: 8rem;
  text-align: left
}
input {
  outline: none;
  border: 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 27px;
}
</style>
