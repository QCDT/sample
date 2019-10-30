<template>
  <!-- 修改样本 -->
  <div>
    <cardfile  @reception= 'refData'></cardfile>
    <h1 class="top-title" v-if="title">{{title}}</h1>
    <div class="sample-box">
      <div class="left">
        <h1 class="sample-old">
          <span>当前信息</span>
        </h1>
        <ul>
          <li v-for="(item, index) in sample" :key="index" class="item">
            <span>{{item.key}}:</span>
            <i>{{item.value}}</i>
          </li>
        </ul>
        <div class="bot">
          <div class="matrix-box">
            <table class="table">
              <tr v-for="row in rowValueTwo" :key="row">
                <!-- <template v-for="item in loanSampleArr"> -->
                <td
                  v-for="col in colValueTwo"
                  :key="col"
                  :class="showSampleStatusTwo(row, col)"
                >{{showTable(row,col)}}
                </td>
                <!-- </template> -->
              </tr>
            </table>
            <div class="map">
              <span>已使用</span>
              <span>借用</span>
              <span>原位置</span>
              <span>未使用</span>
            </div>
          </div>
          <div class="mark">
            <h1>备注</h1>
            <el-input
              type="textarea"
              :rows="5"
              v-model="textareaOld"
              disabled="disabled"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="right">
        <h1 class="sample-old">
          <span>修改信息</span>
        </h1>
        <ul>
          <li class="item">
            <span>RFID编号:</span>
            <el-input v-model="inputRfid" readonly="readonly" size="small" class="newSample"></el-input>
            <el-tooltip effect="dark" content="替换RFID" placement="right">
              <img src="@/assets/img/saomiao.gif"  @click="bindingCard">
            </el-tooltip>
          </li>
          <li class="item">
            <span>样本名称:</span>
            <el-input v-model="inputName" size="small" class="newSample" @blur="sampleName"></el-input>
            <span class="verifyMsg">{{inputNamemsg}}</span>
          </li>
          <li class="item">
            <span>样本类别:</span>
            <el-select
              size="small"
              v-model="testTubeCategory"
              placeholder="请选择"
              class="newSample"
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in testTubeCategoryOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li class="item">
            <span>样本来源:</span>
            <el-select
              size="small"
              v-model="source"
              placeholder="请选择"
              class="newSample"
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in sourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li class="item">
            <span>采样日期:</span>
            <!--<el-input v-model="inputCai" size="small" class="newSample"></el-input>-->
            <el-date-picker
              v-model="inputCai"
              type="datetime"
              class="newSample"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li class="item">
            <span>有效日期:</span>
            <!--<el-input v-model="inputYouXiao" size="small" class="newSample"></el-input>-->
            <el-date-picker
              v-model="inputYouXiao"
              type="datetime"
              class="newSample"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li class="item">
            <span>管帽颜色:</span>
            <el-select
              size="small"
              v-model="pipeCap"
              placeholder="请选择"
              class="newSample"
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in pipeCapOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li class="item">
            <span>提前报警天数:</span>
            <el-input v-model="inputWarn" size="small" class="newSample"></el-input>
            天
          </li>
          <li class="item">
            <span>所属项目:</span>
            <el-select
              size="small"
              v-model="project"
              placeholder="请选择"
              class="newSample"
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in projectOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li class="item">
            <span>方案编号:</span>
            <el-input v-model="fangan" size="small" class="newSample"></el-input>
          </li>
          <li class="item">
            <span>剂量组:</span>
            <el-input v-model="jiliang" size="small" class="newSample"></el-input>
          </li>
          <li class="item">
            <span>受试者编号:</span>
            <el-input v-model="patient" size="small" class="newSample"></el-input>
          </li>
          <li class="item">
            <span>实验采血日期:</span>
            <el-input v-model="bloodDate" size="small" class="newSample"></el-input>
          </li>
          <li class="item">
            <span>基质描述:</span>
            <el-input v-model="jizhi" size="small" class="newSample"></el-input>
          </li>
          <li>
            <span>位置信息:</span>
          </li>
          <li class="item location-info-change">
            <i>冰箱:</i>
            <el-select
              size="small"
              v-model="refrigerator"
              placeholder="请选择"
              @focus="hideTableSample = true"
              @change="selectIceBox"
            >
              <el-option
                v-for="item in refrigeratorOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <i>层数:</i>
            <el-select
              size="small"
              v-model="layer"
              placeholder="请选择"
              @focus="hideTableSample = true"
              @change="selectIcePlice"
            >
              <el-option
                v-for="item in layerOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li class="item location-info-change">
            <i>抽屉:</i>
            <el-select
              size="small"
              v-model="chouTi"
              placeholder="请选择"
              @focus="hideTableSample=true"
              @change="selectDrawer"
            >
              <el-option
                v-for="item in chouTiOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <i>样本盒:</i>
            <el-select
              size="small"
              v-model="styleBox"
              placeholder="请选择"
              @change="showSample"
            >
              <el-option
                v-for="item in styleBoxOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
        </ul>
        <div class="bot">
          <div class="matrix-box" v-show="!hideTableSample">
            <table class="table">
              <tr v-for="row in rowValue" :key="row">
                <!-- <template v-for="item in loanSampleArr"> -->
                <td
                  v-for="col in colValue"
                  :key="col"
                  :class="showSampleStatus(row, col)"
                  @click="chooseLocation(row,col)"
                >{{showTable(row,col)}}
                </td>
                <!-- </template> -->
              </tr>
            </table>
            <div class="map">
              <span>已使用</span>
              <span>借用</span>
              <span>原位置</span>
              <span style="background-color: #15ff13;">已选中</span>
              <span style="background-color: #eeeeee;">未使用</span>
            </div>
          </div>
          <div class="mark">
            <h1>备注</h1>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="textareaNew"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="bot-btn">
      <tmpButton @click="$emit('goBack')">返回</tmpButton>
      <tmpButton @click="changeSave">确认</tmpButton>
    </div>
  </div>
</template>
<script>
  import tmpButton from '@/components/tmp/zhanglan/tmpButton'
  import cardfile from "@/components/cardfile";
  // import matrix9x9 from '@/components/tmp/zhanglan/matrix-9x9'
  export default {
    inject:['reload'],
    props: {
      title: String,
      multipleSelection: {type: Array, default: () =>{return []} },
      selectedId:{type: Number, default:0}
    },
    components: {tmpButton, cardfile},
    data() {
      return {
        hideTableSample:false,
        locationNowTwo: [],//位置信息
        locationNow: [],//位置信息
        rowValue: '',
        colValue: '',
        rowValueTwo: '',
        colValueTwo: '',
        showModel: '',//样本盒显示模式
        loanSampleArr: [],//样本盒中借出样本集合
        loanSampleArrTwo: [],//样本盒中借出样本集合
        normalSampleArr: [],//样本盒中正常样本集合
        normalSampleArrTwo: [],//样本盒中正常样本集合
        activeRow:'',
        activeCol:'',
        pipeCap:'',//管帽颜色
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
        ],
        /* 来源 source */
        sourceOption: [
          /* { value: 'A来源', label: 'A来源' },
          { value: 'B来源', label: 'B来源' } */
        ],
        projectOption:[],
        testTubeCategoryOption: [
          /* { value: 'A类别', label: 'A类别' },
          { value: 'B类别', label: 'B类别' } */
        ],
        value: '',
        elref: '',
        inputRfid: '',//rfid
        inputName: '',//样本名称
        inputNamemsg:'',
        inputCai: '',//采样日期
        inputYouXiao: '',//有效日期
        inputWarn: '',//报警日期
        textareaOld: '',
        textareaNew: '',
        source: '', //样本来源
        project:'',//项目名称
        testTubeCategory: '', //样本类别
        fangan: '', // 方案编号
        jiliang: '' ,//剂量组
        patient: '', // 受试者编号
        bloodDate: '', //实验采血日期
        jizhi:'',// 基质描述
        refrigerator: '',//冰箱
        layer: '',//层数
        chouTi: '',//抽屉
        styleBox: '', //样本盒
        /* 冰箱 refrigerator */
        refrigeratorOption: [
          /* { value: 'refrigeratorA', label: 'refrigeratorA' },
          { value: 'refrigeratorB', label: 'refrigeratorB' } */
        ],
        /* 层数 layer */
        layerOption: [
          /* { value: 'layer1', label: 'layer1' },
          { value: 'layer2', label: 'layer2' } */
        ],
        /* 抽屉 chouTi */
        chouTiOption: [
          /*  { value: 'chouTi1', label: 'chouTi1' },
           { value: 'chouTi2', label: 'chouTi2' } */
        ],
        /* 样式盒 styleBox */
        styleBoxOption: [
          /* { value: 'styleBox1', label: 'styleBox1',id:'1' },
          { value: 'styleBox2', label: 'styleBox2',id:'2' } */
        ],
        sample: [
          {key: 'RFID编号', value: ''},
          {key: '样本名称', value: ''},
          {key: '样本类别', value: ''},
          {key: '样本来源', value: ''},
          {key: '采样日期', value: ''},
          {key: '有效日期', value: ''},
          {key: '管帽颜色', value: ''},
          {key: '提前报警天数', value: ''},
          {key: '所属项目', value: ''},
          {key: '方案编号', value: ''},
          {key: '剂量组', value: ''},
          {key: '受试者编号', value: ''},
          {key: '实验采血日期', value: ''},
          {key: '基质描述', value: ''},
          {key: '位置信息', value: ''}
        ]
      }
    },
    //修改样本回显信息
    created() {
      // console.log(this.multipleSelection)
      this.$axios.get("/sampleGuide/guest/selectProjectAll")//.....项目初始化
        .then(({data})=>{
          // console.log(data)
          data.data.forEach((item)=>{
            this.projectOption.push({
              value:item.id,
              label:item.name
            })
          })
        })
      this.$axios({
        method: 'post',
        url: 'sampleGuide/scan/findSampleById',
        data: ({
          id: this.selectedId ==0?this.multipleSelection[0].id:this.selectedId
        })
      })
        .then(({data}) => {
          console.log(data)
// 当前信息
          this.sample[8].value = data.data.rfidSample.project == null ? '' : data.data.rfidSample.project.name
          this.sample[0].value = data.data.rfidSample.rfidCode
          this.sample[9].value = data.data.rfidSample.sampleStudy
          this.sample[10].value = data.data.rfidSample.sampleTreatment
          this.sample[11].value = data.data.rfidSample.sampleSubject
          this.sample[12].value = data.data.rfidSample.sampleTime
          this.sample[13].value = data.data.rfidSample.sampleMatrix
          this.sample[1].value = data.data.rfidSample.name
          this.sample[3].value = data.data.rfidSample.sampleSource
          this.sample[2].value = data.data.rfidSample.sampleCategoryDict.name
          this.sample[4].value = data.data.rfidSample.samplingDate == null ? '' : data.data.rfidSample.samplingDate
          this.sample[5].value = data.data.rfidSample.expireDate == null ? '' : data.data.rfidSample.expireDate
          this.sample[7].value = data.data.rfidSample.warningDays
          this.sample[6].value = this.pipeCapOption[data.data.rfidSample.capColor].label
          this.sample[14].value = data.data.rfidSample.sampleStru.detailLocation
//修改信息
          this.project = data.data.rfidSample.project == null ? '' : data.data.rfidSample.project.id
          this.inputRfid = data.data.rfidSample.rfidCode
          this.inputName = data.data.rfidSample.name
          this.source = data.data.rfidSample.sampleSource
          this.testTubeCategory = data.data.rfidSample.sampleCategoryDict.name
          this.inputCai = data.data.rfidSample.samplingDate == null ? '' : data.data.rfidSample.samplingDate
          this.inputYouXiao = data.data.rfidSample.expireDate == null ? '' : data.data.rfidSample.expireDate
          this.inputWarn = data.data.rfidSample.warningDays
          this.refrigerator = data.data.rfidSample.sampleStru.refrigeratorStruId
          this.layer = data.data.rfidSample.sampleStru.tierStruId
          this.chouTi = data.data.rfidSample.sampleStru.drawerStruId
          this.styleBox = data.data.rfidSample.sampleStru.sampleBoxStruId
          this.pipeCap = this.pipeCapOption[data.data.rfidSample.capColor].label
          this.fangan = data.data.rfidSample.sampleStudy
          this.jiliang = data.data.rfidSample.sampleTreatment
          this.patient = data.data.rfidSample.sampleSubject
          this.bloodDate = data.data.rfidSample.sampleTime
          this.jizhi = data.data.rfidSample.sampleMatrix
          //备注
          this.textareaOld = data.data.rfidSample.remarks
          this.textareaNew = data.data.rfidSample.remarks

          this.rowValueTwo = data.data.rfidSample.sampleStru.sampleBoxStru.structureRow
          this.rowValue = data.data.rfidSample.sampleStru.sampleBoxStru.structureRow
          this.colValueTwo = data.data.rfidSample.sampleStru.sampleBoxStru.structureCol
          this.colValue = data.data.rfidSample.sampleStru.sampleBoxStru.structureCol
          this.showModel = data.data.rfidSample.sampleStru.sampleBoxStru.structureSpec
          this.locationNowTwo.push([data.data.rfidSample.sampleStru.row,data.data.rfidSample.sampleStru.col])
          this.locationNow.push([data.data.rfidSample.sampleStru.row,data.data.rfidSample.sampleStru.col])
          data.data.sampleStruList.forEach((item)=>{
            if(item.sampleStatus == 2){
              this.loanSampleArrTwo.push([item.row,item.col])
              this.loanSampleArr.push([item.row,item.col])
            }
            if(item.sampleStatus == 1){
              this.normalSampleArrTwo.push([item.row,item.col])
              this.normalSampleArr.push([item.row,item.col])
            }
          })
            this.$axios({ //根据冰箱查询相应层数
              method: 'post',
              url: 'sampleGuide/set/selectTier',
              data: ({
                refrigeratorStruId: this.refrigerator
              })
            })
            .then(({data}) => {
              // console.log(data)
              data.data.forEach((item) => {
                this.layerOption.push({
                  value: item.id,
                  label: item.row
                })
              })
            })
          this.$axios({ //根据层数加载相应的抽屉
            method: 'post',
            url: '/sampleGuide/guest/selectDrawerStruByTierStru',
            data: ({
              tierStruId: {
                id: this.layer
              }
            })
          })
          .then(({data}) => {
            // console.log(data)
            data.data.forEach((item) => {
              this.chouTiOption.push({
                value: item.id,
                label: item.number
              })
            })
          })
          this.$axios({ // 根据抽屉加载相应的样本盒
            method: 'post',
            url: 'sampleGuide/scan/getSampleBoxRowList',
            data: ({
              id: this.chouTi
            })
          })
          .then(({data}) => {
            // console.log(data)
            // this.sampleBoxValue = data.data.id
            data.data.forEach((item) => {
              this.styleBoxOption.push({
                value: item.id,
                label: item.row,
              })
            })
          })
        }),

        //类别
        this.$axios({
          method: 'get',
          url: 'sampleGuide/queryCategoryDict/selectSampleCategory',
        })
          .then(({data}) => {
            // console.log(data);
            data.data.forEach((item) => {
              this.testTubeCategoryOption.push(
                {
                  label: item,
                  value: item
                }
              )
            })
          }),
        //来源
        this.$axios({
          method: 'get',
          url: 'sampleGuide/querySampleSource/selectrfidSamplesource',
        })
          .then(({data}) => {
            // console.log(data);
            data.data.forEach((item) => {
              this.sourceOption.push({
                label: item,
                value: item
              });
            })
          }),
        this.$axios({ // ........冰箱名称渲染
          method: 'get',
          url: '/sampleGuide/set/selectRefrigeratorName'
        })
          .then(({data}) => {
            // console.log(data)
            data.data.forEach((item) => {
              this.refrigeratorOption.push({
                value: item.id,
                label: item.name
              })
            })
          })
    },
    methods: {
      refData(value){
        this.elref = value
      },
      bindingCard(){
        // console.log(this.elref)
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
          this.inputRfid = sTagID
          this.$axios({
            method:'post',
            url:'sampleGuide/scan/updateRfidCodeById',
            data:({
              rfidCode:this.inputRfid
            })
          }).then(({data})=>{
            // console.log(data)
            this.$alert('RFID芯片替换成功！', '提示', {
              confirmButtonText: '确定',
              type: 'success'
            })
          })
        }else{
          this.$alert('不能扫描多个芯片！', '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      },
      sampleName () { //...........样本名称验证
        if(this.inputName == ''){
          this.inputNamemsg = "样本名称不能为空"
        }else{
            this.$axios({
              method: 'post',
              url: 'sampleGuide/scan/existSampleNameInUpdate',
              data:({
                name: this.inputName,
                id:this.selectedId ==0?this.multipleSelection[0].id:this.selectedId
              })
            })
              .then(({data})=>{
                // console.log(data)
                if(data.data == false){
                  this.inputNamemsg = "样本名称已存在"
                }else{
                  this.inputNamemsg = ''
                }
              })
        }
      },
      showSampleStatusTwo(row,col){
        // console.log(row,col)
        let activeArr = [row, col]
        // console.log(activeArr)
        if(JSON.stringify(this.locationNowTwo[0]) == JSON.stringify(activeArr)){
          return 'nowColor'
        }
        for(let i=0; i<this.loanSampleArrTwo.length; i++){

          if(JSON.stringify(this.loanSampleArrTwo[i]) == JSON.stringify(activeArr)){
            return 'loanColor'
          }
        }
        for(let i=0; i<this.normalSampleArrTwo.length; i++){
          if(JSON.stringify(this.normalSampleArrTwo[i]) == JSON.stringify(activeArr)){
            return 'normalColor'
          }
        }
      },
      showSampleStatus(row,col){
        // console.log(row,col)
        let activeArr = [row, col]
        // console.log(activeArr)
        if(JSON.stringify(this.locationNow[0]) == JSON.stringify(activeArr)){
          return 'nowColor'
        }
        if(JSON.stringify(activeArr) == JSON.stringify([this.activeRow, this.activeCol])){
          return 'activeColor'
        }
        for(let i=0; i<this.loanSampleArr.length; i++){

          if(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify(activeArr)){
            return 'loanColor'
          }
        }
        for(let i=0; i<this.normalSampleArr.length; i++){
          if(JSON.stringify(this.normalSampleArr[i]) == JSON.stringify(activeArr)){
            return 'normalColor'
          }
        }
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
      selectIceBox() { //切换冰箱加载该冰箱层数
        this.layerOption = []
        this.layer = ''
        this.chouTi = '',
        this.chouTiOption = []
        this.styleBox = ''
        this.styleBoxOption = []
        this.$axios({
          method: 'post',
          url: 'sampleGuide/set/selectTier',
          data: ({
            refrigeratorStruId: this.refrigerator
          })
        })
        .then(({data}) => {
          // console.log(data)
          data.data.forEach((item) => {
            this.layerOption.push({
              value: item.id,
              label: item.row
            })
          })
        })
      },
      selectIcePlice() {//层数切换时加载相应的抽屉
        this.chouTi = '',
          this.chouTiOption = []
        this.styleBox = ''
        this.styleBoxOption = []
        this.$axios({
          method: 'post',
          url: '/sampleGuide/guest/selectDrawerStruByTierStru',
          data: ({
            tierStruId: {
              id: this.layer
            }
          })
        })
          .then(({data}) => {
            // console.log(data)
            data.data.forEach((item) => {
              this.chouTiOption.push({
                value: item.id,
                label: item.number
              })
            })
          })
      },
      selectDrawer() {   //抽屉切换加载相应样本盒
        this.styleBox = ''
        this.styleBoxOption = []
        this.$axios({
          method: 'post',
          url: 'sampleGuide/scan/getSampleBoxRowList',
          data: ({
            id: this.chouTi
          })
        })
        .then(({data}) => {
          // console.log(data)
          // this.sampleBoxValue = data.data.id
          data.data.forEach((item) => {
            this.styleBoxOption.push({
              value: item.id,
              label: item.row,
            })
          })
        })
      },
      showSample(){//........根据样本盒查询样本信息
        this.activeRow = ''
        this.activeCol = ''
        this.locationNow = []
        this.loanSampleArr = []
        this.normalSampleArr = []
        this.hideTableSample = false
        this.$axios({
          method:'post',
          url:'/sampleGuide/scan/findSampleStruBySampleBoxId',
          data:({
            sampleBoxStruId: this.styleBox
          })
        }).then(({data})=>{
          // console.log(data)
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
        })
      },
      chooseLocation(row,col){
        for(let i=0; i<this.normalSampleArr.length; i++){
          if(JSON.stringify(this.normalSampleArr[i]) == JSON.stringify([row, col])){
           return
          }
        }
        for(let i=0; i<this.loanSampleArr.length; i++){
          if(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify([row, col])){
            return
          }
        }
        this.activeRow = row
        this.activeCol = col
      },
      changeSave() {
        this.$axios({
          method:'post',
          url:'sampleGuide/scan/updateSample',
          data:({
            id: this.selectedId ==0?this.multipleSelection[0].id:this.selectedId,
            projectId:this.project,
            rfidCode:this.inputRfid,
            capColor:this.pipeCap,
            name:this.inputName,
            sampleSource:this.source,
            sampleCategoryDictName:this.testTubeCategory,
            samplingDate:this.inputCai,
            expireDate:this.inputYouXiao,
            warningDays:this.inputWarn,
            refrigeratorStruId:this.refrigerator,
            tierStruId:this.layer,
            drawerStruId:this.chouTi,
            sampleBoxStruId:this.styleBox,
            sampleStudy:this.fangan,
            sampleTreatment:this.jiliang,
            sampleSubject:this.patient,
            sampleTime:this.bloodDate,
            sampleMatrix:this.jizhi,
            row:this.activeRow,
            col:this.activeCol
          })
        }).then(({data})=>{
          // console.log(data)
          if(data.code == 200){
            this.$message({
              message: '修改样本成功',
              type: 'success'
            });
            this.reload()
            // this.$emit('changeSave')
          }else{
            this.$message({
              message: '修改样本失败',
              type: 'warning'
            });
          }
        })
        // console.log(this.inputCai)

      },
    },
    computed: {}
  }
</script>
<style scoped lang='less'>
  .top-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 0;
    background-color: #e2e2e2;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
  }

  .bot-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;

    button {
      margin: 0 20px;
    }

  }

  .sample-box {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .left {
    border-right: 1px solid #999;
    padding-right: 20px;
    margin-left: 50px;
    .item {
      margin-bottom: 10px;
      font-size: 15px;
      span {
        display: inline-block;
        width: 120px;
      }
    }
  }

  .right {
    margin-left: 20px;
    .item {
      margin-bottom: 10px;
      font-size: 15px;
      > span {
        display: inline-block;
        width: 120px;
      }
      img{
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      .newSample {
        width: 30%;
      }
    }
    .verifyMsg{
      font-size: 12px;
      width:7vw;
      color: red;
      margin-left: 3px
    }
  }

  .sample-old {
    margin-bottom: 10px;
    font-size: 20px;
    color: #00c9ff;
  }

  .bot {
    display: flex;
    justify-content: space-between;
    width: 600px;
    margin-top: 20px;
    .matrix-box {
      display: flex;
      justify-content: space-between;

      /*.matrix{*/
      /*border: 1px solid #333;*/
      /*}*/

      .table {
        border-spacing: 0;
        border: 2px solid #a4a4a4;
        border-collapse: collapse;
        background-color: #eeeeee;
        td {
          border: 1px solid #a4a4a4;
          text-align: center;
          font-size: 12px;
          padding: 5px;
        }
      }

      .map {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        width: 60px;
        height: 150px;

        cursor: pointer;
        white-space: nowrap;

        font-size: 13px;
        margin-left: 20px;
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px 3px;
          font-size: 13px;
          color: #333;
          border-radius: 3px;
          margin-bottom: 10px;
        }
        span:nth-child(1) {
          background-color: #00c9ff;
        }
        span:nth-child(2) {
          background-color: #fffd30;
        }
        span:nth-child(3) {
          background-color: #ffa724;
        }
        span:nth-child(4) {
          background-color: #eeeeee;
        }
      }
    }
  }
  .normalColor{
    background: #00c9ff;
  }
  .loanColor{
    background: #fffd30;
  }
  .nowColor{
    background: #ffa724;
  }
  .activeColor{
    background: #86D647
  }
  .mark {
    padding-top: 20px;
    h1 {
      margin-bottom: 5px;
    }
  }

  .right {
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  }

  .location-info-change {
    padding-top: 5px;
    padding-left: 0.5rem;
    i {
      display: inline-block;
      white-space: nowrap;
      margin: 0 3px 0 7px;
    }
  }
</style>
