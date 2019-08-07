<template>
  <div>
    <div class="item">
      <h1>RFID编号:</h1>
      <div class="row">
        <el-input size="small" v-model="input.test" placeholder="请输入内容"></el-input>
        <i class="icon icon-sousuo"></i>
      </div>
    </div>
    <div class="item">
      <h1>
        <span>*</span> 样本盒名称:
      </h1>
      <div class="row">
        <el-input size="small" v-model="input.test1" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="item">
      <h1>备注:</h1>
      <div class="row">
        <el-input
          size="small"
          type="textarea"
          placeholder="请输入内容"
          v-model="input.test2"
          maxlength="1000"
          show-word-limit
        ></el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      textarea: '',
      input: {}
    }
  },
  watch: {
    input: {
      handler (newValue, oldValue) {
        console.log('newValue: ', newValue)
        this.$emit('test', newValue)
      },
      deep: true
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.row {
  display: flex;
  align-items: center;
}
</style>
