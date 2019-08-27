<!--
 * @Description: In User Settings Edit
 * @Author: 刘一帆
 * @Date: 2019-07-15 16:37:07
 * @LastEditTime: 2019-08-08 19:54:25
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="searchWrap">
    <Search @startSearch="startSearch"></Search>
    <!-- 表单 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="bot-form">
      <div class="table-box">
        <FormTopMenu :count="Number(tableData.length)" :multipleSelection="multipleSelection"></FormTopMenu>
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:0 , textAlign: 'center',}"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" show-overflow-tooltip></el-table-column>
          <el-table-column label="序号" type="index" width="70">
          </el-table-column>
          <el-table-column prop="color" label="管帽颜色" show-overflow-tooltip></el-table-column>

          <!--  -->
          <el-table-column label="样本信息" show-overflow-tooltip>
            <template slot-scope="scope"> 
                <!--           -->
                  <span class="cellStyle" @click="sampleInfoClick">
                      {{tableData[scope.$index].sampleInfo}}
                  </span>
                <!-- </router-link> -->
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

          <el-table-column label="日志信息"  fixed="right">
            <template>
                <span class="cellStyle" @click="sampleLog">查看</span>
            </template> 
          </el-table-column>
        </el-table>
      </div>
    </div>
    <center class='backBtn' @click="backLoanPage()">返回</center>
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
          coding: '1', // 序号编码
          color: '管帽颜色', // 管帽颜色
          sampleInfo: '样本信息', // 样本信息
          enterClork: '录入人', // 录入人
          enterData: '录入日期', // 录入日期
          samplingDate: '采样日期', // 采样日期
          source: '样本来源', // 样本来源
          pastDate: '过期日期', // 过期日期
          location: '位置信息', // 位置信息
          status: '状态', // 状态
          sampleClass: '类别', // 类别
          lender: '借出人', // 借出人
          outDate: '2019' // 借出日期
        }
      ],
      multipleSelection: []
      //   ↑ 表单
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 表格里的事件 ↓ row:行数据 index:索引
    handleClick (row, index) {
      console.log(row, index)
    },
    sampleInfoClick(){
      this.$router.push({name: 'sample'})
    },
    sampleLog(){
      this.$router.push({name:'log'})
    },
    startSearch (payload) {
      /* 搜索{} */
      console.log('payload: ', payload)
    },
    backLoanPage(){
      this.$router.push({name:'particulars'})
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
// 表单
.searchWrap{
  padding:0 20px;
}
.cellStyle{
  cursor: pointer
}
.table-box {
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;

  img {
    width: 30px;
    height: 30px;
  }
}
//  ↑

//返回按钮
.backBtn{
  border:1px solid #31d4ff;
  color:#31d4ff;
  width:130px;
  height:28px;
  line-height:28px;
  margin:15px auto;
  border-radius:3px;
  cursor:pointer;
}
</style>
