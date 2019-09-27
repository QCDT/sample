<template>
  <!-- 借出详情 -->
  <div class="loadn-particulars-index">
    <cardfile @reception= 'refData'></cardfile>
    <fromName>表单信息</fromName>
    <div class="form-one">
      <div class="form-Info">
        <div>
          <span>表单名称:</span>
          <span>{{orderName}}</span>
        </div>
        <div>
          <span>创建时间:</span>
          <span>{{newTime}}</span>
        </div>
        <div>
          <span>创建用户名:</span>
          <span>{{newUserName}}</span>
        </div>
      </div>
      <div class="form-Info">
        <div>
          <span>取走人:</span>
          <span>{{takeOutName}}</span>
        </div>
        <div>
          <span>预计归还时间:</span>
          <span>{{returnTime}}</span>
        </div>
        <div>
          <span>表单状态:</span>
          <span :class="{red:status==0}">{{formStatus}}</span>
        </div>
      </div>
      <div class="form-Info">
        <div>
          <span>备注:</span>
          <span>{{make}}</span>
        </div>
      </div>
    </div>

    <div class="form-table-two">
      <fromName>该表单样本信息</fromName>
      <img class="startScan" src="@/assets/img/saomiao.gif" v-show="status==0" @click="stratHeyan">
      <div class="form-table-box">
        <div class="form-two-menu" v-show="status==0">
          <img src="@/assets/img/yangbenhe.png" @click="add">
          <img src="@/assets/img/yangben.png" @click="searchAdd">
          <img src="@/assets/img/laji.png" @click="delDingdanSample">
        </div>
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px'}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          :row-class-name="changeTrStyle"
          @selection-change="handleSelectionChange"
          max-height="300"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :style="{width: '100%'}"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column prop="RfidNmber" label="RFID编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="SampleName" label="样本名字"></el-table-column>
          <el-table-column prop="LocalItem" label="位置信息" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
        </el-table>
        <h1 v-show="sampleYanBen2.length != 0 || sampleYanBen.length != 0">详细异常描述</h1>
        <h2 v-show="status==0" class="red">{{scanNum}} / {{actualNum}}</h2>
        <div class="checkDetailsContent" v-show="sampleYanBen2.length != 0 || sampleYanBen.length != 0">
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
      <div class="footer">
        <el-button  class="enter-btn" type="primary" size="small" :disabled="checked"  v-show="status==0" @click="queRenHeYan">确认借出</el-button>
        <el-button  class="enter-btn" type="primary" size="small"  @click="$router.go(-1)">返回</el-button>
      </div>
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
  inject:['reload'],
  props: {},
  components: { fromName, maskTran, add, cardfile },
  data () {
    return {
      //ifAddBox: false,
      checked: true,
      newTime:'', //创建时间
      orderName:'', //表单名称
      newUserName:'',//创建用户名
      takeOutName:'', //取走人
      returnTime: '', // 预计归还时间
      make:'', //备注
      formStatus:'',// 表单状态
      scanNum:0,//扫描到的总数
      actualNum:'',//实际总数
      RfidArr: [],
      AddBox:false,
      ifSearchAddBox: false,
      LoanOrderStatus:'',
      status: -1,
      elref:'',
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
      //RfidNmber:[],
    }
  },

  //点击表单名称获取当前ID
  created(){
    // this.loanOrderId = this.$store.state.loanOrderId
    this.$axios({
      method:'post',
      url:'sampleGuide/scan/findLoanOrderAndLoanSampleById',
      data:({
        id:this.$route.params.id// 当前订单ID
      })
    })
    .then(({data})=>{
          console.log(data)
          this.newTime = data.data.loanOrder.createTime
          this.orderName = data.data.loanOrder.name
          this.newUserName = data.data.loanOrder.createUserName
          this.takeOutName = data.data.loanOrder.takeleave
          this.returnTime = data.data.loanOrder.expectedreturndate
          this.make = data.data.loanOrder.loanRemarks
          this.formStatus = data.data.loanOrder.status==0?"未核验":1?'已归还':'已借出'
          this.status = data.data.loanOrder.status
          this.LoanOrderStatus=data.data.loanOrder.status,
          //借出样本信息展示
          this.actualNum = data.data.loanSamples.length
          data.data.loanSamples.forEach((item)=>{
            // console.log(item);
              this.tableData.push({
                id:item.id,
                RfidNmber:item.rfidSampleCode, // ...........Rfid编号
                SampleName:item.sampleName,//………………样本名称
                LocalItem:item.sampleLocation,//………………位置信息
                status:item.sampleStatus==1?'正常':'借出'
              })
          })
      })
  },
  methods:{
    changeTrStyle({row}){
      for(let i=0; i<this.checkArr.length; i++){
        if(this.checkArr[i] == row.RfidNmber){
          return 'bgColor'
        }
      }
    },
    refData(value){
      this.elref = value
    },
    add () { //扫描样本盒添加样本
      this.AddBox = true
    },
    searchAdd () { //搜索样本添加
      this.$store.commit('loanSearchStatus', true)
     // this.$message('查询样本添加')
      this.$router.push({
        name:'query',
        params:{
          id: this.$route.params.id
        }
      });
    },
    handleSelectionChange(val){
         this.multipleSelection = val;
    },
    // 删除订单中样本
    delDingdanSample () {
      if(this.multipleSelection.length == 0){
        this.$message({ type: 'warning', message: '请先选择需要移除的样本' })
      }else{
        this.$confirm(`已选中${this.multipleSelection.length}条样本,确定要从表单中移除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$axios({
              method:'post',
              url:'sampleGuide/scan/delLoanSampleInLoanOrder',
              data:({
                sampleIdList:this.multipleSelection.map((item)=>{ return item.id}),// 当前样本ID数组
                loanOrderId: this.$route.params.id,//当前表单ID编号
            })
            })
            .then((data)=>{
              console.log(data)
              this.$message({ type: 'success', message: '删除成功!' })
              this.reload()
            })
          })
          .catch(() => {
            this.$message({ type: 'info', message: '已取消删除' })
          })
      }
    },
    stratHeyan () {//开始核验
      this.RfidArr = []
      this.sampleYanBen = []
      this.sampleYanBen2 = []
      this.checkArr = []
      this.elref.RDR_Close()
      let devicetypeValue = this.$cookies.get('readerType')
      let OpentypeValue = this.$cookies.get('portType')
      let comPortValue = this.$cookies.get('comPortNo')
      let comBaudRateValue = this.$cookies.get('comBaudRate')
      let comFrameStructureValue = this.$cookies.get('comFrameStructure')
      let netIpAddress = this.$cookies.get('netIpAddress')
      let netPort = this.$cookies.get('netPortNo')
      let n = this.$store.state.OnOpen(this.elref,devicetypeValue,OpentypeValue,comPortValue,comBaudRateValue,comFrameStructureValue,netIpAddress,netPort)
      if (n!=0) {
        return
      }
      let nret=0;
      //盘点标签初始化,申请盘点标签所需要的内存空间。返回，成功：0 ；失败：非0 （查看错误代码表）。
      nret = this.elref.RDR_InitInventory();
      if (nret!=0) {
        alert("盘点标签初始化失败！")
        return;
      }
      //盘点标签时，使能15693协议。返回，成功：0 ；失败：非0 （查看错误代码表）。
      nret = this.elref.RDR_Enable15693(0,0x00,0)
      nret = this.elref.RDR_Enable14443A()
      if (nret!=0) {
        //结束标签盘点操作，释放内存空间。
        this.elref.RDR_FinishInventory()
        return;
      }
      this.readRfid()
      this.elref.RDR_Close()
    },
    readRfid(){
      let nret = 0
      let recordCnt = ''
      nret = this.elref.RDR_Inventory(0,"")
      if (nret !== 0) {
        this.$alert('读取标签失败，请检查设备连接以及参数设置！', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        })
        this.elref.RDR_FinishInventory()
        return
      }
      recordCnt = this.elref.RDR_GetRecordCnt()
      this.scanNum = recordCnt
      // alert(recordCnt)
      for(let j=0;j<recordCnt;j++){
        let sTagInfo = this.elref.GetRecord(j).split("-")
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
        if(data.data.yes.length == this.tableData.length && data.data.new.length==0 && data.data.no.length == 0){
          this.checked = false
          this.$alert('核验成功!', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
        }
        data.data.yes.forEach((item)=>{
          this.checkArr.push(item.rfidCode)
        })
        data.data.new.forEach((item)=>{
          this.sampleYanBen2.push({
            text:item
          })
        })
        data.data.no.forEach((item)=>{
          console.log(item.sampleStru.detailLocation)
              this.sampleYanBen.push({
                text: `${item.name}(${item.sampleStru.detailLocation})`
              })
        })
      })
    },
    queRenHeYan () {//确认借出
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
              this.$alert('借出成功', '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
              this.reload()
            }
          })
      }
    }
  }
}
</script>
<style scoped lang='less'>
.loadn-particulars-index {
  padding: 0 20px;
}
/deep/.el-table .bgColor{
  background: rgba(139, 251, 139, 0.7);
  color:#333;
}
/deep/.el-table__body tr:hover>td {
		background-color:rgba(139, 251, 139, 0.7)  !important;
}
.red{
  color: red;
}
.form-one {
  width: 100%;
  margin: 20px 0 30px 50px; 
  .form-Info{
    display: flex;
    justify-content:flex-start;
    margin-top: 20px;
    div{
      width: 50%;
    }
    span:first-child{
      display: inline-block;
      width: 7vw;
    }
    span:last-child{
      margin-left: 15px;
      font-weight: 600;
    }
  }
}
.form-table-two{
  .startScan{
    width: 90px;
    display: block;
    margin: 0 auto;
    cursor: pointer;
  }
}
// .form-table-two {
//   &/deep/ .from-name h1 {
//     border-left-color: rgb(127, 255, 212) !important;
//   }
//   &/deep/.is-leaf {
//     color: #333 !important;
//     background-color: rgb(127, 255, 212) !important;
//   }
// }

.form-table-box {
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
  margin-top: 20px;
  margin-bottom: 10px;
}
h2{
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin-top: 10px;
}
// .enter-btn {
//   margin-bottom: 20px;
// }
.footer{
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .enter-btn{
    background-color: #00c9ff;
    border: 1px solid #00c9ff;
  }
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
