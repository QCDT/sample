<template>
  <div class="searchWrap">
    <Search v-show="!reMaskTran && !togegleZhuanYun && !newBoxMaskTran"  @changeTable = changeTable @changeBoxTable = changeBoxTable @sampleItemValue="sampleItemValueChange"></Search>
    <!-- 表单 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->

    <!-- 修改样本 -->
    <transition name="el-fade-in-linear">
      <!-- rgba:透明度 -->
      <reSample v-if="reMaskTran" :multipleSelection="multipleSelection" title="修改样本" @changeSave="changeSave" @goBack="reMaskTran=false"></reSample>
    </transition>
    <!-- 转移样本盒 -->
    <transition name="el-fade-in-linear">
      <!-- <maskTran :rgba="0"> -->
      <!-- rgba:透明度 -->
      <alertZhuanYun :checkedBoxlist='checkedBoxlist' v-if="togegleZhuanYun"  @goBack="togegleZhuanYun=false"></alertZhuanYun>
      <!-- </maskTran> -->
    </transition>
    <!-- 新建样本盒/修改样本盒 -->
    <transition name="el-fade-in-linear">
      <newSampleBox v-if="newBoxMaskTran" :sampleBoxId='sampleBoxId' :boxRfid='boxRfid'  :title="sampleBoxTitle" @changeBoxRfid="changeBoxRfid" @goBack="newBoxMaskTran=false"></newSampleBox>
    </transition>

    <div class="bot-form" v-show="!reMaskTran  && !togegleZhuanYun && !newBoxMaskTran">
      <div class="table-box">
        <FormTopMenu
          :count="sampleBoxValue == 0?Number(tableDataAll.length):Number(tableBoxDataAll.length)"
          :multipleSelection="multipleSelection"
          :sampleBoxValue = "sampleBoxValue"
          :checkedBoxlist='checkedBoxlist'
          @reSample="reSampleShow"
          @reSampleBox="reSampleBox"
          @zhuanyun="zhuanyun"
          v-show="!reMaskTran"
        ></FormTopMenu>
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:0 , textAlign: 'center',}"
          border
          ref="multipleTable"
          max-height="400"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100%"
          @selection-change="handleSelectionChange"
          v-show="sampleBoxValue == 0"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column  width="70" label="序号">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * PageSize + 1}}</span></template>
          </el-table-column>
          <el-table-column prop="color" label="帽色" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="color" :class="{'colorOne' : scope.row.color == 0 ,'colorTwo' : scope.row.color == 1 ,'colorThree' : scope.row.color == 2 ,'colorFour' : scope.row.color == 4 ,'colorFive' : scope.row.color == 5 ,'colorSix' : scope.row.color == 6 ,'colorSeven' : scope.row.color == 7 }"></span>
            </template>
          </el-table-column>

          <!--  -->
          <el-table-column label="样本信息" show-overflow-tooltip>
            <template slot-scope="scope">
                <!--           -->
                  <span class="cellStyle" @click="sampleInfoClick(scope.$index,scope.row)">
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
            <template slot-scope="scope">
                <span class="cellStyle" @click="sampleLog(scope.$index,scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>

        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:0 , textAlign: 'center',}"
          border
          max-height="400"
          ref="multipleTable"
          :data="tableBoxData"
          tooltip-effect="dark"
          style="width:100%"
          @selection-change="handleSelectionChangeTwo"
          v-show="sampleBoxValue == 1"
        >
          <el-table-column type="selection" show-overflow-tooltip ></el-table-column>
          <el-table-column  width="70" label="序号">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * PageSize + 1}}</span></template>
          </el-table-column>
          <el-table-column prop="name" label="样本盒名称" show-overflow-tooltip></el-table-column>
          <!--  -->
          <el-table-column prop="enterName" label="录入人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="位置信息" show-overflow-tooltip></el-table-column>
        </el-table>
        <div>
          <el-pagination
            class="paging"
            layout="prev, pager, next"
            :hide-on-single-page="total<=40"
            :currentPage='currentPage'
            @current-change='handleCurrentChange'
            :page-size="PageSize"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 表单 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <div class='backBtn' @click="backLoanPage" v-show="$route.params.id != 1">返回</div>
  </div>

</template>
<script>
import Search from './Search';
import FormTopMenu from './FormTopMenu';
import reSample from '@/views/Scan/reSample';
import alertZhuanYun from "@/views/Scan/alert-ZhuanYun";
import newSampleBox from "@/views/Scan/newSampleBox";
export default {
  props: {},
  components: { Search, FormTopMenu, reSample, alertZhuanYun, newSampleBox },
  data () {
    return {
      // ↓   表单
      total: 0,//查询到样本总数
      currentPage:1,//默认显示第几页
      PageSize:40,//每页显示条数
      tableDataAll:[],//查询到样本集合
      tableData: [],
      tableBoxDataAll:[],
      tableBoxData:[],//查询样本盒集合
      sampleBoxValue:0,
      multipleSelection: [],
      reId:[],
      reMaskTran: false, // 修改样本
      togegleZhuanYun: false, // 转运
      checkedlist:[],  //选中项的数组
      checkedBoxlist: [], //样本盒选中数组
      newBoxMaskTran: false, // 修改样本盒
      sampleBoxTitle: '修改样本盒',
      // RFID: '',
      boxRfid: '',
      sampleBoxId:-1,
      pipeCapOption:[
        {
          label:'白色',
          value:0
        },
        {
          label:'黑色',
          value:1
        },
        {
          label:'橙色',
          value:2
        },
        {
          label:'黄色',
          value:3
        },
        {
          label:'绿色',
          value:4
        },
        {
          label:'蓝色',
          value:5
        },
        {
          label:'紫色',
          value:6
        },
        {
          label:'粉色',
          value:7
        }
      ]
      //   ↑ 表单
    }
  },

  methods: {
    reSampleShow(){
      this.reMaskTran = true
    },
    reSampleBox(){
      this.newBoxMaskTran = true
    },
    zhuanyun() {
      this.togegleZhuanYun = true;
    },
    //   修改样本
    changeSave() {
      this.$message("修改样本成功");
      this.reMaskTran = false;
    },
    reSampleShowId(val){
      this.reId = val
    },
    changeType(val){
      this.sampleItem = val
    },
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
        this.tableData = []
        this.tableData = this.tableDataAll.slice((this.currentPage-1)*this.PageSize,this.currentPage*this.PageSize)
        this.tableBoxData = this.tableBoxDataAll.slice((this.currentPage-1)*this.PageSize,this.currentPage*this.PageSize)
    },
    // handleSelectionChange (val) {  //选中数据的集合
    //   this.multipleSelection = val
    // },
    handleSelectionChangeTwo(selection) {
      this.checkedBoxlist = selection
      this.boxRfid = this.checkedBoxlist[0].coding
      this.sampleBoxId = this.checkedBoxlist[0].id
      console.log(this.checkedBoxlist)
    },
    changeTable(tableData,tableTotal){
        this.total = 0
        console.log(tableTotal) //根据查询条件改变table中内容
        this.tableDataAll = tableData
        this.tableData = this.tableDataAll.slice((this.currentPage-1)*this.PageSize,this.currentPage*this.PageSize)
        this.total = tableTotal
    },
    changeBoxTable(tableData,tableTotal){
      console.log(tableTotal)
      this.total = 0
      this.tableBoxDataAll = tableData
      this.tableBoxData = this.tableBoxDataAll.slice((this.currentPage-1)*this.PageSize,this.currentPage*this.PageSize)
      this.total = tableTotal
    },
    sampleInfoClick(index,row){//样本信息展示
      this.$router.push({
        name: 'sample',
        params:{
          id:row.id
        }
      })
    },
    sampleLog(index,row){//日志信息展示
      this.$router.push({
        name:'log',
        params:{
          id: row.id
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
  watch:{
    sampleBoxValue(){
      this.total = 0
      this.tableDataAll = []
      this.tableData = []
      this.tableBoxDataAll = []
      this.tableBoxData = []
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

  .color{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }

  img {
    width: 30px;
    height: 30px;
  }
}
.colorOne{
  background-color: #fff;
}
.colorTwo{
  background-color: black;
}
.colorThree{
  background-color: #ffa724;
}
.colorFour{
  background-color: #fffd30;
}
.colorFive{
  background-color: #15ff13;
}
.colorSix{
  background-color: #c621ff;
}
.colorSeven{
  background-color: #ff99d3;
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
