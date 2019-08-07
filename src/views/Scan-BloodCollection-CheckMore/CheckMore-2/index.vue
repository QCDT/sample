<template>
  <div>
    <router-link :to="{name:'checkMore-3'}" style="color:#333">222222222222</router-link>
    <div class="scan-box">
      <div class="in">
        <checkProgress></checkProgress>
        <div class="pic-saomiao">
            扫描.gif
        </div>
      </div>
    </div>
    <formTopMenu></formTopMenu>

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
        <el-table-column prop="name" label="患者编号" width="120"></el-table-column>

        <el-table-column prop="fangan" label="患者姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shenban" label="采血管"></el-table-column>
        <el-table-column prop="persorn" label="预计时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="persorn" label="核验时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="persorn" label="实际采血实际" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作备注" width="200">
          <template slot-scope="scope">
            <div class="flex">
              <el-input size="mini" v-model="input"></el-input>
              <!-- <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">姓名</el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import formTopMenu from '../../Scan-BloodCollection-CheckSingle/patientsCheck/formTopMenu'
import checkProgress from '@/components/tmp/zhanglan/checkProgress'
export default {
  props: {},
  components: { formTopMenu, checkProgress },
  data () {
    return {
      input: '',
      tableData: [
        {
          id: '1',
          name: '患者编号', // 患者编号
          fangan: '患者姓名', // 患者姓名
          shenban: '采血管', // 采血管
          persorn: '预计时间', // 预计时间
          persorn: '核验时间', // 核验时间
          persorn: '实际采血实际' // 实际采血实际
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
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
.scan-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .in {
    width: 50%;
    // background-color: #eee;

    margin-bottom: 10px;
  }
}
.pic-saomiao {

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
