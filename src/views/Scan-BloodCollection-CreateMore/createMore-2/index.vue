<template>
  <div>
    <div class="time-interval">
      <span>输入时间间隔:</span>
      <el-input size="mini" style="width:40px;"></el-input>
      <i>分钟</i>
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
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column label="患者姓名" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <button @click="toggleSelectPatients">弹窗</button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="采血管" show-overflow-tooltip>
          <template slot-scope="scope">
            <button @click="toggleSelectPatients">弹窗</button>
          </template>
        </el-table-column>
        <el-table-column label="设置时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-time-picker size="mini" v-model="value1" placeholder="任意时间点"></el-time-picker>
          </template>
        </el-table-column>
        <el-table-column label="备注" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input size="mini" style="width:80%;" v-model="input"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              X
              <!-- <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">姓名</el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <transition name="el-fade-in-linear">
      <masking v-if="ifSelectPatients">
        <test @close="ifSelectPatients=false"></test>
      </masking>
    </transition>
  </div>
</template>
<script>
import masking from '@/components/tmp/zhanglan/masking'
import test from '@/views/Scan-BloodCollection-CreateMore/createMore-2/test'
export default {
  props: {},
  components: { masking, test },
  data () {
    return {
      ifSelectPatients: false,
      value1: new Date(),
      input: '',
      tableData: [
        {
          id: '1',
          name: '编号', // 项目名称
          fangan: '性别', // 方案号
          shenban: '身份证', // 申办方
          persorn: '病房' // 负责人
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelectPatients () {
      this.ifSelectPatients = true
    },
    getRowClass ({ rowIndex }) {
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    },
    changProject (rowData, index) {}
  },
  computed: {},
  created () {
    this.$emit('getMessage', 1)
  }
}
</script>
<style scoped lang='less'>
.time-interval {
  display: flex;
  white-space: nowrap;
  align-items: center;
  margin-bottom: 10px;
  span {
    margin: 0 10px 0 30px;
  }
  i {
    padding-left: 0.3rem;
  }
}
</style>
