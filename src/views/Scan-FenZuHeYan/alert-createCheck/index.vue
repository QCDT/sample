<template>
  <!-- 创建编组核验 -->
  <div class="cereat-check-wrap">
    <steps :stepsData="stepsData" :active="2"></steps>
    <div class="form-menu">
      <div class="row">
        <div class="item">
          <span>编组订单名称:</span>
          <el-input size="mini" style="width:150px" v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="item">
          <span>分组数量:</span>
          <el-input size="mini" style="width:100px" v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="item">
          <span style="margin-left:50px">试管数量:</span>
          <el-select v-model="value" size="mini" placeholder="请选择" style="width:100px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="item">
          <span>输入密码:</span>
          <el-input size="mini" style="width:150px" v-model="input" placeholder="输入密码"></el-input>
        </div>
        <div class="item">
          <span>确认密码:</span>
          <el-input size="mini" style="width:150px" v-model="input" placeholder="确认密码"></el-input>
        </div>
        <div class="item">
          <tmpButton>编组核验</tmpButton>
          <tmpButton style="margin-left:30px">自检</tmpButton>
        </div>
      </div>
    </div>
    <div class="form-table">
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        stripe
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :style="{width: '100%',margin:'0 auto',}"
        :header-cell-style="getRowClass"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column label="试管1">
          <template slot-scope="scope">
            <div class="flex">
              <el-button @click="selectSample(scope.row,scope.$index)" type="text" size="small">
                <input type="text">
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="试管2">
          <template slot-scope="scope">
            <div class="flex">
              <el-button @click="selectSample(scope.row,scope.$index)" type="text" size="small">
                <input type="text">
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">上</el-button>
              <el-button type="text" @click="open">下</el-button>
              <el-button type="text" @click="open">del</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 选择样本 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="alertSelectSample" :rgba="0.1" bgc="#333">
        <selectSample @confirmAdd="confirmAdd" @close="alertSelectSample=false"></selectSample>
      </maskTran>
    </transition>
    <div class="bot-btn">
      <tmpButton @click="$emit('goBack')" style="padding:7px 12px;">完成并返回</tmpButton>
    </div>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import steps from '@/components/tmp/zhanglan/steps'
import maskTran from '@/components/tmp/zhanglan/masking'
import selectSample from './alert-selectSample'
export default {
  props: {},
  components: { tmpButton, steps, maskTran, selectSample },
  data () {
    return {
      alertSelectSample: false, // 选择样本
      value: '',
      stepsData: [{ text: '订单信息' }, { text: '选择样本' }, { text: '完成' }],
      options: [{ value: '矿泉水', label: '矿泉水' }], // 试管数量
      value: '', // 试管数量
      input: '',
      tableData: [
        {
          id: '1',
          name: '替格瑞洛', // 项目名称
          fangan: 'SN-YQ-2018005/V 1.0', // 方案号
          shenban: '石药集团中奇制药技术', // 申办方
          persorn: '李四', // 负责人
          yaowu: 'CSPCHA115胶囊' // 药物名称
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    getRowClass ({ rowIndex }) {
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    },
    selectSample () {
      /* 选择样本 */
      this.$message('选择样本')
      this.alertSelectSample = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    open () {},
    confirmAdd (v) {
      this.alertSelectSample = false
      this.$message('确认添加')
      console.log('确认添加: ', v)
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.cereat-check-wrap {
  position: relative;

  height: calc(100% - 10px);
  padding: 1.45rem 20px 0;

}
.form-menu {
  background-color: #fff;
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.row {
  display: flex;
  width: 980px;

  margin-bottom: 10px;
  .item {
    display: flex;
    align-items: center;

    margin: 0 20px;
    &/deep/button {
      min-width: 5.8rem;
    }
    span {
      width: 7rem;
    }
  }
}
.form-table {
  background-color: #fff;
  padding: 10px;
}
.bot-btn {
  position: absolute;

  width: calc(100% - 40px);

  bottom: 0px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
