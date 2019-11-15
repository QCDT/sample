<template>
  <div class="add-box">
    <cardfile @reception= 'refData'></cardfile>
    <el-tabs type="border-card"  @tab-click="handleClick">
      <el-tab-pane label="选择已有样本盒">
        <div class="one-box">
          <div class="left-twins">
            <div class="item">
              <span>选择冰箱:</span>
              <el-select v-model="refValue" @focus="hideTable = true" @change="showRefRow" placeholder="请选择" size="small" style="margin:0 10px">
                <el-option
                  v-for="item in refOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>选择层:</span>
              <el-select v-model="refRow" @change="showDrawer" placeholder="请选择" size="small" style="margin:0 10px">
                <el-option
                  v-for="item in refRowOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>选择抽屉:</span>
              <el-select v-model="refDrawer" @change="showSampleBox" placeholder="请选择" size="small" style="margin:0 10px">
                <el-option
                  v-for="item in refDrawerOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>选择样本盒:</span>
              <el-select v-model="sampleBoxValue" @change="showSample" placeholder="请选择" size="small" style="margin:0 10px">
                <el-option
                  v-for="item in sampleBoxOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="right-twins">
            <h1 class="sample-boxTit">系统保存的样本盒信息</h1>
            <div class="matrixTable-box"  v-show="!hideTable">
              <table class="table">
                <tr class="row" v-for="(index) in rowValue" :key="index">
                  <td
                    v-for="(ind) in colValue"
                    :key="ind"
                    :class="showSampleStatus(row, col)"
                  >{{showTable(index,ind)}}</td>
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
        </div>
      </el-tab-pane>
      <el-tab-pane label="新建样本盒">
        <div class="two-box">
          <div class="left-twins">
            <div class="row">
              <span>RFID编号</span>
              <el-input disabled class="input" v-model="Rfid" size="mini" placeholder="请输入内容"></el-input>
              <div class="pic">
                <img src="@/assets/img/saomiao.gif"  @click="scanRfid">
              </div>
            </div>
            <div class="row">
              <span>样本盒名称</span>
              <el-input class="input" size="mini" @blur="verSampleName" v-model="sampleBoxName" placeholder="请输入内容"></el-input>
              <em v-show="msg">该样本盒名称已存在！</em>
            </div>
            <div class="mark-box">
              <span>备注:</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="mark"
                maxlength="30"
                show-word-limit
              ></el-input>
            </div>
          </div>
          <div class="right-twins">
            <div class="row-top">
              <span>样本盒规格</span>
              <el-select
                class="select"
                v-model="rowValue"
                size="mini"
              >
                <el-option
                  v-for="item in 10"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <span>行</span>
              <el-select
                v-model="colValue"
                size="mini"
                class="select"
              >
                <el-option
                  v-for="item in 10"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <span>列</span>
              <el-select
                v-model="showModel"
                size="mini"
                class="select"
              >
                <el-option
                  v-for="item in modelOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span>显示模式</span>
            </div>
            <div class="matrixTable-box" v-show="rowValue && colValue">
              <table class="table">
                <tr class="row" v-for="(index) in rowValue" :key="index">
                  <td
                    v-for="(ind) in colValue"
                    :key="ind"
                  >{{showTable(index,ind)}}</td>
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
        </div>
      </el-tab-pane>
      <el-tab-pane label="扫描已有样本盒">
        <div class="three-box">
          <div class="left-twins">
            <div class="pic">
              <img src="@/assets/img/saomiao.gif" alt>
            </div>
            <h6>RFID编号:</h6>
            <h6>样本盒名称:</h6>
            <h6>位置信息:</h6>
          </div>
          <div class="right-twins">
            <!-- <div class="matrixTable-box">
              <table class="table">
                <tr class="row" v-for="(index) in rowValue" :key="index">
                  <td
                    v-for="(ind) in colValue"
                    :key="ind"
                    :class="showSampleStatus(index, ind)"
                  >{{showTable(index,ind)}}</td>
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
            </div> -->
          </div>
        </div>
      </el-tab-pane>
      <div class="bot-b">
        <button @click="saveSampleBox">保存</button>
        <button @click="goBack">返回</button>
      </div>
    </el-tabs>
  </div>
</template>
<script>
import cardfile from "@/components/cardfile";
export default {
  props: {},
  components: {cardfile},
  data () {
    return {
      tabName:'',
      showModel:'',
      value:'',
      // model:1,
      Rfid:'',
      sampleBoxName:'',//样本盒名称
      msg:false,//样本盒名称验证文字
      rowValue:'',
      colValue:'',
      hideTable:true,
      elref:'',
      refValue:'',//冰箱id
      refOption:[], //所有冰箱集合
      refRow:'',// 层数id
      refRowOption:[],//所有层数集合
      refDrawer:'',//抽屉id
      refDrawerOption:[],//所有抽屉集合
      sampleBoxValue:'',// 样本盒id
      sampleBoxOption:[],// 所有样本盒集合
      loanSampleArr:[], //借出样本集合
      normalSampleArr:[], //正常样本集合
      modelOption:[
        {
          value: 1,
          label: '数字*数字'
        },
        {
          value: 2,
          label: '数字*字母'
        },
        {
          value:  3,
          label: '字母*数字'
        },
        {
          value:  4,
          label: '字母*字母'
        },
        {
          value:  5,
          label: '内部数字'
        }
      ],
      mapData: [
        { text: '已使用', bgc: '#00c9ff' },
        { text: '借用', bgc: '#FCFD01' },
        { text: '未使用', bgc: '#eee' }
      ],
      mark: '',
    }
  },
  created(){
    this.$axios({
      method:'get',
      url:'/sampleGuide/transSample/selectAllRefrigerator',
    })
    .then(({data})=>{
      console.log(data)
      data.data.forEach((item)=>{
        console.log(item.name)
        this.refOption.push({
          value: item.id,
          label: item.name
        })
      })
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.tabName = tab.label
      this.rowValue = ''
      this.colValue = ''
      if(tab.label = '新建样本盒'){
        this.showModel = 1
      }else{
        this.showModel = ''
      }
    },
    verSampleName(){
      this.$axios({
        method:'post',
        url:'/sampleGuide/transBox/isCanBeUsedName',
        data:({
          name: this.sampleBoxName
        })
      })
      .then(({data})=>{
        console.log(data)
        if(data.data == 0){
          this.msg = true
        }else{
          this.msg = false
        }
      })
    },
    refData(value){
      this.elref = value
    },
    goBack () {
      this.$emit('goBack')
    },
    showRefRow(){ //........根据选择的冰箱加载冰箱层数
      this.refRow = ''
      this.refRowOption = []
      this.refDrawer = ''
      this.refDrawerOption = []
      this.sampleBoxValue = ''
      this.sampleBoxOption = []
      this.$axios({
        method: 'post',
        url:'/sampleGuide/transBox/selectTier',
        data:({
          refrigeratorStruId: this.refValue
        })
      })
      .then(({data})=>{
        console.log(data)
        data.data.forEach((item)=>{
          this.refRowOption.push({
            value: item.id,
            label:item.row
          })
        })
      })
    },
    showDrawer(){ //.....根据选择的层数加载该层数的抽屉
      this.refDrawer = ''
      this.refDrawerOption = []
      this.sampleBoxValue = ''
      this.sampleBoxOption = []
      this.$axios({
        method: 'post',
        url:'/sampleGuide/transBox/findDrawerStru',
        data:({
            tierStruId:{
              id:this.refRow
            }
          })
        })
      .then(({data})=>{
          console.log(data)
          data.data.forEach((item)=>{
            this.refDrawerOption.push({
              value:item.id,
              label:item.number
            })
          })
      })
    },
    showSampleBox(){//.....根据选择的抽屉加载对应的样本盒
      this.sampleBoxValue = ''
      this.sampleBoxOption = []
     // console.log(this.labDrawer)
      this.$axios({
        method:'post',
        url:'sampleGuide/transBox/findSampleBoxStru',
        data:({
          drawStruId:this.refDrawer
        })
      })
      .then(({data})=>{
       console.log(data)
        data.data.forEach((item)=>{
          this.sampleBoxOption.push({
            label:item.row,
            value: item.id
          })
        })
      })
    },
    showSample(){ //.......根据样本盒查询样本信息
      // this.loading = true
      this.hideTable = false
      this.activeRow = ''
      this.activeCol = ''
      this.loanSampleArr = []
      this.normalSampleArr = []
      this.$axios({
        method:'post',
        url:'/sampleGuide/scan/findSampleStruBySampleBoxId',
        data:({
          sampleBoxStruId: this.sampleBoxValue
        })
      })
      .then(({data})=>{
        console.log(data)
        this.rowValue = data.data.sampleBoxRow
        this.colValue = data.data.sampleBoxCol
        this.showModel = data.data.sampleBoxSpec
        data.data.sampleStruList.forEach((item)=>{
          if(item.sampleStatus == 2){
            this.loanSampleArr.push([item.row,item.col])
          }
          if(item.sampleStatus == 1){
            this.normalSampleArr.push([item.row,item.col])
          }
        })
        // this.rowValue = data.data[0].structureRow
        // this.colValue = data.data[0].structureCol
        // this.showModel = data.data[0].structureSpec
        // data.data.forEach((item)=>{
        //     if(item.status == 2){
        //       this.loanSampleArr.push([item.row,item.col])
        //     }
        //     if(item.status == 1){
        //       this.normalSampleArr.push([item.row,item.col])
        //     }
        // })
      })
    },
    showTable (row,col) {
      let res = ''
      if(this.showModel == 1){
        res = row+'/'+col
      }else if(this.showModel == 2){
        res = row+'/'+String.fromCharCode(64 + col)
      }else if(this.showModel == 3){
        res = String.fromCharCode(64 + row)+'/'+col
      }else if(this.showModel == 4){
        res = String.fromCharCode(64 + row) +'/'+ String.fromCharCode(64 + col)
      }else{
        res = (row-1)*this.colValue+col
      }
      return res
    },
    showSampleStatus(row,col){
      //console.log(row,col)
      let activeArr = [row, col]
      //  console.log(activeArr)
      for(let i=0; i<this.loanSampleArr.length; i++){

        if(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify(activeArr)){
         // console.log(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify(activeArr))
          return 'loanColor'
        }
      }
      for(let i=0; i<this.normalSampleArr.length; i++){
        if(JSON.stringify(this.normalSampleArr[i]) == JSON.stringify(activeArr)){
          // console.log(this.normalSampleArr[i])
          // return true
          return 'normalColor'
        }
      }
    },
    scanRfid(){
      //console.log(this.$refs.MyActive)
      this.elref.RDR_Close()
      let devicetypeValue = this.$cookies.get('readerType')
      let OpentypeValue = this.$cookies.get('portType')
      let comPortValue = this.$cookies.get('comPortNo')
      let comBaudRateValue = this.$cookies.get('comBaudRate')
      let comFrameStructureValue = this.$cookies.get('comFrameStructure')
      let netIpAddress = this.$cookies.get('netIpAddress')
      let netPort = this.$cookies.get('netPortNo')
      //console.log(devicetypeValue,OpentypeValue,comPortValue,comBaudRateValue,comFrameStructureValue,netIpAddress,netPort)
      let n = this.$store.state.OnOpen(this.elref,devicetypeValue,OpentypeValue,comPortValue,comBaudRateValue,comFrameStructureValue,netIpAddress,netPort)
      // alert(n);
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
      let j =0
      nret = this.elref.RDR_Inventory(0,"")
      // alert(nret)
      if (nret !== 0) {
        this.$alert('读取标签失败，请检查设备连接以及参数设置！', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        })
        this.elref.RDR_FinishInventory()
        return
      }
      recordCnt = this.elref.RDR_GetRecordCnt()
      // console.log(recordCnt)
      let sTagInfo = this.elref.GetRecord(j).split("-");
      let sTagID = sTagInfo[sTagInfo.length-1];
      // alert(recordCnt)
      if(recordCnt == 1){
        this.$axios({
          method:'post',
          url:'/sampleGuide/transBox/isCanBeUsedRfidCode',
          data:({
            rfidCode:sTagID
          })
        })
        .then(({data})=>{
            if(data.data == 0){
              this.$alert('RFID芯片已被占用！', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })
            }else{
              this.Rfid = sTagID
              this.$alert('RFID芯片替换成功！', '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
            }
        })
      }else{
        this.$alert('样本盒芯片只能绑定一个！', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        })
      }
    },
    saveSampleBox(){
      if(this.tabName == '选择已有样本盒'){

      }else if(this.tabName == '新建样本盒'){
        this.$axios({
          method:'post',
          url:'/sampleGuide/transBox/insertTransportSampleBox',
          data:({
            name: this.sampleBoxName,
            rfidCode: this.Rfid,
            structureRow: this.rowValue,
            structureCol: this.colValue,
            structureSpec: this.showModel,
            remarks:this.mark,
            transportOrderId:this.$route.params.id
          })
        })
        .then(({data})=>{
          console.log(data)
          if(data.code == 200){
            this.$router.push({name: 'outchangeedit'})
          }
        })
      }else{

      }
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.add-box {
  height: 500px;
  margin-top: 10px;
  margin:10px 40px 40px 40px;
  padding: 20px;
  // background-color: #fff;
}
.normalColor{
  background: #00c9ff
}
.loanColor{
  background: #FCFD01;
}
.one-box,
.two-box,
.three-box {
  display: flex;

  height: 400px;
    // background-color: #333;
}

.left-twins,
.right-twins {
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 15px 30px;
}

.left-twins {
  border-right: 1.5px solid #3cd7ff;
}

.right-twins {
  display: flex;
  flex-direction: column;
}

// 选择已有样本
.one-box {
  .left-twins {
    .item {
      margin: 10px;

      span {
        display: inline-block;
        width: 6rem;
      }
    }
  }

  .right-twins {
    .sample-boxTit {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      font-size: 18px;
      font-weight: 500;
    }
  }
}
.two-box {
  .left-twins {
    .row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      em{
        color: red;
        font-size:10px;
        margin-left: 5px;
      }
      span {
        width: 6rem;
        text-align-last: justify;
      }
      .input{
        width: 40%;
      }
      .pic {
         img {
          width: 25px;
          height: 25px;
          cursor: pointer;
        }
        margin-left: 10px;
      }
    }
    .mark-box {
      span {
        padding-top: 3px;
        margin-bottom: 7px;
        width: 5rem;
        text-align-last: justify;
        display: inline-block;
      }
    }
  }
  .right-twins {
    .row-top {
      margin-bottom: 30px;
      .select{
        width: 20%;
        margin-left: 15px;
        margin-right: 5px;
      }
    }
  }
}

.three-box {
  .left-twins {
    display: flex;
    flex-direction: column;
    .pic {
      margin: 20px 20px 50px 35px;
      img{
        cursor: pointer;
      }
    }
    h6 {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 10px;
      padding-left: 50px;
    }
  }
}
.bot-b{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  button{
    margin-right: 10px;
    // background: #00c9ff;
    border: 1px solid #00c9ff;
    background: #fff;
    width: 120px;
    height:25px;
    border-radius: 5px;
    cursor:pointer;
    &:hover{
      background: #00c9ff;
      color: white;
    }
  }
}
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
  border: 1px solid  rgb(134, 134, 134);
  border-collapse: collapse;
  width: 80%;
  margin: 0 auto;
  td {
    padding: 5px;
    border: 1px solid rgb(134, 134, 134);
    text-align: center;
    font-size: 12px;
  }
}
.matrixTable-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
