<template>
  <div>
    <div class="saomiao-box">
      <img src="@/assets/img/public_saomiao.gif" alt width="100px">
      <div class="search-input">
        <searchInput @click="search"></searchInput>
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
        <el-table-column prop="name" label="编号" width="120"></el-table-column>
        <el-table-column label="姓名编号" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <router-link :to="{name:'patientOrderInfo'}" style="color:#333">路由</router-link>
              <!-- <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">姓名</el-button> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fangan" label="性别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shenban" label="身份证"></el-table-column>
        <el-table-column prop="persorn" label="病房" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import searchInput from './searchInput'
export default {
  props: {},
  components: { searchInput },
  data () {
    return {
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
    search (v) {
      /* 查询 */
      console.log('v: ', v)
    },
    getRowClass ({ rowIndex }) {
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    },
    changProject (rowData, index) {}
  },
  computed: {},
  created () {
    this.$emit('getMessage', 0)
  }
}
</script>
<style scoped lang='less'>
.form-table {
  padding-top: 15px;
}

.saomiao-box {
  position: relative;

  display: flex;
  justify-content: center;

  .search-input {
    position: absolute;
    right: 38px;
    bottom: 8px;
  }
}
</style>
