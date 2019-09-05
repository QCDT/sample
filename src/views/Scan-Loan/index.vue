<template>
  <div class="loan-wrap">
    <transition name="el-fade-in-linear">
      <Add :showDingdan="showDingdan" @clearAdd="clearAdd" @submitForm="submitForm"/>
    </transition>
    <div class="top">
      <fromName>借出订单列表</fromName>
      <tmpButton @click="showAdd" style="height:26px">添加订单</tmpButton>
    </div>

    <el-table
      :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
      :cell-style="{padding:'0px',textAlign: 'center'}"
      border
      stripe
      max-height="380"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :style="{width: '100%'}"
    >
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column label="订单名称" width="100">
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
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
           <el-tooltip class="item" effect="dark" content="导出PDF" placement="bottom">
              <i class="icon icon-pdf del" @click="exportPdf(scope.row,scope.$index)" title="导出pdf"></i>
            </el-tooltip>
           <el-tooltip class="item" effect="dark" content="导出EXCEL" placement="bottom">
              <i class="icon icon-excel del" @click="exportExcel(scope.row,scope.$index)" title=""></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <i class="el-icon-delete del" @click="delDingdan(scope.row,scope.$index)"></i>
            </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <goBack></goBack>
    <!-- 蒙版 -->
  </div>
</template>
<script>
import goBack from '@/components/tmp/zhanglan/go-1'
import fromName from '@/components/tmp/zhanglan/fromName'
import Add from '@/views/Scan-Loan/Add'
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import { deflate } from 'zlib';
export default {
  props: {},
  inject:['reload'],
  components: { goBack, fromName, Add, tmpButton },
  data () {
    return {
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
      method:'get',
      url:'sampleGuide/scan/findAllLoanForm',
    })
    .then(({data})=>{
      //console.log(data);
      data.data.forEach((item)=>{
            this.tableData.push({ //.............借出表格数据
               id: item.id,  // ...........序号
               orderName: item.name, // ...........借出表单名
               newTime: item.createTime,// ..........创建表单时间
               newUserName:item.createUserName,//………………创建用户名
               takeOutName:item.takeleave,//………………取走人
               returnTiem:item.expectedreturndate,//………………预计归还时间
               mark:item.loanremarks,//…………备注
               status:item.status==0?"未核验":"已核验", //…………订单状态
            })
        })
      })
    },
  methods: {
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
              this.reload();
            }else{
              this.$message({ type: 'info', message:data.data })
            }

          })

        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
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
        responseType: 'arraybuffer',
        data:({
          id:row.id,// 当前要删除的订单ID
        })
      })
      .then(({data})=>{
        console.log(data);
        var blob = new Blob([data], {type: 'application/vnd.ms-excel;charset=UTF-8'});
        var a = document.createElement('a');
        var href = window.URL.createObjectURL(blob); // 创建链接对象
        a.href =  href;
        a.download = '';   // 自定义文件名
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(href);  //移除链接对象
        document.body.removeChild(a); // 移除a元素
      })
    },


    //进入借出订单
    showOrder(row,index){
      //console.log(row)
      this.$router.push(
        {
        name:'particulars',
        params:{
             id: row.id
            },
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
}
.orderName{
  cursor: pointer;
}
.del{
  font-size:16px;
  cursor: pointer;
  margin:0 5px;
}
.top {
  display: flex;
  justify-content: space-between;

  button {
    cursor: pointer;
  }
}
</style>
