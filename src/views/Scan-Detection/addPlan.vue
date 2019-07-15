<template>
  <div class="add-plan-box">
    <div class="title">创建样本检测计划(表单)</div>
    <div class="content">
      <div class="left">
        <div class="row">
          <span>所属项目</span>:
          <el-input size="small" style="width:200px"></el-input>
          <span style="color:#f42">*</span>
        </div>
        <div class="row">
          <span>分析批名称</span>:
          <el-input size="small" style="width:200px"></el-input>
        </div>
        <div class="row">
          <span>LC-MS-MS编号</span>:
          <el-input size="small" style="width:200px"></el-input>
        </div>
        <h2 class="display-mode">显示方式</h2>
        <el-radio-group v-model="model">
          <el-radio :label="1">数字*数字</el-radio>
          <el-radio :label="2">数字*字母</el-radio>
          <el-radio :label="3">字母*数字</el-radio>
        </el-radio-group>
        <div class="row">
          <div class="item">
            <span>设置行数:</span>
            <el-select size="mini" style="width:60px" v-model="row" placeholder>
              <el-option
                v-for="item in rowData"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>设置列数</span>:
            <el-select size="mini" style="width:60px" v-model="col" placeholder>
              <el-option
                v-for="item in colData"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="right">
        <htTable :model="model" :row="row" :col="col"></htTable>
      </div>
    </div>
    <div class="bot-btn">
      <button @click="$emit('close')">返回</button>
      <router-link :to="{name:'addSamplePlanSteps'}">
        <button>创建</button>
      </router-link>
    </div>
  </div>
</template>
<script>
import htTable from './table'
export default {
  props: {},
  components: { htTable },
  data () {
    return {
      model: 1,
      rowData: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 7 },
        { value: 8 },
        { value: 9 },
        { value: 10 },
        { value: 11 },
        { value: 12 }
      ],
      colData: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 7 },
        { value: 8 },
        { value: 9 },
        { value: 10 },
        { value: 11 },
        { value: 12 }
      ],
      row: null,
      col: null
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.add-plan-box {
  padding: 20px;

  border: 1px solid #eee;
  border-radius: 5px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 0.732vw;
  padding: 10px 0;

  background-color: #e2e2e2;

  font-size: 20px;

  font-weight: 500;
}
.content {
  display: flex;
  justify-content: flex-end;
  .left {
    width: 30%;
  }
  .right {
    width: 50%;
  }
  .left,
  .right {
    height: 480px;
    margin-bottom: 20px;
    padding-top: 30px;
  }
  .row {
    display: flex;
    align-items: center;
    padding-top: 10px;
    span {
      min-width: 6rem;
      text-align-last: justify;
    }
  }
}
.bot-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.display-mode {
  padding-top: 10px;
  margin-bottom: 3px;
}
</style>
