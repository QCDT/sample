<template>
  <!-- 借出详情 -->
  <div class="loadn-particulars-index">
    <cardfile></cardfile>
    <fromName>表单信息</fromName>
    <div class="fotm-table-one">
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px'}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        ref="multipleTable"
        :data="sampleData"
        tooltip-effect="dark"
        :style="{width: '100%'}"
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
      <el-button round  class="center" type="primary" v-show="status==0" @click="stratHeyan">开始核验</el-button>

      <div class="fotm-table-box">
        <div class="form-two-menu" v-show="status==0">
          <img src="@/assets/img/yangbenhe.png" @click="add">

          <img src="@/assets/img/yangben.png" @click="searchAdd">
        </div>
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px'}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          :row-class-name="changeTrStyle"
          max-height="300"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :style="{width: '100%'}"
        >
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column prop="RfidNmber" label="RFID编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="SampleName" label="样本名字"></el-table-column>
          <el-table-column prop="LocalItem" label="位置信息" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <i v-show="status==0" class="el-icon-delete del" @click="delDingdan(scope.row,scope.$index)" ></i>
            </template>
          </el-table-column>
        </el-table>
        <h1>详细异常描述</h1>
        <div class="checkDetailsContent">
          <div class="checkLeft">
            <p><span>异常详情</span></p>
            <p v-show="sampleYanBen2.length != 0">
              <span>该芯片未被录入</span>
            </p>
            <p v-show="sampleYanBen.length != 0">
              <span>该样本不属于此表单里的样本</span>
            </p>
          </div>
          <div class="checkRight">
            <p><span>样本名称(位置信息)</span></p>
            <p  v-show="sampleYanBen2.length != 0">
              <span v-for="(item,index) in sampleYanBen2" :key="index">{{item.text}}</span>
            </p>
            <p v-show="sampleYanBen.length != 0">
              <span v-for="(item,index) in sampleYanBen" :key="index">{{item.text}}</span>
            </p>
          </div>
        </div>
      </div>

      <el-button round class="center enter-btn" type="primary" v-show="status==0" @click="queRenHeYan">确认核验</el-button>
      <el-button class="center" type="primary" @click="$router.go(-1)" size="mini">返回</el-button>
    </div>
    <!-- 添加扫描样本盒 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="AddBox">
        <add @close="AddBox=false"></add>
      </maskTran>
    </transition>
  </div>
</template>
<script>
import fromName from '@/components/tmp/zhanglan/fromName'
import maskTran from '@/components/tmp/zhanglan/masking'
import add from '@/views/Scan-Loan-Particulars/add'
import cardfile from "@/components/cardfile"
export default {
  props: {},
  components: { fromName, maskTran, add, cardfile },
  data () {
    return {
      //ifAddBox: false,
      RfidArr: [],
      AddBox:false,
      ifSearchAddBox: false,
      LoanOrderStatus:'',
      status: -1,
      checkArr:[],
      seen : false,
      seen_2 : false,
      sampleYanBen: [
        // {text:'123'},
        // {text:'123453'}
      ],
      sampleYanBen2: [
        // {text:'123'},
        // {text:'123453'}
      ],
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
          status: '未核验' // 表单状态
        }*/
      ],
      multipleSelection: [],
      RfidNmber:[],
    }
  },

  //点击表单名称获取当前ID
  created(){
    // this.loanOrderId = this.$store.state.loanOrderId
    this.$axios({
      method:'post',
      url:'sampleGuide/scan/findLoanOrderAndLoanSampleById',
      data:({
        id: this.$route.params.id,// 当前订单ID
      })
    })
    .then(({data})=>{
          console.log(data)
          this.sampleData.push({ //.............借出表格数据
              newTime:data.data.loanOrder.createTime,// ..........创建时间
              orderName:data.data.loanOrder.name, // ...........借出表单名
              newUserName:data.data.loanOrder.createUserName,//………………创建用户名
              takeOutName:data.data.loanOrder.takeleave,//………………取走人
              returnTiem:data.data.loanOrder.expectedReturnDate,//………………预计归还时间
              mark:data.data.loanOrder.loanRemarks,//…………备注
              status:data.data.loanOrder.status==0?"未核验":"已核验", //…………订单状态
          }),
          this.status = data.data.loanOrder.status,
          this.LoanOrderStatus=data.data.loanOrder.status,
          //借出样本信息展示
          data.data.loanSamples.forEach((item)=>{
            // console.log(item);
              this.tableData.push({
                id: item.id,
                RfidNmber:item.rfidSampleCode, // ...........Rfid编号
                SampleName:item.sampleName,//………………样本名称
                LocalItem:item.sampleLocation,//………………位置信息
              })
          })
      })
  },
  methods:{
    changeTrStyle({row}){
      for(let i=0; i<this.RfidArr.length; i++){
        if(this.RfidArr[i] == row.RfidNmber){
          return 'bgColor'
        }
      }
    },
    add () {
      this.AddBox = true
    },
    searchAdd () {
      this.$store.commit('loanSearchStatus', true)
     // this.$message('查询样本添加')
      this.$router.push('/query');
    },
    // 删除订单中样本
    delDingdan (row, index) {
      this.$confirm('确定要删除该样本吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // this.tableData.splice(index, 1)
          this.$axios({
            method:'post',
            url:'sampleGuide/scan/delLoanSampleInLoanOrder',
            data:({
              sampleIdList:this.RfidNmber,// 当前订单ID
           })
          })
          .then((data)=>{
            console.log(data)

            this.$message({ type: 'success', message: '删除成功!' })
          })
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    stratHeyan () {//开始核验
      this.RfidArr = []
      this.sampleYanBen = []
      this.sampleYanBen2 = []
      // this.checkArr = []
      MyActiveX1.RDR_Close()
      let devicetypeValue = this.$cookies.get('readerType')
      let OpentypeValue = this.$cookies.get('portType')
      let comPortValue = this.$cookies.get('comPortNo')
      let comBaudRateValue = this.$cookies.get('comBaudRate')
      let comFrameStructureValue = this.$cookies.get('comFrameStructure')
      let netIpAddress = this.$cookies.get('netIpAddress')
      let netPort = this.$cookies.get('netPortNo')
      let n = this.$store.state.OnOpen(devicetypeValue,OpentypeValue,comPortValue,comBaudRateValue,comFrameStructureValue,netIpAddress,netPort)
      if (n!=0) {
        return
      }
      let nret=0;
      //盘点标签初始化,申请盘点标签所需要的内存空间。返回，成功：0 ；失败：非0 （查看错误代码表）。
      nret = MyActiveX1.RDR_InitInventory();
      if (nret!=0) {
        alert("盘点标签初始化失败！")
        return;
      }
      //盘点标签时，使能15693协议。返回，成功：0 ；失败：非0 （查看错误代码表）。
      nret = MyActiveX1.RDR_Enable15693(0,0x00,0)
      nret = MyActiveX1.RDR_Enable14443A()
      if (nret!=0) {
        //结束标签盘点操作，释放内存空间。
        MyActiveX1.RDR_FinishInventory()
        return;
      }
      this.readRfid()
      MyActiveX1.RDR_Close()
    },
    readRfid(){
      let nret = 0
      let recordCnt = ''
      nret = MyActiveX1.RDR_Inventory(0,"")
      if (nret !== 0) {
        this.$alert('读取标签失败，请检查设备连接以及参数设置！', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        })
        MyActiveX1.RDR_FinishInventory()
        return
      }
      recordCnt = MyActiveX1.RDR_GetRecordCnt()
      // alert(recordCnt)
      for(let j=0;j<recordCnt;j++){
        let sTagInfo = MyActiveX1.GetRecord(j).split("-")
        let sTagID = sTagInfo[sTagInfo.length-1]
        this.RfidArr[j] = sTagID
      }
      this.$axios({
        method:'post',
        url: '/sampleGuide/scan/existSampleInLoanOrder',
        data:({
          rfidCodeList: this.RfidArr,
          loanOrderId: this.$route.params.id
        })
      })
      .then(({data})=>{
        console.log(data)
        data.data.yes.forEach((item)=>{
          this.checkArr.push(item.rfidCode)
        })
        data.data.new.forEach((item)=>{
          this.sampleYanBen2.push({
            text:item
          })
        })
        data.data.no.forEach((item)=>{
              this.sampleYanBen.push({
                text: `${item.name}(${item.sampleStru.detailLocation})`
              })
        })
      })
    },
    queRenHeYan () {//确认核验
      if(this.sampleYanBen2.length != 0 || this.sampleYanBen.length !=0){
        this.$alert('核验异常', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }else{
        this.$axios({
          method:'post',
          url: '/sampleGuide/scan/submitLoadOrder',
          data:({
            id: this.$route.params.id
          })
        })
          .then(({data})=>{
            if(data.code == 200){
              this.$alert('核验成功', '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
            }
          })
      }
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
  }
}
</script>
<style scoped lang='less'>
.loadn-particulars-index {
  padding: 0 20px;
}
/deep/.el-table .bgColor{
  background: #00c9ff;
  color:white
}
/deep/.el-table__body tr:hover>td {
		background-color:#00c9ff  !important;
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
  font-size: 20px;
  cursor: pointer;
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
.checkDetailsContent{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  p{
    border: 1px solid #ccc;
    width: 45vw;
    height: 10%;
    text-align: center;
    border-top: none;
    padding: 5px;
    &:first-child{
      border-top:1px solid #ccc;
    }
  }
  .checkLeft{
    height: 100%;
    p{
      border-right: none;
      /*height: 20px;*/
    }
  }
  .checkRight{
    height: 100%;
    p {
      span{
        display: block;
      }
    }
  }
}
</style>
