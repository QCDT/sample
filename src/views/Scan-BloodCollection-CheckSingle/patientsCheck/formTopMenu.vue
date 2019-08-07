<template>
  <div class="form-top-menu-box">
    <div class="left">
      <h1>设置实际戳</h1>
      <div class="item">
        <span>前</span>
        <el-input size="mini" style="width:45px" v-model="input" placeholder></el-input>
        <span>分钟</span>
      </div>
      <div class="item">
        <span>后</span>
        <el-input size="mini" style="width:45px" v-model="input" placeholder></el-input>

        <span>分钟</span>
      </div>
      <button class="save" @click="save">保存</button>
    </div>
    <div class="right">
      <button class="tiao">紧急跳过</button>
      <i class="icon icon-sousuo"></i>
      <i class="icon icon-sousuo"></i>
      <i class="icon icon-sousuo"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      input: ''
    }
  },
  methods: {
    save () {
      this.$emit('save')
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.form-top-menu-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding-top: 2px;
}
.left {
  display: flex;
  white-space: nowrap;
  align-items: center;
  .item {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
  h1 {
    margin-right: 1rem;
  }
}
.save {
  background: #31d4ff;
  color: #fff;
  outline: none;
  border: none;
  padding: 3px 8px;
  cursor: pointer;
  border-radius: 3px;
}
.tiao {
  outline: none;
  border: none;
  border-radius: 3px;
  padding: 3px 8px;
  background-color: #cccccc;
}
.right {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
