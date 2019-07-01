<template>
  <div class="search-input-tmp">
    <i class="icon icon-sousuo"></i>
    <input type="text" v-model="input" placeholder="请输入患者编号或姓名查询">
    <button @click="$emit('click',input)">查询</button>
    <!-- <button @click="click">查询</button> -->
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
    // click() {
    //   setTimeout(() => {
    //     this.$emit("click", this.input);
    //   }, 1000);
    // }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.search-input-tmp {
  box-shadow: 0 0 5px #000;
  width: 265px;
  height: 30px;
  display: flex;
  align-items: center;
  .icon {
    width: 30px;
    height: 30px;
    font-size: 29px;
    color: #3cd7ff;
  }
  input {
    outline: none;
    border: 0;
    width: 165px;
    color: #555;
    font-size: 13px;
    padding: 0 10px 0 5px;
  }
  button {
    width: 55px;
    outline: none;
    border: 0;
    white-space: nowrap;
    cursor: pointer;
    height: 30px;
    color: #fff;
    font-size: 16px;
    background-color: #3cd7ff;
  }
}
</style>
