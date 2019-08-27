<template>
  <!-- 借出详情 -->
  <div class="loadn-particulars-index">
    <fromName>表单信息</fromName>
    <div class="fotm-table-one">
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        stripe
        ref="multipleTable"
        :data="sampleData"
        tooltip-effect="dark"
        :style="{width: '100%'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="orderName" label="表单名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="newTime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="newUserName" label="创建用户名"></el-table-column>
        <el-table-column prop="takeOutName" label="取走人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="returnTime" label="预计归还时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="make" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="表单状态" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>

    <div class="fotm-table-two">
      <fromName>该表单样本信息</fromName>
      <el-button round class="center" style="background-color: rgb(13, 207, 255);">开始核验</el-button>
     <!--  v-show="loanOrderStatus == '0'||loanOrderStatus == '2'" -->
      <div class="fotm-table-box">
        <div class="form-two-menu">
          <img src="@/assets/img/yangbenhe.png" @click="add">
          <!-- <i @click="add" class="icon icon-tianjia" title="扫描样本盒添加"></i> -->
          <!-- <i @click="searchAdd" title="查询样本添加" class="icon el-icon-zoom-in" ></i> -->
          <img src="@/assets/img/yangben.png" @click="searchAdd">
        </div>
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          border
          stripe
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :style="{width: '100%',margin:'0 auto',}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="Index" type="index" label="序号" width="70"></el-table-column>
          <el-table-column prop="RfidNmber" label="RFID编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="SampleName" label="样本名字"></el-table-column>
          <el-table-column prop="LocalItem" label="位置信息" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="Operitor" label="操作" width="100">
            <template slot-scope="scope">
              <!-- <el-button @click="delDingdan(scope.row,scope.$index)" type="text" size="small"> -->
                <i class="el-icon-delete del" @click="delDingdan(scope.row,scope.$index)" ></i>
              <!-- </el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <h1>详细异常描述</h1>
        <div class="checkDetailsContent">
          <div class="checkLeft">
            <p><span>异常详情</span></p>
          </div>
          <div>
            <p><span>样本名称(位置信息)</span></p>
          </div>
        </div>
      </div>

      <el-button round class="center enter-btn" style="  background-color: rgb(13, 207, 255);">确认核验</el-button>
      <el-button class="center" type="primary" plain @click="$router.go(-1)" size="mini">返回</el-button>
    </div>
    <!-- 添加扫描样本盒 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="ifAddBox">
        <add @close="ifAddBox=false"></add>
      </maskTran>
    </transition>
  </div>
</template>
<script>
import fromName from '@/components/tmp/zhanglan/fromName'
import maskTran from '@/components/tmp/zhanglan/masking'
import add from '@/views/Scan-Loan-Particulars/add'
export default {
  props: {},
  components: { fromName, maskTran, add },
  data () {
    return {
      ifAddBox: false,
      ifSearchAddBox: false,
      LoanOrderStatus:'',
      /* 借出表单信息 */
      sampleData:[
        /* {
          orderName: '表单名称', // 表单名称
          newTime: 20180102, // 创建时间
          newUserName: '创建用户名', // 创建用户名
          takeOutName: 'meu', // 取走人
          returnTime: 123123, // 预计归还时间
          mark: '无备注', // 备注
          status: '已核验' // 表单状态
        } */
      ],
      /* 借出样本信息 */
      tableData: [
        /*       {
          // 序号[非ID] 订单名称 创建事件 创建用户名 取出人 预计归还事件 备注 订单状态 操作
          id: '1',
          orderName: '表单名称', // 表单名称
          newTime: 20180102, // 创建时间
          newUserName: '创建用户名', // 创建用户名
          takeOutName: 'meu', // 取走人
          returnTiem: 123123, // 预计归还时间
          mark: '无备注', // 备注
          status: '已核验' // 表单状态
        } */
      ],
      multipleSelection: []
    }
  },

  //点击表单名称获取当前ID
  created(){
    this.$axios({
      method:'post',
      url:'sampleGuide/scan/findLoanOrderAndLoanSampleById',
      data:({
        id: this.$store.state.loanOrderId,// 当前订单ID
      })
    })
    .then(({data})=>{
          //console.log(data);
          this.sampleData.push({ //.............借出表格数据
              newTime:data.data.loanOrder.createTime,// ..........创建时间
              orderName:data.data.loanOrder.name, // ...........借出表单名
              newUserName:data.data.loanOrder.createUserName,//………………创建用户名
              takeOutName:data.data.loanOrder.takeleave,//………………取走人
              returnTiem:data.data.loanOrder.expectedreturndate,//………………预计归还时间
              mark:data.data.loanOrder.loanremarks,//…………备注
              status:data.data.loanOrder.status==1?"已核验":"未核验", //…………订单状态
          }),
          this.LoanOrderStatus=data.data.loanOrder.status,
          //借出样本信息展示
          data.data.loanSamples.forEach((item)=>{
            //console.log(item);
              this.tableData.push({
                Index:data.data.loanSamples.createTime,// ..........序号
                RfidNmber:item.rfidCode, // ...........Rfid编号
                SampleName:item.name,//………………样本名称
                LocalItem:item.takeLeave,//………………位置信息
              })
          })
      })
  },

  methods:{
    add () {
      this.$message('扫描样本盒添加')
      this.ifAddBox = true
    },
    searchAdd () {
      this.$message('查询样本添加')
      this.$router.push('/query');
    },
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

    // getRowClass ({ rowIndex }) {
    //   /* 表头样式 */
    //   return rowIndex == 0 ? this.$store.getters.formTheme : ''
    // },
    // 删除订单
    delDingdan (row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableData.splice(index, 1)
          this.$message({ type: 'success', message: '删除成功!' })
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
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
.loadn-particulars-index {
  padding: 0 20px;
}
.center {
  display: block;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}
.fotm-table-one {
  margin: 10px 20px 50px;
}
.fotm-table-two {
  &/deep/ .from-name h1 {
    border-left-color: rgb(127, 255, 212) !important;
  }
  &/deep/.is-leaf {
    color: #333 !important;
    background-color: rgb(127, 255, 212) !important;
  }
}
.fotm-table-box {
  margin: 0px 20px 50px;
}
.form-two-menu {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  img{
    height: 30px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.del{
  font-size: 18px;
}
h1 {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  margin-bottom: 10px;
}
.enter-btn {
  margin-bottom: 20px;
}
.icon{
    cursor: pointer;
}
.el-icon-zoom-in{
    font-size: 17px;
    margin: 0 20px 5px;
}
.checkDetailsContent{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  p{
    border: 1px solid #ccc;
    width: 45vw;
    text-align: center;
  }
  .checkLeft{
    p{
      border-right: none;
    }
  }
}
</style>
