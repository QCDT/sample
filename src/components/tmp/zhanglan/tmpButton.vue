<template>
  <button @click="$emit('click')">
    <slot></slot>
  </button>
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
button {
  outline: none;
  border: 1px solid #00c9ff;
  min-width: 100px;
  line-height: 25px;
  text-align: center;
  background-color: #fff;
  white-space: nowrap;
  color: #00c9ff;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover{
  background-color: #00c9ff;
  color:#fff;
}
</style>
