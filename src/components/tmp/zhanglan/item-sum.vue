<template>
  <div class="zl-item-sum">
    <!-- 表格头部的字: 项目总数: xx -->
    <span>{{name}}</span>
    <span>{{number}}</span>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    number: Number
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
span {
  font-size: 16px;
}

span:nth-child(2) {
  padding-left: 0.5em;
  background-color: #fff;
}
</style>
