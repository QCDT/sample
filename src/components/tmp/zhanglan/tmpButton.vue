<template>
  <button @click="$emit('click')">
    <slot></slot>
  </button>
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
button {
  outline: none;
  border: 0;
  min-width: 100px;
//   line-height: 25px;
  text-align: center;
  background-color: #3cd7ff;
  white-space: nowrap;
  color: #fff;
  font-size: 15px;
 
  border-radius: 5px;
  cursor: pointer;
}
</style>
