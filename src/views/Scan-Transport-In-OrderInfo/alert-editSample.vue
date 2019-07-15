<template>
  <div class="edit-sample-box">
    <div class="in-chunk">
      <div class="title">
        <h1>修改转入样本</h1>
        <i class="el-icon-close" @click="$emit('close')"></i>
      </div>
      <div class="body">
        <div class="item">
          <span>样本名称:</span>
          <el-input size="mini" style="width:160px"></el-input>
          <i class="el-icon-check"></i>
        </div>
        <div class="item">
          <span>样本来源:</span>
          <el-input size="mini" style="width:160px"></el-input>

        </div>
        <div class="item flex-end">

          <el-input size="mini" style="width:160px"></el-input>
          <i class="el-icon-plus"></i>
        </div>
        <div class="item">
          <span>样本类别:</span>
          <el-input size="mini" style="width:160px"></el-input>
          <i class="">*</i>
        </div>
        <div class="item  flex-end">

          <el-input size="mini" style="width:160px"></el-input>
          <i class="el-icon-plus"></i>
        </div>
        <div class="item">
          <el-button @click="save">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {}
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
.edit-sample-box {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 80%;

    white-space: nowrap;
}

.in-chunk {
    width: 300px;
    height: 350px;

    border: 1px solid #eee;
    background-color: #fff;
}

.title {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 40px;

    .el-icon-close {
        position: absolute;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 40px;
        height: 40px;

        transition: all .2s;

        font-weight: 900;

        &:hover {
            color: #fff;
            background-color: #f42;
        }
    }
}

.body {
    padding: 10px 35px;
}

.item {

    display: flex;
    align-items: center;

    margin-bottom: 10px;
}

.flex-end {
    margin-left: 4.21rem;
}

</style>
