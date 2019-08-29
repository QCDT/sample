<template>
  <!-- 扫描样本盒添加 -->
  <div class="add-box">
    <cardfile></cardfile>
    <div class="content">
        <div class='title'>
          <h1>样本借出</h1>
          <i class="el-icon-close" @click="$emit('close')"></i>
        </div>
        <div class="contentA" v-show="scanStatus">
          <div class="pic">
            <img src="@/assets/img/saomiao.gif" @click="scanSampleBox">
          </div>
          <el-button type="primary" size='small' @click="$emit('close')">返回</el-button>
        </div>
        <div class="contentB" v-show='!scanStatus'>
            <div class="top">
              <div class="left">
                <p><span class="leftItem">样本盒信息</span></p>
                <p><span class="leftItem">样本盒名称:</span ><span >{{sampleBoxName}}</span></p>
                <p><span class="leftItem">样本盒位置:</span><span>{{sampleBoxItem}}</span></p>
                <p><span class="leftItem">可借出样本数:</span><span>{{sampleLoanNum}}</span></p>
              </div>
              <div class="right">
                  <table class="table">
                    <tr v-for="(item,index) in 10" :key="index">
                      <td v-for="(item,ind) in 10" :key="ind">{{ind}}</td>
                    </tr>
                  </table>
                  <div class="map">
                    <span
                      v-for="(item,index) in mapData"
                      :key="index"
                      :style="{ backgroundColor: item.bgc}"
                      v-text="item.text"
                    />
                  </div>
              </div>
            </div>
            <div class="bottom">
                <el-button type="primary" size='small' @click="addSample">全部添加</el-button>
                <el-button type="primary" size='small' @click="$emit('close')">返回</el-button>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import cardfile from "@/components/cardfile";

export default {
  props: {},
  components: {
    cardfile
  },
  data () {
    return {
      loanSearchStatus:false,
      scanStatus: true,
      RfidArr:[],
      sampleBoxName:'',
      sampleBoxItem:'',
      sampleLoanNum:'',
      mapData: [
        { text: '已使用', bgc: '#7D7C7F' },
        { text: '借用', bgc: '#FCFD01' },
        { text: '未使用', bgc: '#EDF1F3' }
      ],
    testData:[
      {position:'name-10-2',x:0,y:9,is_used:1},{position:'name-1-2',is_used:2},{position:'name-1-2',is_used:3}],
      
      testData2:[[0,0],[0,1]],
      testData3:[81]
    
  }},
  methods: {
    scanSampleBox(){
     // this.boxData = []
      this.RfidArr = []
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
    //扫描
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
      if(recordCnt==0){
        this.$message('没有扫描到样本')
        return
      }
      alert(recordCnt)
      for(let j=0;j<recordCnt;j++){
          // RfidArr = []
        	let sTagInfo = MyActiveX1.GetRecord(j).split("-")
          let sTagID = sTagInfo[sTagInfo.length-1]
          console.log(sTagID)
            this.RfidArr[j] = sTagID
      }
      // if(this.RfidArr.length == 0){
      //   return
      // }
      console.log(this.RfidArr)

      //扫描样本盒借出样本
      this.$axios({
          method:'post',
          url: 'sampleGuide/scan/findSampleStruAndSampleBoxBySampleBoxId',
          data:({
            /* loanOrderId: this.$store.state.loanOrderId, */
            sampleBoxRfidCodeList:this.RfidArr,
          })
        })
        .then(({data})=>{
          console.log(data);
          this.sampleLoanNum=data.data.canUserSampleCount
          data.data.scanSampleBoxLoanVo.forEach((item)=>{
            console.log(item);
            this.sampleBoxName=item.sampleBoxName
            this.sampleBoxItem=item.detailLocation
            this.scanStatus = false
          })
          /* this.sampleBoxName =data.data
          this.sampleBoxItem =data. */
          
        })
    },
    addSample(){
      this.$emit('close')
      //this.scanStatus= this.$store.state.loanSearchStatus,
       this.scanStatus = false
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.add-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.content{
  width: 65%;
  margin: 0 auto;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: center;
    position: relative;
    height: 32px;
    align-items: center;
    color: #fff;
    background-color: #3cd7ff;
    .el-icon-close {
      position: absolute;
      right: 10px;
      top: 6px;
      color: black;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .contentA{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding : 50px 50px 130px;
      .pic{
          margin-bottom: 50px;
          cursor: pointer;
      }
      button{
        width:100px;
        border: 1px solid #00c9ff;
        background: #00c9ff;
      }
  }
  .contentB{
    padding: 50px 50px 70px;
    .top{
      display: flex;
      justify-content: center;
      .left{
        width: 40%;
        p{
          margin-bottom: 20px;
          .leftItem{
            font-weight: 600;
            margin-right: 10px;
          }
        }
      }
      .right{
        display: flex;
        justify-content: center;
        align-items: center;
        .map {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 60px;
          height: 90px;
          cursor: pointer;
          white-space: nowrap;
          font-size: 14px;
          margin-left: 15px;
          span {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2px 3px;
            color: #333;
            border-radius: 3px;
            font-size: 14px;
          }
        }
        .table {
          border-spacing: 0;
          border: 2px solid #ccc;
          border-collapse: collapse;
          td {
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
    .bottom{
      text-align: center;
      margin-top: 50px;
      button{
        width: 100px;
        background: #00c9ff;
        border: 1px solid #00c9ff;
      }
    }
  }

}
</style>
