<template>
  <div class="searchWrap">
    <Search  @changeTable = changeTable @changeBoxTable = changeBoxTable @sampleItemValue="sampleItemValueChange"></Search>
    <!-- 表单 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="bot-form">
      <div class="table-box">
        <FormTopMenu :count="Number(tableData.length)" :multipleSelection="multipleSelection" ></FormTopMenu>
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:0 , textAlign: 'center',}"
          border
          ref="multipleTable"
          max-height="400"
          :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
          tooltip-effect="dark"
          style="width:100%"
          @selection-change="handleSelectionChange"
          v-show="sampleBoxValue == 0"
        >
          <el-table-column type="selection" width="55" ></el-table-column>
          <el-table-column  width="70" label="序号">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * PageSize + 1}}</span></template>
          </el-table-column>
          <el-table-column prop="color" label="帽色" show-overflow-tooltip></el-table-column>

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
          <el-table-column prop="enterData" label="录入日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sampleBloodData" label="采样日期" show-overflow-tooltip></el-table-column>
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

        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:0 , textAlign: 'center',}"
          border
          ref="multipleTable"
          :data="tableBoxData"
          tooltip-effect="dark"
          style="width:100%"
          @selection-change="handleSelectionChange"
          v-show="sampleBoxValue == 1"
        >
          <el-table-column type="selection" show-overflow-tooltip ></el-table-column>
          <el-table-column label="序号" type="index" width="70">
          </el-table-column>
          <el-table-column prop="name" label="样本盒名称" show-overflow-tooltip></el-table-column>
          <!--  -->
          <el-table-column prop="enterName" label="录入人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="location" label="位置信息" show-overflow-tooltip></el-table-column>
        </el-table>

        <el-pagination
          class="paging"
          :hide-on-single-page="total <= 100"
          layout="prev, pager, next"
          :currentPage='currentPage'
          @current-change='handleCurrentChange'
          :page-size="PageSize"
          :total="total">
        </el-pagination>

      </div>
    </div>
    <!-- 表单 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <div class='backBtn' @click="backLoanPage" v-show="$route.params.id != 1">返回</div>
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
      total: 0,//查询到样本总数
      currentPage:1,//默认显示第几页
      PageSize:40,//每页显示条数
      tableData: [

      ],
      tableBoxData:[],
      sampleBoxValue:'',
      multipleSelection: []
      //   ↑ 表单
    }
  },
  created(){
  },
  methods: {


    handleSelectionChange (val) {  //选中数据的集合
      this.multipleSelection = val
    },
    sampleItemValueChange(data){
      this.sampleBoxValue = data
    },

    handleCurrentChange(val) {
        // 改变默认的页数
        console.log(val)
        this.currentPage=val
    },
    handleSelectionChange (val) {  //选中数据的集合
      this.multipleSelection = val
    },
    changeTable(tableData,tableTotal){
        console.log(tableTotal) //根据查询条件改变table中内容
        this.tableData = tableData
        this.total = tableTotal
    },
    changeBoxTable(tableData){
      this.tableBoxData = tableData
    },
    sampleInfoClick(){//样本信息展示
      this.$router.push({name: 'sample'})
    },
    sampleLog(){//日志信息展示
      this.$router.push({
        name:'log',
        params:{
          id: this.$route.params.id
        }
      })
    },
    backLoanPage(){//返回借出表单详情页
      this.$router.push({
        name:'particulars',
        params:{
          id: this.$route.params.id
        }
      })
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.paging{
  margin-top: 20px;
  text-align: center;
}
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
  text-align: center;
  cursor:pointer;
}
</style>
