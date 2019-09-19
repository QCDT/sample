<template>
  <div>
    <cardfile @reception= 'refData'></cardfile>
    <div class="sample-tmp" v-show="!switchSaoMiao">
      <div class="pic">
        <img src="@/assets/img/sample.gif" @click="scanSample">
      </div>
      <h1>扫描样本</h1>
      <span>请将样本放置在读写器上，然后点击上方按钮开始扫描</span>
    </div>
    <div class="sample-tmp"  v-show="switchSaoMiao">
      <div class="pic">
        <img src="@/assets/img/saomiao_scanbox.gif" @click="scanSample">
      </div>
      <h1>扫描样本盒</h1>
      <span>请将样本盒放置在读写器上，然后点击上方按钮开始扫描</span>
    </div>
  </div>
</template>
<script>
import cardfile from "@/components/cardfile";
export default {
  props: {
    switchSaoMiao: Boolean,
  },
  components: {
    cardfile
  },
  data () {
    return {
      RfidArr: [],
      tableData: [],
      boxData: [], 
      elref:''
    }
  },
  methods: {
    refData(value){
      this.elref = value
    },
    scanSample(){
      this.boxData = []
      this.tableData = []
      this.RfidArr = []
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
      alert(recordCnt)
      for(let j=0;j<recordCnt;j++){
        	let sTagInfo = this.elref.GetRecord(j).split("-")
          let sTagID = sTagInfo[sTagInfo.length-1]
            this.RfidArr[j] = sTagID
      }
      console.log(this.RfidArr)
      if(this.switchSaoMiao){
        this.$axios({
          method:'post',
          url: '/sampleGuide/set/isUseRfidCode',
          data:({
            batchRfidCode: this.RfidArr
          })
        })
        .then(({data})=>{
            data.data.rfidMap.newRfidCode.forEach((item)=>{
              this.boxData.push({
                id:'',
                coding: item, // 序号编码
                name: "", // 样本名称
                address: "", // 位置信息
                status: "", // 状态
              })
            }),
            data.data.sampleBoxMap.SampleBoxInfo.forEach((item)=>{
              this.boxData.push({
                id:item.id,
                coding: item.rfidCode, // 序号编码
                name: item.name, // 样本名称
                address: item.sampleBoxStru.detailLocation, // 位置信息
                status: item.status ==1?'正常':'借出', // 状态
              })
            }),
            // console.log(data)
            this.$emit('changeBox',this.boxData)
        })
      }else{
        this.$axios({
          method:'post',
          url: '/sampleGuide/scan/findRfidSampleByRfidCode',
          data:({
            rfidCodeList: this.RfidArr
          })
        })
          .then(({data})=>{
            console.log(data)
            data.data.new.forEach((item)=>{
              this.tableData.push({
                id:'',
                coding: item, // 序号编码
                name: "", // 样本名称
                address: "", // 位置信息
                status: "", // 状态
              })
            }),
            data.data.old.forEach((item)=>{
              this.tableData.push({
                id:'',
                coding: item.rfidCode, // 序号编码
                name: item.name, // 样本名称
                address: item.sampleStru.detailLocation, // 位置信息
                status: item.status==1?"正常":2?"借出":'预留' // 状态
              })
            })
            this.$emit('changeSample',this.tableData)
          })

      }

    },
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.sample-tmp {
  display: flex;

  // justify-content:center;
  align-items: center;
  flex-direction: column;
  margin-top: 1%;
  width: 100%;

  color: #00c9ff;
  .pic {
    margin-bottom: 12px;

    > img {
      width: 90px;
      cursor:pointer;
      // height: 70px;
    }
  }

  h1 {
    margin-bottom: 7px;

    font-size: 1.25rem;
    font-weight: 500;
  }
}
</style>
