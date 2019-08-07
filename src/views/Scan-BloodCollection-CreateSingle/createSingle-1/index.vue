<template>
  <div>
    <tmpButton style="font-size:20px;padding:3px 12px;" @click="addPatientInformation">
      <i class="icon icon-tianjia1" style="font-size:20px;"></i>
      添加患者信息
    </tmpButton>
    <div class="table-name">患者信息列表</div>
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

        <el-table-column label="编号" width="300">
          <template slot-scope="scope">
            <div class="flex">
              <router-link :to="{name:'createSingle-2'}" style="color:#333">路由</router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fangan" label="姓名编号" show-overflow-tooltip></el-table-column>

        <el-table-column prop="shenban" label="性别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="persorn" label="身份证" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <i class="icon icon-pdf"></i>
              <i class="icon icon-pdf"></i>
              <i class="icon icon-pdf"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加患者信息 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="toggleAddPatientInfo">
        <alertAddPatientInformation @close="toggleAddPatientInfo=false"></alertAddPatientInformation>
      </maskTran>
    </transition>
    <!-- 修改患者信息 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="toggleModifyPatientInformation">
        <alertModifyPatientInformation @close="toggleModifyPatientInformation=false"></alertModifyPatientInformation>
      </maskTran>
    </transition>
    <!-- 修改腕带信息 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="toggleModifyWristbands">
        <alertModifyWristbands @close="toggleModifyWristbands=false"></alertModifyWristbands>
      </maskTran>
    </transition>
    <button @click="modifyPatientInformation">修改患者信息</button>
    <button  @click="modifyWristbands">修改腕带信息</button>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import alertAddPatientInformation from '@/views/Scan-BloodCollection-CreateSingle/createSingle-1/alert-addPatientInformation'
import alertModifyPatientInformation from '@/views/Scan-BloodCollection-CreateSingle/createSingle-1/alert-modifyPatientInformation'
import alertModifyWristbands from '@/views/Scan-BloodCollection-CreateSingle/createSingle-1/alert-modifyWristbands'
import maskTran from '@/components/tmp/zhanglan/masking'
export default {
  props: {},
  components: {
    tmpButton,
    alertAddPatientInformation,
    maskTran,
    alertModifyPatientInformation,
    alertModifyWristbands
  },
  data () {
    return {
      toggleAddPatientInfo: false /* 添加患者信息 */,
      toggleModifyPatientInformation: false /* 修改患者信息 */,
      toggleModifyWristbands: false /* 修改腕带信息 */,
      tableData: [
        {
          id: '1',
          name: '订单名称', // 订单名称
          fangan: '2018.01.01', // 创建日期
          shenban: '张三', // 创建人员
          persorn: 'XXX状态' // 状态
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
    addPatientInformation () {
      /* 添加患者信息 */
      this.toggleAddPatientInfo = true
      this.$message('添加患者信息')
    },
    modifyPatientInformation () {
      /* 修改患者信息 */
      this.toggleModifyPatientInformation = true
      this.$message('修改患者信息')
    },
    modifyWristbands () {
      /* 修改腕带信息 */
      this.toggleModifyWristbands = true
      this.$message('修改腕带信息')
    }
  },
  computed: {},
  created () {
    this.$emit('getMessage', 0)
  }
}
</script>
<style scoped lang='less'>
.table-name {
  padding-top: 10px;
  margin-bottom: 5px;
}
.form-table {
  background-color: #eee;
}
.flex {
  display: flex;
  justify-content: space-around;
  button {
    white-space: nowrap;
  }
}
</style>
