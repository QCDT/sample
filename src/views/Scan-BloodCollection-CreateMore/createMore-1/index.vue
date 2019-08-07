<template>
  <div>
    <div class="form-cerate-order">
      <div class="item">
        <span>多人核验订单名称:</span>
        <el-input size="mini"></el-input>
      </div>
      <div class="item">
        <span>分组数量:</span>
        <el-input size="mini"></el-input>
      </div>
      <div class="item">
        <tmpButton>创建订单</tmpButton>
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
        <el-table-column label="订单名称" width="240">
          <template slot-scope="scope">
            <div class="flex">
              <router-link :to="{name:'createMore-2'}" style="color:#333">路由</router-link>
              <!-- <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">姓名</el-button> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fangan" label="创建日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shenban" label="创建人员"></el-table-column>
        <el-table-column prop="persorn" label="状态" show-overflow-tooltip></el-table-column>
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
    <!-- <router-link :to="{name:'createMore-2'}">adfa</router-link> -->
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default {
  props: {},
  components: { tmpButton },
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
.form-cerate-order {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .item {
    display: flex;
    white-space: nowrap;
    align-items: center;
    margin-left: 20px;
    span {
      padding-right: 0.5rem;
    }
  }
}
</style>
