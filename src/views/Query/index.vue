<template>
  <div class="div">
    <Search></Search>
    <!-- 表单 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="bot-form">
      <div class="table-box">
        <FormTopMenu :count="Number(tableData.length)" :multipleSelection="multipleSelection"></FormTopMenu>
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
          <el-table-column type="selection" show-overflow-tooltip></el-table-column>
          <el-table-column label="序号" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.coding }}</template>
          </el-table-column>
          <el-table-column prop="color" label="管帽颜色" show-overflow-tooltip></el-table-column>

          <!--  -->
          <el-table-column label="样本信息"  width="200">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">
                <router-link :to="{name:'sample'}" style="color:blue;padding:3px">
                  <el-tooltip class="item" effect="dark" :content="tableData[scope.$index].sample" placement="top-start" >
                    <el-button style="border:0;padding:0">  {{tableData[scope.$index].sample}}</el-button>
                  </el-tooltip>
                </router-link>
              </el-button>
            </template>
          </el-table-column>
          <!--  -->
          <el-table-column prop="enterName" label="录入人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterTime" label="录入日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sampl" label="采样信息" show-overflow-tooltip></el-table-column>
          <el-table-column prop="source" label="样本来源" show-overflow-tooltip></el-table-column>
          <el-table-column prop="pastTime" label="过期日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="location" label="位置信息" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
          <el-table-column prop="classify" label="类别" show-overflow-tooltip></el-table-column>
          <el-table-column prop="loanPerson" label="借出人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="loanTime" label="借出日期" show-overflow-tooltip></el-table-column>

          <el-table-column fixed="right" label="日志信息" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">
                <router-link :to="{name:'log'}" style="color:blue;padding:3px">查看</router-link>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 表单 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
  </div>
</template>
<script>
import Search from './Search'
import FormTopMenu from './FormTopMenu'
export default {
  props: {},
  components: { Search, FormTopMenu },
  data () {
    return {
      // ↓   表单
      tableData: [
        {
          coding: '123', // 序号编码
          color: 'Mark', // 管帽颜色
          sample: '海尔冰箱3-1-101海尔冰箱', // 样本信息
          enterName: '录入人', // 录入人
          enterTime: '录入日期', // 录入日期
          sampl: '采样信息', // 采样信息
          source: '样本来源', // 样本来源
          pastTime: '过期日期', // 过期日期
          location: '位置信息', // 位置信息
          status: '状态', // 状态
          classify: '类别', // 类别
          loanPerson: '借出人', // 借出人
          loanTime: '2019' // 借出日期
        }
      ],
      multipleSelection: []
      //   ↑ 表单
    }
  },
  methods: {
    // El UI ...
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    //  表头样式
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return {
          background: '#3cd7ff',
          padding: '0px 0px',
          height: '30px',

          fontWeight: '600',

          color: '#fff',
          textAlign: 'center'
        }
      }
    },
    // 表格里的事件 ↓ row:行数据 index:索引
    handleClick (row, index) {
      console.log(row, index)
    }
    //  ↑
  },
  computed: {}
}
</script>
<style scoped lang='less'>
// 表单
.table-box {
  width: 100%;
  width: 1330px;
  margin: 0 auto;
  padding-top: 20px;

  img {
    width: 30px;
    height: 30px;
  }
}
//  ↑
</style>
