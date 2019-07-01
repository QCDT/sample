<template>
  <div>
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
        <el-table-column label="订单名称" width="400">
          <template slot-scope="scope">
            <div class="flex">
              <router-link :to="{name:'patientsCheck'}" style="color:#333">{{tableData[scope.$index].name}}</router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fangan" label="创建日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shenban" label="创建人员"></el-table-column>
        <el-table-column prop="persorn" label="状态" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <router-link :to="{name:'patientOrderInfo'}" style="color:#333">X</router-link>
              <!-- <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">姓名</el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      tableData: [
        {
          id: '1',
          name: '订单名称这是个路由', // 订单名称
          fangan: '2018.11.23', // 创建日期
          shenban: '张三', // 创建人员
          persorn: '未核验' // 状态
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
</style>
