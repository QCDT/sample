<template>
  <div>
    <div class="row">
      <div class="item">
        <span>编号:</span>
        <el-input size="mini" style="width:120px"></el-input>
      </div>
      <div class="item">
        <span>姓名编号:</span>
        <el-input size="mini" style="width:120px"></el-input>
      </div>
      <div class="item">
        <span>性别:</span>
        <el-input size="mini" style="width:120px"></el-input>
      </div>
      <div class="item">
        <span>身份证:</span>
        <el-input size="mini" style="width:120px"></el-input>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <span>输入给药时间:</span>
        <el-input size="mini" style="width:120px"></el-input>
      </div>
      <div class="item">
        <span>给药采血管:</span>
        <el-input size="mini" style="width:120px"></el-input>
      </div>
      <div class="item">
        <span>输入采血管容量类别:</span>
        <el-input size="mini" style="width:120px"></el-input>
      </div>
      <div class="item">
        <tmpButton style="padding:3.5px">确认</tmpButton>
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
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>

        <el-table-column label="采血管" width="300">
          <template slot-scope="scope">
            <div class="flex">
              <button @click="selectSample(scope.row,scope.$index)">弹窗</button>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="设置时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-time-picker size="mini" v-model="value2"  placeholder="任意时间点"></el-time-picker>
          </template>
        </el-table-column>
        <el-table-column prop="persorn" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <span>x</span>
              <span>药</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 选择样本 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="alertSelectSample" :rgba="0.1" bgc="#333">
        <!--  -->
        <selectSample @confirmAdd="confirmAdd" @close="alertSelectSample=false"></selectSample>
      </maskTran>
    </transition>
  </div>
</template>
<script>
import maskTran from '@/components/tmp/zhanglan/masking'
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import selectSample from '@/views/Scan-FenZuHeYan/alert-createCheck/alert-selectSample'
export default {
  props: {},
  components: { tmpButton, selectSample, maskTran },
  data () {
    return {
      alertSelectSample: false, // 选择样本
      value2: new Date(),
      tableData: [
        {
          id: '1',
          orderName: '采血管', // 采血管
          setTime: '2018.01.01', // 设置时间
          mark: '备注' // 备注
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    getRowClass ({ rowIndex }) {
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    },
    changProject (rowData, index) {},
    confirmAdd (v) {
      this.alertSelectSample = false
      this.$message('确认添加')
      console.log('确认添加: ', v)
    },
    selectSample () {
      /* 选择样本 */
      this.$message('选择样本')
      this.alertSelectSample = true
    }
  },
  computed: {},
  created () {
    this.$emit('getMessage', 2)
  }
}
</script>
<style scoped lang='less'>
.row {
  display: flex;
  margin-bottom: 10px;
  width: 60%;

  justify-content: space-between;
  //   background-color: #333;
}
.item {
  display: flex;
  white-space: nowrap;
  align-items: center;
}
</style>
