<template>
  <div class="loan-wrap">
    <transition name="el-fade-in-linear">
      <Add :showDingdan="showDingdan" :projectOption='projectOption' @clearAdd="clearAdd" @submitForm="submitForm"/>
    </transition>
    <div class="title"><h1>借出订单列表</h1></div>
    <div class="top">
        <div>
          <span class="projectStyle">所属项目:</span>
          <el-select v-model="projectValue" clearable placeholder="请选择" size="mini" @change="searchDingdan">
            <el-option
              v-for="item in projectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <button @click="showAdd">添加订单</button>
    </div>
    <el-table
      :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
      :cell-class-name="cellStyle"
      border
      stripe
      max-height="350"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :style="{width: '100%'}"
    >
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column label="订单名称" show-overflow-tooltip>
        <template slot-scope="scope">
            <span class="orderName" @click="showOrder(scope.row,scope.$index)">{{tableData[scope.$index].orderName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="newTime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="newUserName" label="创建用户名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="takeOutName" label="取出人"></el-table-column>
      <el-table-column prop="returnTiem" label="预计归还时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="订单状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="formNum" label="已归还/总数" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
           <el-tooltip class="item" effect="dark" content="导出PDF" placement="bottom">
              <i class="icon icon-pdf del" @click="exportPdf(scope.row,scope.$index)" title="导出pdf"></i>
            </el-tooltip>
           <el-tooltip class="item" effect="dark" content="导出EXCEL" placement="bottom">
              <i class="icon icon-excel del" @click="exportExcel(scope.row,scope.$index)" title=""></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <i v-show="scope.row.status == '未核验'" class="el-icon-delete del" @click="delDingdan(scope.row,scope.$index)"></i>
            </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn">
      <button @click="goBack">返回</button>
    </div>
    <!-- <goBack></goBack> -->
    <!-- 蒙版 -->
  </div>
</template>
<script>
import goBack from '@/components/tmp/zhanglan/go-1'
// import fromName from '@/components/tmp/zhanglan/fromName'
import Add from '@/views/Scan-Loan/Add'
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import { deflate } from 'zlib';
export default {
  props: {},
  inject:['reload'],
  components: { goBack, Add, tmpButton },
  data () {
    return {
      projectValue:'', //项目value
      projectOption:[], //所有项目
      // 切换 添加借出订单选项
      showDingdan: false,
      tableData: [
        /* {
          // 序号[非ID] 订单名称 创建事件 创建用户名 取出人 预计归还事件 备注 订单状态 操作
          id: '1',
          orderName: '替格瑞洛', // 订单名称
          newTime: 1231231, // 创建时间
          newUserName: 'krystal', // 创建用户名
          takeOutName: 'meu', // 取出人
          returnTiem: 123123, // 预计归还时间
          mark: '暂无备注', // 备注
          status: '已核验' // 订单状态

        } */
      ],
      multipleSelection: [],
      exportList: [], // 导出excel数据集合
    }
  },
  //借出表单初始化
  created(){
    this.$axios({
      method:'post',
      url:'sampleGuide/scan/findAllLoanForm',
      data:({
        id:this.projectValue
      })
    })
    .then(({data})=>{
      console.log(data);
      data.data.forEach((item)=>{
            this.tableData.push({ //.............借出表格数据
               id: item.id,  // ...........序号
               orderName: item.name, // ...........借出表单名
               newTime: item.createTime,// ..........创建表单时间
               newUserName:item.createUserName,//………………创建用户名
               takeOutName:item.takeleave,//………………取走人
               returnTiem:item.expectedreturndate,//………………预计归还时间
               mark:item.loanremarks,//…………备注
               status:item.status==0?"未核验":item.status==1?'已归还':'已借出', //…………订单状态
               formNum:item.status==0?"":item.returnSampleCount+'/'+(item.returnSampleCount+item.loanSampleCount)
            })
        })
      })
     this.$axios.get("/sampleGuide/guest/selectProjectAll")
      .then(({data})=>{
        // console.log(data)
        data.data.forEach((item)=>{
          this.projectOption.push({
            value:item.id,
            label:item.name
          })
        })
    })
    .catch((error)=>{
      console.log(error)
    })
    },
  methods: {
    cellStyle({row, column, rowIndex, columnIndex}){
      if(columnIndex == 9){
        return 'lastColumn'
      }else{
       return 'columnStyle'
      }
    },
    searchDingdan(){
      this.tableData = []
      this.$axios({
      method:'post',
      url:'sampleGuide/scan/findAllLoanForm',
      data:({
        id:this.projectValue
        })
      })
      .then(({data})=>{
      console.log(data);
      data.data.forEach((item)=>{
            this.tableData.push({ //.............借出表格数据
               id: item.id,  // ...........序号
               orderName: item.name, // ...........借出表单名
               newTime: item.createTime,// ..........创建表单时间
               newUserName:item.createUserName,//………………创建用户名
               takeOutName:item.takeleave,//………………取走人
               returnTiem:item.expectedreturndate,//………………预计归还时间
               mark:item.loanremarks,//…………备注
               status:item.status==0?"未核验":"已借出", //…………订单状态
               formNum:item.loanSampleCount+'/'+(item.returnSampleCount+item.loanSampleCount)
            })
        })
      })
    },
    // 删除订单
    delDingdan (row, index) {
     // console.log(row,index)
      this.$confirm('确定要删除该订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios({
            method:'post',
            url:'sampleGuide/scan/delLoanOrder',
            data:({
              id:row.id,// 当前要删除的订单ID
            })
          })
          .then(({data})=>{
            //console.log(data);
            if(data.code==500){
              this.$message({ type: 'warning', message:data.data})
            }else if(data.code==200){
              this.$message({ type: 'success', message: '删除成功!' });
              this.searchDingdan()
            }else{
              this.$message({ type: 'info', message:data.data })
            }

          })

        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    goBack(){
      this.$router.push('/scan')
    },
    //导出借出订单PDF
    /* exportPdf(row, index){
      console.log(row,indeex);
      this.$axios({
        method:'post',
        url:'sampleGuide/scan/delLoanOrder',
        data:({
          id:row.id,// 当前要删除的订单ID
        })
      })
      .then(({data})=>{
        console.log(data);
      })
    }, */

    //导出借出订单Excel
    exportExcel(row, index){
      console.log(row,index);
      this.$axios({
        method:'post',
        url:'sampleGuide/scan/exportLoanExcel',
        responseType: 'blob',
        headers: {
        'Access-Control-Expose-Headers': 'filename'
        },
        data:({
          id:row.id,// 当前订单ID
        })
      })
      .then((data)=>{
        console.log(data);
        let fileName = data.headers.filename;
        let blob = new Blob([data.data], {type: 'application/vnd.ms-excel;charset=UTF-8'});
        if(window.navigator.msSaveBlob){
          window.navigator.msSaveBlob(blob,fileName);
        }else{
          let a = document.createElement('a');
          let href = window.URL.createObjectURL(blob); // 创建链接对象
          a.href =  href;
          a.download = fileName;   // 自定义文件名
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(href);  //移除链接对象
          document.body.removeChild(a);
        }
      })
    },


    //进入借出订单
    showOrder(row,index){
      //console.log(row)
      this.$router.push({
        name:'particulars',
        params:{
          id:row.id
        }
      });
      // this.$store.commit('loanOrderFun',row.id);//传值
    },

    // ↓    添加订单
    showAdd () {
      /* 显示 */ this.showDingdan = true
    },
    clearAdd () {
      /* 隐藏 */ this.showDingdan = false
    },
    submitForm (v) {
      /* 添加订单 */ this.tableData.push(v)
      this.clearAdd()
    }
    // ↑
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.loan-wrap {
  padding: 20px 20px 0;
  height: 36vw;
  position: relative;
}
.title{
  text-align: center;
  h1{
    font-size: 18px;
  }
}
/deep/.el-table .columnStyle{
  padding: 0px;
  text-align: center
}
/deep/.el-table .lastColumn{
  padding: 0;
  text-align: left
}
.projectStyle{
  margin-right: 5px;
}
.orderName{
  cursor: pointer;
  display: block;
  width: 100%;
}
.btn{
  text-align: center;
  margin-top: 20px;
  button{
    width: 100px;
    height: 30px;
    background: #fff;
    border: 1px solid #00c9ff;
    color: #00c9ff;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
      background: #00c9ff;
      color: #fff;
    }
  }
}
.del{
  font-size:16px;
  cursor: pointer;
  margin:0 5px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  button {
    cursor: pointer;
    width: 110px;
    height: 28px;
    border-radius: 5px;
    border: 1px solid #00c9ff;
    background: #fff;
    color: #00c9ff;
    &:hover{
      background: #00c9ff;
      color: #fff
    }
  }
}
</style>
