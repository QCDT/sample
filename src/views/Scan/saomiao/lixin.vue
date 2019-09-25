<template>
  <div>
    <cardfile @reception='refData'></cardfile>
    <div class="centrifugeImg">
      <el-carousel
        @change="change"
        :height="bannerHeight+'px'" 
        arrow="always"
        trigger="click"
        :autoplay="autoplay"
      >
        <el-carousel-item v-for="(item,index) in centrifugeList" :key="index">
          <img class="test" ref="image" :class="{'test-hover':index===carouselIndex}" src="@/assets/img/activeCen.png" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="centrifugeSet">
      <div class="centrifugeInfo">
        <div>
          <span>离心机名称</span>
          <span class="centrifugeItem">{{centrifugeName}}</span>
        </div>
        <div>
          <span>时间</span>
          <span class="centrifugeItem">{{centrifugeTime |dateFilter}}</span>
        </div>
        <div>
          <span>转速</span>
          <span class="centrifugeItem">{{centrifugeSpeed}}</span>
        </div>
        <div>
          <span>温度</span>
          <span class="centrifugeItem">{{centrifugeTemperature}}</span>
        </div>
      </div>
      <div class="centrifugeOperation">
        <img src="@/assets/img/centrifugalSet.png" @click="centrifugalSet" :disabled="disabledAmend" />
        <img src="@/assets/img/centrifugalAdd.png" @click="addSample" :disabled="disabledAmend" />
        <img v-show="!startCentrifuge" src="@/assets/img/centrifugalStart1.png" class="mainBtn" />
        <img v-show=" centrifugeStop" src="@/assets/img/continueCentrifugal.png" class="mainBtn" @click="continueCentrifuge"/>
        <img v-show=" centrifugeStop" src="@/assets/img/againCentrifugal.png" class="mainBtn" />
        <img v-show="startCentrifuge && !finishCentrifuge && !centrifugeRun" src="@/assets/img/centrifugalStart.png" class="mainBtn" @click="start"/>
        <img v-show="startCentrifuge && !finishCentrifuge && centrifugeRun && !centrifugeStop" src="@/assets/img/centrifugalStop.png" class="mainBtn" @click="stop"/>
        <img v-show="startCentrifuge && finishCentrifuge" src="@/assets/img/centrifugeEnd.png" class="mainBtn" @click="finish"/>
        <img src="@/assets/img/orders.png" @click="exportOrders" :disabled="disabledAmend"/>
        <img src="@/assets/img/record.png" @click="Ordersdetail" :disabled="disabledAmend"/>
      </div>
    </div>
    <el-dialog :visible.sync="dialogSet" width="50%">
      <div class="dialogSet">
        <div class="setItem">
          <span>名称</span>
          <el-input placeholder="请输入内容" v-model="centrifugeName" :disabled="true" size="mini"></el-input>
        </div>
        <div class="setItem">
          <span>品牌</span>
          <el-input placeholder="请输入内容" v-model="setBrand" :disabled="true" size="mini"></el-input>
        </div>
        <div class="setItem">
          <span>型号</span>
          <el-input placeholder="请输入内容" v-model="setType" :disabled="true" size="mini"></el-input>
        </div>
        <div class="setItem">
          <span>时间</span>
          <el-input placeholder="请输入内容" v-model="setTime" size="mini"></el-input>
          <span>min</span>
        </div>
        <div class="setItem">
          <span>转速</span>
          <el-input placeholder="请输入内容" v-model="setSpeed" size="mini"></el-input>
          <el-select v-model="unitValue" placeholder="请选择" size="mini">
            <el-option value="g">g</el-option>
            <el-option value="r/min">r/min</el-option>
          </el-select>
        </div>
        <div class="setItem">
          <span>温度</span>
          <el-input placeholder="请输入内容" v-model="setTemperature" size="mini"></el-input>
          <span>℃</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="updateSet">修改</el-button>
        <el-button size="mini" type="primary" @click="dialogSet = false">返回</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogSample" width="60%">
      <div class="dialogSample">
        <div>
          <img src="@/assets/img/saomiao.gif"  @click="scanSample"/>
        </div>
        <div class="sampleItem">
          <el-input placeholder="请输入内容" v-model="findValue" size="mini"></el-input>
          <el-button size="mini" type="primary"  class="findBtn" @click="searchSample">查询</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="dialogSampleData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
          tooltip-effect="dark"
          style="width: 100%"
          max-height="180"
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          :header-cell-style="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
          border
          @selection-change = selectAddSample
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column  width="70" label="序号">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * PageSize + 1}}</span></template>
          </el-table-column>
          <el-table-column prop="codeing" label="RFID编码">
          </el-table-column>
          <el-table-column prop="sampleName" label="样本名称"></el-table-column>
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
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="addCentrifuger">添加到离心机</el-button>
      </span>
    </el-dialog>
    <el-dialog title="导出订单" :visible.sync="dialogExport" width="60%" center>
      <div class="dialogExport">
        <div class="searchExport">
          <div class="searchName">
            <el-input v-model="exportName" placeholder="请输入订单名称" size="mini"></el-input>
          </div>
          <div class="block">
            <el-date-picker
              size="mini"
              v-model="timeValue"
              type="daterange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button type="primary" size="mini" class="searchBtn" @click="searchOrder">搜索</el-button>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="exportOrderData"
          tooltip-effect="dark"
          style="width: 100%"
          height="230"
          @selection-change="handleSelectionChange"
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          :header-cell-style="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
          border
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="70" label="序号" class="DataTable"></el-table-column>
          <el-table-column prop="orderName" label="订单名称" class="DataTable"></el-table-column>
          <el-table-column label="备注" prop="remarks" width="230"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <img src="@/assets/img/pdf.png"  @click="exportPDF"/>
        <img src="@/assets/img/excel.png" />
      </span>
    </el-dialog>
    <el-dialog title="订单详情" :visible.sync="dialogOrder" width="50%" center>
      <div class="dialogOrder">
        <div class="orderNum">
          <p v-show="!finishOrder">
            <span>样本容量:</span>
            <span>{{sampleNum}}</span>
          </p>
          <p v-show="finishOrder">
            <span>订单名称:</span>
            <span>{{finishOrderName}}</span>
          </p>
        </div>
        <el-table
          ref="multipleTable"
          :data="dialogOrderData"
          tooltip-effect="dark"
          style="width: 100%"
          height="230"
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          :header-cell-style="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
          border
        >
          <el-table-column type="index" width="70" label="序号"></el-table-column>
          <el-table-column prop="orderName" label="样本名称"></el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <i v-show="!finishOrder"  class="el-icon-delete del" @click="deleteRow(scope.$index,scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer" v-show="finishOrder">
        <img src="@/assets/img/pdf.png"  @click="exportPDF"/>
        <img src="@/assets/img/excel.png" />
      </span>
    </el-dialog>
  </div>
</template>
<script>
import cardfile from '@/components/cardfile'
export default {
  props: {},
  components: {cardfile},
  inject:['reload'],
  data () {
    return {
      total: 0,//查询到样本总数
      currentPage:1,//默认显示第几页
      PageSize:40,//每页显示条数
      RfidArr:[],// 扫描样本时扫到的rfid编码
      carouselIndex: 0 /* 轮播图的索引 */,
      autoplay: false, // 轮播图是否自动播放
      dialogSet: false, // 离心机设置
      dialogSample: false,// 离心机样本添加
      dialogExport: false,// 离心机样本导出
      dialogOrder: false,// 样本订单详情
      centrifugeName: '', // 离心机名称
      centrifugeTime: '', // 离心机时间
      centrifugeSpeed:'',// 离心机转速
      centrifugeTemperature: '',// 离心机温度
      centrifugeId: '',//离心机id
      unitValue:'',// 单位值
      exportName: '',// 导出订单中要搜索的订单名称
      timeValue:'',// 导出订单中要搜索订单的时间
      sampleNum: 0, // 样本详情表中数量
      setTime: '', // 修改页面离心机时间
      setSpeed: '',// 修改页面离心机转速
      setTemperature:'',//修改页面离心机温度
      setBrand:'',//修改页面离心机转速
      setType: '', //修改页面离心机型号
      findValue: '',// 查询样本添加时的条件
      addSampleList:[], //添加时样本集合
      disabledAmend:false,//是否可以修改
      startCentrifuge: false, //是否可以开始离心
      centrifugeRun: false, //是否正在离心
      finishCentrifuge: false,// 是否离心完成
      centrifugeStop: false, //是否停止离心
      finishOrderName:'',//完成的离心订单名称
      finishOrder:false, //离心完成的订单详情
      orderId: '',//离心订单id
      time: '',//离心机离心时间
      timer:'',// 离心机倒计时
      addData:[],
      bannerHeight: 260,
      multipleSelection:[],
      centrifugeList: [ // 页面初始化显示所有离心机集合
        // {
        //   centrifugeName: '',
        //   centrifugeTime: '',
        //   centrifugeSpeed: '',
        //   centrifugeTemperature: '',
        // }
      ],
      dialogSampleData: [ //离心机添加样本数据
        // {
        //   id: Date.now(),
        //   codeing: 11111
        //   sampleName: '111',
        // }
      ],
      exportOrderData: [], //可导出的订单数据
      dialogOrderData: [  // 离心机订单数据     
        // {
        //   id: Date.now(),
        //   orderName: '111111111111111111111111111111111111111',
        //   remarks:''
        // }
      ]
    }
  },
  created () {
    console.log(111)
    this.$axios({
      method: 'get',
      url: 'sampleGuide/centrifuge/findAllCentrifuge'
    })
    .then(({data})=>{
      console.log(data)
      data.data.centrifugeList.forEach((item)=>{
        this.centrifugeList.push({
          id: item.id,
          centrifugeName: item.name,
          centrifugeTime: item.time,
          centrifugeSpeed: item.rotationRate,
          centrifugeTemperature: item.temperate,
          brand:item.brandModel.brand,
          type: item.brandModel.modelNumber
        })
      })
      this.centrifugeName = this.centrifugeList[0].centrifugeName
      this.centrifugeTime = this.centrifugeList[0].centrifugeTime
      this.time = this.centrifugeList[0].centrifugeTime
      this.centrifugeSpeed = this.centrifugeList[0].centrifugeSpeed
      this.centrifugeTemperature = this.centrifugeList[0].centrifugeTemperature
      this.centrifugeId = this.centrifugeList[0].id
      this.querySample()
    })
  },
  mounted () {
    // element banner 高度自适应
    this.imgLoad();
    // this.$nextTick(function() {
    //   this.bannerHeight = this.$refs.image[0].height;
    //   console.log(this.bannerHeight);
    // });
    window.addEventListener("resize", () => {
      this.$nextTick(function() {
        this.bannerHeight = this.$refs.image[0].height;
        console.log(this.bannerHeight);
      });
    });
  },
  methods: {
    refData(value){
      this.elref = value
    },
    handleCurrentChange(val) {
        // 改变默认的页数
        console.log(val)
        this.currentPage=val
    },
    change (v) { // 切换离心机时显示相应离心机信息
      console.log(v)
      this.centrifugeName = this.centrifugeList[v].centrifugeName //名称
      this.centrifugeTime = this.centrifugeList[v].centrifugeTime //时间
      this.time = this.centrifugeList[v].centrifugeTime 
      this.centrifugeSpeed = this.centrifugeList[v].centrifugeSpeed //转速
      this.centrifugeTemperature = this.centrifugeList[v].centrifugeTemperature //温度
      this.setBrand = this.centrifugeList[v].brand //品牌
      this.setType = this.centrifugeList[v].type //型号
      this.centrifugeId = this.centrifugeList[v].id //离心机id
      this.carouselIndex = v /* 轮播图的索引 */
      this.querySample() //查询对应离心机中有无样本
      clearInterval(this.timer)
    },
    queryTime(){
      // this.$axios({
      // })
    },
    querySample(){   //查询对应离心机中有无样本
      this.$axios({
        method: 'post',
        url: 'sampleGuide/centrifuge/findCenSampleExist',
        data:({
          centrifugeId: this.centrifugeId
        })
      })
      .then(({data})=>{
        console.log(data)
        if(data.data == true){
          this.startCentrifuge = true
        }else{
          this.startCentrifuge = false
        }
      })
    },
    searchOrder(){ // 导出订单----搜索导出订单
      console.log(this.centrifugeId)
      this.$axios({
        method:'post',
        url:'sampleGuide/centrifuge/findCenOrderByCen',
        data: ({
          centrifugeId: this.centrifugeId,
          name: this.exportName,
          beforeTime: this.timeValue[0],
          afterTime: this.timeValue[1]
        })
      })
      .then(({data})=>{
          console.log(data)
          data.data.forEach((item)=>{
              this.exportOrderData.push({
                id: item.id,
                orderName: item.name,
                remarks:item.remarks
              })
          })
      })
    },
    handleSelectionChange(selection){ // 选择需要导出的订单
      console.log(selection)
      this.multipleSelection = selection
    },
    start(){ //.......开始离心
      console.log(this.centrifugeId)
      this.disabledAmend = true
      
      this.$axios({
        method:'post',
        url:'sampleGuide/centrifuge/insertCenOrder',
        data:({
          centrifugeId: this.centrifugeId,
          centrifugeTime: this.centrifugeSpeed
        })
      })
      .then(({data})=>{
        console.log(data)
        if(data.code== 200){
          this.orderId = data.data.cenOrderId
          this.centrifugeRun = true
          this.timer = setInterval(()=>{
             let time =  parseFloat(this.centrifugeTime)*60
              time--
             if(time <= 0){
                time = 0
                clearInterval(this.timer)
                this.disabledAmend = false
                this.finishCentrifuge = true
                this.$axios({
                  method: 'post',
                  url: 'sampleGuide/centrifuge/cenEnd',
                  data:({
                     id: this.orderId,
                     centrifugeTime: this.time
                  })
                })
                .then(({data})=>{
                  if(data.code == 200){
                    this.centrifugeTime = this.time                  
                  }
                    console.log(data)
                })
              }
              this.centrifugeTime = time/60 +'min'
          },1000)
        }
      })
    },
    stop(){// .......停止离心
        this.$confirm('确定要停止该离心机吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         clearInterval(this.timer)
          this.centrifugeStop = true
          this.$axios({
            method:'post',
            url:'sampleGuide/centrifuge/stopCen',
            data:({
              StringremainderSecond:parseFloat(this.centrifugeTime)*60,
              Integerid:this.orderId
            })
          })
        })
    },
    continueCentrifuge(){ //........继续离心
      this.centrifugeStop = false
      this.$axios({
        method:'post',
        url:'sampleGuide/centrifuge/continueCen',
        data:({

        })
      })
    },
    againCentrifuge(){ //.........重新开始离心
      this.centrifugeStop = false
    },
    finish(){//..........结束离心后查看详情
      this.dialogOrder = true
      this.finishOrder = true
      this.dialogOrderData = []
      this.$axios({
        method:'post',
        url:'sampleGuide/centrifuge/findCentrifugeDetail',
        data:({
          id: this.orderId
        })
      })
      .then(({data})=>{
        console.log(data)
        this.finishOrderName = data.data[0].name
        data.data.forEach((item)=>{
          this.dialogOrderData.push({
            orderName: item.rfidSampleName
          })
        })
        console.log(data)
      })
    },
    exportPDF(){ // 导出PDF
        this.$axios({
            method: 'post',
            url: 'sampleGuide/centrifuge/cenOrderExportPdf',
            responseType: 'blob',
            data:({
                cenOrderIdList: this.multipleSelection.map((item)=>{return item.id})
            })
        })
        .then((res)=>{
            console.log(res)
        })
    },
    searchSample(){ //通过搜索样本名称查询样本
      this.dialogSampleData = []
      console.log(this.findValue)
      this.$axios({
        method: 'post',
        url:'sampleGuide/centrifuge/findSampleByNameNoCen',
        data:({
          sampleName: this.findValue
        })
      })
      .then(({data})=>{
        console.log(data)
        data.data.forEach((item)=>{
          this.dialogSampleData.push({
            id:item.id,
            codeing:item.rfidCode,
            sampleName:item.name,
            centrifugeId: this.centrifugeId
          })
        })
        this.total = data.data.length
        this.findValue = ''
      })
    },
    scanSample(){ // 通过扫描样本rfid查询样本
      this.elref.RDR_Close();
      this.dialogSampleData = []
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
      let j =0
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
      // console.log(recordCnt)
      let sTagInfo = this.elref.GetRecord(j).split("-");
      let sTagID = sTagInfo[sTagInfo.length-1];
      alert(recordCnt)
      for(let j=0;j<recordCnt;j++){
        	let sTagInfo = this.elref.GetRecord(j).split("-")
          let sTagID = sTagInfo[sTagInfo.length-1]
          console.log(sTagID)
          this.RfidArr[j] = sTagID
      }
      console.log(this.RfidArr)
      this.$axios({
        method: 'post',
        url: 'sampleGuide/centrifuge/findSampleByRfidNoCen',
        data:({
           rfidCodeList: this.RfidArr
        })
      })
      .then(({data})=>{
        console.log(data.data)
        data.data.forEach((item)=>{
          // console.log(item.id)
          this.dialogSampleData.push({
            id:item.id,
            codeing:item.rfidCode,
            sampleName:item.name,
            centrifugeId: this.centrifugeId
          })
        })
      })
    },
    selectAddSample(selection){ //选择需要添加到离心机的样本
      this.addSampleList = selection
    },
    addCentrifuger(){ // 将选择的样本添加到离心机
      if(this.addSampleList.length == 0){
        this.$message({
          message: '请选择需要添加的样本',
          type: 'warning'
        });
      }else{
      this.addData = []
      this.addSampleList.forEach((item)=>{
         this.addData.push({
           sampleId: item.id,
           centrifugeId: item.centrifugeId
         })
      })
      this.$axios({
        method: 'post',
        url:'sampleGuide/cenSample/insertCenSample',
        data:({
          centrifugeSampleList: this.addData
        })
      })
      .then(({data})=>{
        console.log(data)
        this.$message({
          message: '添加成功！',
          type: 'success'
        });
        this.startCentrifuge = true
        this.centrifugeRun = false
        this.finishCentrifuge = false
        this.dialogSample = false
      })
     }
    },
    centrifugalSet () {
      this.dialogSet = true
      this.setTime = parseFloat(this.centrifugeTime)
      this.setSpeed = parseFloat(this.centrifugeSpeed)
      this.setTemperature = parseFloat(this.centrifugeTemperature)
      this.unitValue = this.centrifugeSpeed.replace(/[\d]+/ig,"")
    },
    deleteRow(index, row){
      this.$axios({
        method:'post',
        url:'sampleGuide/cenSample/deleteCenSampleById',
        data:({
          sampleId:row.id
        })
      })
      .then(({data})=>{
        if(data.code == 200){
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.Ordersdetail()
          this.querySample()
        }
        console.log(data)
      })
      console.log(index,row)
    },
    updateSet(){ // 修改离心机信息
      this.$axios({
        method:'post',
        url: 'sampleGuide/centrifuge/updateCentrifuge',
        data:({
          id: this.centrifugeId,
          time: this.setTime+'min',
          rotationRate: this.setSpeed+this.unitValue,
          temperate: this.setTemperature+'℃'
        })
      })
      .then(({data})=>{
        console.log(data)
        this.$message({
          message: '修改成功！',
          type: 'success'
        });
        this.reload()
      })
      .catch(({data})=>{
        this.$message({
          message: '修改失败，请重试！',
          type: 'error'
        });
      })
      this.dialogSet = false
    },
    addSample () {
      this.dialogSample = true
    },
    exportOrders () {
      this.dialogExport = true
    },
    Ordersdetail () {
      this.dialogOrder = true
      this.finishOrder = false
      this.dialogOrderData = []
       this.$axios({
          method:'post',
          url: 'sampleGuide/cenSample/findNoCenSampleInOrder',
          data:({
            centrifugeId: this.centrifugeId
          })
        })
        .then(({data})=>{
          console.log(data)
          data.data.forEach((item)=>{
            this.dialogOrderData.push({
              id: item.rfidSample.id,
              orderName: item.rfidSample.name
            })
          })
           this.sampleNum = data.data.length
        })
    },
    imgLoad () {
      this.$nextTick(function () {
        this.bannerHeight = this.$refs.image.height
        console.log(this.$refs.image[0].height)
      })
    },
  },
  watch:{
    dialogSample(){
      if(this.dialogSample == false){
        this.dialogSampleData = []
        this.findValue = ''
        this.total = 0
      }
    },
    centrifugeTime(){

    }
  },
  computed: {}
}
</script>
<style  lang='less' scoped>
.paging{
  margin-top: 20px;
}
.del{
  cursor: pointer;
}
.centrifugeImg {
  width: 60%;
  height: 50%;
  text-align: center;
  // line-height: 50%;
  margin: 0 auto;
  img {
    width: 261px;
    height: 261px;
  }
  // /deep/.el-carousel {
  //   text-align: center;
  // }
}

.centrifugeSet {
  width: 60%;
  margin: 0 auto;
  background: rgba(244, 244, 245, 1);
  border: 1px solid rgba(238, 236, 236, 1);
  border-radius: 4px;
  // height: 200px;
  .centrifugeInfo {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    span {
      display: block;
      width: 128px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 18px;
    }
    .centrifugeItem {
      border: 1px solid rgba(151, 151, 151, 1);
      border-radius: 4px;
      color: rgba(208, 2, 27, 1);
      font-weight: bold;
    }
  }
  .centrifugeOperation {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
    img {
      width: 44px;
      height: 44px;
      cursor: pointer;
    }
    .mainBtn {
      width: 110px;
      height: 110px;
    }
  }
}
.dialogSet {
  .setItem {
    margin-left: 25%;
    margin-top: 15px;
    width: 100%;
    > span {
      margin-right: 15px;
      font-size: 16px;
    }
  }
  /deep/.el-input {
    width: 40%;
  }
  /deep/.el-select {
    width: 50%;
    margin-left: 10px;
  }
}
/deep/.el-dialog__body{
  padding: 20px 20px
}
/deep/.el-dialog__header{
  padding-top: 20px;
}
/deep/.el-dialog__footer{
  padding-bottom: 15px;
}
.dialogSample {
  text-align: center;
  width: 90%;
  margin: 0 auto;
  img {
    width: 80px;
    cursor: pointer;
  }
  /deep/.el-input {
    width: 50%;
  }
  .sampleItem {
    margin: 10px 0;
    .findBtn {
      margin-left: 10px;
    }
  }
}
.dialogExport {
  .searchExport {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .block {
      text-align: right;
    }
    .searchName {
      display: flex;
    }
  }
  /deep/.el-range-editor--mini.el-input__inner {
    width: 70%;
  }
  .searchBtn {
    margin-left: 15px;
    margin-right: 10px;
  }
}
.dialog-footer{
  img {
    width: 30px;
    height: 34px;
    cursor: pointer;
  }
}
/deep/.el-dialog__footer {
  text-align: center;
  img {
    margin-right: 20px;
  }
}
.dialogOrder {
  .orderNum {
    text-align:left;
    margin-bottom: 10px;
  }
}
.test {

  opacity: 0.2;
}
.test-hover {
  transition: opacity 0.3s;
  opacity: 1;
  &:hover {
    opacity: 1;
  }
}
</style>
