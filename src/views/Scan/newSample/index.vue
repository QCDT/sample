<template>
  <!-- 新建样本:扫描页面的表单里的 新建按钮 -->

  <div class="change-wrap-1" v-loading.fullscreen.lock="fullscreenLoading">
    <h1 class="top-title" v-if="title">{{title}}</h1>
        <el-form class="change-wrap" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="mini" :status-icon="true" >
            <!-- 左边 -->
            <div class="left-box">
                <el-form-item label="RFID编号">
                  <el-input v-model="RFID" disabled></el-input>
                </el-form-item> 
                <el-form-item label="样本名称" prop="sampleName" required>
                  <el-input v-model="ruleForm.sampleName" placeholder></el-input>
                </el-form-item>
                <el-form-item label="样本类别" prop="sampleType">
                  <el-select  filterable allow-create  v-model="ruleForm.sampleType" placeholder="请选择" class="marg-l">
                    <el-option
                      v-for="item in sampleTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="样本来源" >
                  <el-select  filterable allow-create  v-model="ruleForm.sampleSource" placeholder="请选择" class="marg-l">
                    <el-option
                      v-for="item in sampleSourceOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="采样日期">
                  <el-date-picker
                    v-model="ruleForm.samplingDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width:100%"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="有效日期">
                  <el-date-picker
                    v-model="ruleForm.effective"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width:100%"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="管帽颜色">
                  <!-- <el-input  v-model="ruleForm.pipeCap" placeholder></el-input> -->
                  <el-select  v-model="ruleForm.pipeCap" placeholder="请选择" class="marg-l">
                    <el-option
                      v-for="item in pipeCapOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="提前报警天数">
                  <el-input  v-model="ruleForm.earlyWarning" placeholder></el-input>
                </el-form-item>
                <el-form-item label="所属项目"  prop="project">
                  <el-select  v-model="ruleForm.project" placeholder="请选择" class="marg-l">
                    <el-option
                      v-for="item in projectOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="方案编号">
                  <el-input  v-model="ruleForm.fangan" placeholder></el-input>
                </el-form-item>
                <el-form-item label="剂量组">
                  <el-input  v-model="ruleForm.jiliang" placeholder></el-input>
                </el-form-item>
                <el-form-item label="受试者编号">
                  <el-input  v-model="ruleForm.patient" placeholder></el-input>
                </el-form-item>
                <el-form-item label="实验采血日期">
                  <el-input v-model="ruleForm.bloodDate"></el-input>
                  <!-- <el-input size="mini" v-model="bloodDate" placeholder></el-input> -->
                </el-form-item>
                <el-form-item label="基质描述">
                  <el-input  v-model="ruleForm.jizhi" placeholder></el-input>
                </el-form-item>
            </div>
            <!-- 右边 -->
            <div class="right-box">
              <h1 class="location-info">
                <span style="color:red; margin-right:7px">*</span>
                位置信息
                <span class="msg" v-show="locationMsg">请完善位置信息</span>
              </h1>
              <div> 
                <div class="input-item-r">
                  <!-- <el-form-item label="冰箱"> -->
                    <span>冰箱</span>
                    <el-select size="mini" class="lab" @change="showlabRow" v-model="labValue" placeholder="请选择">
                      <el-option
                        v-for="item in labOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <span>层数</span>
                    <el-select size="mini" v-model="labRow" @change="showDrawer" placeholder="请选择">
                      <el-option
                        v-for="item in labRowOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <span>抽屉</span>
                    <el-select v-model="labDrawer" @change="showSampleBox" size="mini" placeholder="请选择">
                      <el-option
                        v-for="item in labDrawerOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <span>样本盒</span>
                      <el-select  v-model="sampleBoxValue" @change="showSample"  size="mini" placeholder="请选择">
                        <el-option
                          v-for="item in sampleBoxOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                    </el-select>
              </div>
              <div class="tableWrap" v-loading="loading">
                <table class="table">
                    <tr v-for="row in rowValue" :key="row">
                        <td
                          v-for="col in colValue"
                          :key="col"
                          :class="showSampleStatus(row, col)"
                          @click="chooseLocation(row,col)"
                        >{{showTable(row,col)}}
                        </td>
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
              <div class="mark">
                <h1>备注</h1>
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  maxlength="1000"
                  show-word-limit
                  v-model="mark"
                ></el-input>
              </div>
            </div>          
            </div>
        </el-form>
      <div class="bot-btn">
        <tmpButton @click="$emit('goBack')">返回</tmpButton>
        <tmpButton @click="submitForm('ruleForm')">确认</tmpButton>
      </div>
    </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
// import matrix9x9 from '@/components/tmp/zhanglan/matrix-9x9'
export default {
  inject:['reload'],
  props: { title: String , RFID: String},
  components: { tmpButton },
  data () {
    let validateName= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入样本名称'));
      } else {
        this.$axios({
          method:'post',
          url:'/sampleGuide/scan/existSampleName',
          data:({
            name: value
          })
        })
        .then(({data})=>{
         // console.log(data)
          if(data.data == true){
            callback();
          }else{
            callback(new Error('该样本名称已存在!'));
          }
        })
        
      }
    };
    return {
      input: '',
      mark: '',
      locationMsg:false,
      fullscreenLoading: true,
      loading:false,
      ruleForm: {
        sampleName:'', // 样本名称
        sampleType:'',// 样本类别
        sampleSource:'', // 样本来源
        samplingDate: '', // 采样日期
        effective: '', // 有效日期
        pipeCap:'', // 管帽颜色
        earlyWarning:'', // 提前报警天数
        project:'', //所属项目
        fangan: '', // 方案编号
        jiliang: '' ,//剂量组
        patient: '', // 受试者编号
        bloodDate: '', //实验采血日期
        jizhi:'',// 基质描述
      },
      rules: {
        sampleName: [
          { validator: validateName, trigger: 'change' }
        ],
        sampleType:[
          { required: true, message: '请选择样本类别', trigger: 'change' }
        ],
        project:[
          { required: true, message: '请选择所属项目', trigger: 'change' }
        ]
      },
      mapData: [
        { text: '已使用', bgc: '#7D7C7F' },
        { text: '借用', bgc: '#FCFD01' },
        { text: '已选中',bgc:'#86D647'},
        { text: '未使用', bgc: '#eee' }
      ],
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
      projectOption:[],
      sampleSourceOption:[],//.......样本来源集合
      sampleTypeOption:[],//.....样本类别集合
      labValue:'',//.......冰箱id
      labOption:[],//......所有冰箱集合
      labRow:'',//.........层数id
      labRowOption:[],//...所有层数集合
      labDrawer:'',//......抽屉id
      labDrawerOption:[],//.....所有抽屉的集合
      sampleBoxValue:'',//....样本盒id
      sampleBoxOption:[],//.....所有样本盒集合
      loanSampleArr:[],// ........样本盒中借出样本集合
      normalSampleArr:[], //.......样本盒中正常状态样本
      activeRow:'',
      activeCol:'',
      rowValue:'',//样本盒行数
      colValue:'',//样本盒列数
      showModel:'',//样本盒显示模式
    }
  },
  created(){
    this.$axios({ //.......样本来源初始化
      method:'get',
      url:'sampleGuide/transSample/selectAllSampleSouce'
    })
    .then(({data})=>{
      // console.log(data)
      data.data.forEach((item)=>{
        this.sampleSourceOption.push({
          label:item.name,
          value:item.name
        })
      })
    })
    this.$axios({//...........样本类别初始化
      method:'get',
      url:'sampleGuide/transSample/selectAllSampleDict'
    })
    .then(({data})=>{
      // console.log(data)
      data.data.forEach((item)=>{
        this.sampleTypeOption.push({
          label:item.name,
          value:item.name
        })
      })
    })
    this.$axios({ //.......冰箱初始化
      method:'get',
      url:'sampleGuide/set/selectRefrigeratorName'
    })
    .then(({data})=>{
      // console.log(data)
      data.data.forEach((item)=>{
        this.labOption.push({
          label:item.name,
          value:item.id
        })
      })
    })
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
    .catch((error)=>{
      console.log(error)
    })
    this.$axios({ //........新建样本初始化
      method:'get',
      url:'/sampleGuide/scan/findLastSample'
    })
    .then(({data})=>{
      //console.log(data)
      this.ruleForm.sampleName = data.data.rfidSample.name
      this.ruleForm.sampleType = data.data.rfidSample.sampleCategoryDict.id
      this.ruleForm.sampleSource = data.data.rfidSample.sampleSource
      this.ruleForm.samplingDate = data.data.rfidSample.samplingDate
      this.ruleForm.pipeCap = data.data.rfidSample.capColor
      this.ruleForm.earlyWarning = data.data.rfidSample.warningDays
      this.ruleForm.project = data.data.rfidSample.project == null?'':data.data.rfidSample.project.id
      this.ruleForm.fangan = data.data.rfidSample.sampleStudy
      this.ruleForm.jiliang = data.data.rfidSample.sampleTreatment
      this.ruleForm.patient = data.data.rfidSample.sampleSubject
      this.ruleForm.bloodDate = data.data.rfidSample.sampleTime
      this.ruleForm.jizhi = data.data.rfidSample.sampleMatrix
      this.labValue = data.data.rfidSample.sampleStru.refrigeratorStruId
      this.labRow = data.data.rfidSample.sampleStru.tierStruId
      this.labDrawer = data.data.rfidSample.sampleStru.drawerStruId
      this.sampleBoxValue = data.data.rfidSample.sampleStru.sampleBoxStruId
      this.rowValue = data.data.rfidSample.sampleStru.sampleBoxStru.structureRow
      this.colValue = data.data.rfidSample.sampleStru.sampleBoxStru.structureCol
      this.showModel = data.data.rfidSample.sampleStru.sampleBoxStru.structureSpec
      data.data.sampleStruList.forEach((item)=>{
          if(item.sampleStatus == 2){
            this.loanSampleArr.push([item.row,item.col])
          }
          if(item.sampleStatus == 1){
            this.normalSampleArr.push([item.row,item.col])
          }
      })
      this.$axios({ //.........初始化所有层数
        method: 'post',
        url:'sampleGuide/set/selectTier',
        data:({
          refrigeratorStruId: this.labValue
        })
      })
      .then(({data})=>{
       // console.log(data)
        data.data.forEach((item)=>{
          this.labRowOption.push({
            value: item.id,
            label:item.row
          })
        })
      })
      this.$axios({// ...初始化所有抽屉
        method: 'post',
        url:'/sampleGuide/guest/selectDrawerStruByTierStru',
        data:({
          tierStruId:{
            id:this.labRow
	        }
        })
      })
      .then(({data})=>{
          //console.log(data)
          data.data.forEach((item)=>{
            this.labDrawerOption.push({
              value:item.id,
              label:item.number
            })
          })
      })
      this.$axios({ //........初始化所有样本盒
        method:'post',
        url:'sampleGuide/scan/getSampleBoxRowList',
        data:({
          id:this.labDrawer
        })
      })
      .then(({data})=>{
       // console.log(data)
        data.data.forEach((item)=>{
          this.sampleBoxOption.push({
            label:item.row,
            value: item.id
          })
        })
      })
      this.fullscreenLoading = false
    })
  },
  methods: {
    showlabRow(){ //........根据选择的冰箱加载冰箱层数
      this.labRow = ''
      this.labRowOption = []
      this.labDrawer = ''
      this.labDrawerOption = []
      this.sampleBoxValue = ''
      this.sampleBoxOption = []
      this.$axios({
        method: 'post',
        url:'sampleGuide/set/selectTier',
        data:({
          refrigeratorStruId: this.labValue
        })
      })
      .then(({data})=>{
        //console.log(data)
        data.data.forEach((item)=>{
          this.labRowOption.push({
            value: item.id,
            label:item.row
          })
        })
      })
    },
    showDrawer(){ //.....根据选择的层数加载该层数的抽屉
      this.labDrawer = ''
      this.labDrawerOption = []
      this.sampleBoxValue = ''
      this.sampleBoxOption = []
      this.$axios({
        method: 'post',
        url:'/sampleGuide/guest/selectDrawerStruByTierStru',
        data:({
          tierStruId:{
            id:this.labRow
	        }
        })
      })
      .then(({data})=>{
          //console.log(data)
          data.data.forEach((item)=>{
            this.labDrawerOption.push({
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
        url:'sampleGuide/scan/getSampleBoxRowList',
        data:({
          id:this.labDrawer
        })
      })
      .then(({data})=>{
       // console.log(data)
        data.data.forEach((item)=>{
          this.sampleBoxOption.push({
            label:item.row,
            value: item.id
          })
        })
      })
    },
    showSample(){ //.......根据样本盒查询样本信息
      this.loading = true
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
        //console.log(data)
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
         this.loading = false
      })
    },
    chooseLocation(row,col){ //......选择新建样本位置
      // console.log(this.normalSampleArr)
      for(let i=0; i<this.normalSampleArr.length; i++){
        if(JSON.stringify(this.normalSampleArr[i]) == JSON.stringify([row, col])){
          return;

        }
      }
      for(let i=0; i<this.loanSampleArr.length; i++){
        if(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify([row, col])){
          return;
        }
      }
      this.activeRow = row
      this.activeCol = col
      // console.log(this.activeRow, this.activeCol)
    },
    showSampleStatus(row,col){
      let activeArr = [row, col]
      if(JSON.stringify(activeArr) ==JSON.stringify([this.activeRow,this.activeCol])){
         return 'activeColor'
      }
      for(let i=0; i<this.loanSampleArr.length; i++){
        if(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify(activeArr)){
         // console.log(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify(activeArr))
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
    submitForm(formName) {
      console.log(this.ruleForm.pipeCap)
      this.$refs[formName].validate((valid) => {
        //console.log(this.ruleForm.project)
        if (valid && this.labValue && this.labRow && this.labDrawer && this.sampleBoxValue && this.activeRow && this.activeCol) {
          this.locationMsg = false
          this.$axios({
            method:'post',
            url:'/sampleGuide/scan/createSample',
            data:({
              rfidCode: this.RFID,
              name: this.ruleForm.sampleName,
              sampleCategoryDictName:this.ruleForm.sampleType,
              sampleSource:this.ruleForm.sampleSource ,
              samplingDate:this.ruleForm.samplingDate, 
              capColor:this.ruleForm.pipeCap,
              warningDays:this.ruleForm.earlyWarning,
              sampleCentralLaboratoryNumber:this.ruleForm.project,
              sampleStudy:this.ruleForm.fangan,
              sampleTreatment:this.ruleForm.jiliang,
              sampleSubject:this.ruleForm.patient,
              sampleTime:this.ruleForm.bloodDate,//
              sampleMatrix:this.ruleForm.jizhi, //.....基质描述
              refrigeratorStruId:this.labValue ,//....冰箱id
              tierStruId:this.labRow, //...层id
              drawerStruId:this.labDrawer,//....抽屉id
              sampleBoxStruId:this.sampleBoxValue, //....样本盒id
              row: this.activeRow, //....新样本位置--行
              col: this.activeCol//....新样本位置--列
            })
          })
          .then(({data})=>{
            if(data.code == 200){
              this.$message({
                message: '创建样本成功!',
                type: 'success'
              });
              this.reload()
            }
           // console.log(data)
          })

        } else {
          this.$message({
            message: '请完善样本信息',
            type: 'warning'
          });
          this.locationMsg = true
          return false;
        }
      });
    },
  }
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
.msg{
  font-size: 12px;
  color: red;
  margin-left: 10px;
  display: inline-block;
}
.normalColor{
  background: #00c9ff;
}
.loanColor{
  background: #FCFD01;
}
.activeColor{
  background: #86D647
}
.change-wrap-1 {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.change-wrap {
  display: flex;
  justify-content: space-around;
}

.left-box {
  width: 30%;
}

.right-box {
  width: 45%;
}

.input-item-l {
  display: flex;
  align-items: center;

  margin-bottom: 10px;

  span {
    i{
      color: red;
      margin-left: -10px;
      margin-right: 6px;
    }
  }
}

.input-item-r {
  display: flex;
  align-items: center;
  .lab{
    width: 27vw;
  }
  span{
    white-space: nowrap;
    margin:0 10px;
  }
}

.mark {
  padding-top: 30px;

  h1 {
    margin-bottom: 12px;
  }
}
.tableWrap{
  display: flex;
  // justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
.table {
  border-spacing: 0;
  border: 2px solid #ccc;
  border-collapse: collapse;
  td {
    border: 1px solid #ccc;
    text-align: center;
    font-size: 12px;
    padding: 5px;
    cursor: pointer;
  }
}
.map {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60px;
  height: 120px;
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
// .map {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;

//   //   width: 60px;

//   width: 4rem;
//   height: 150px;

//   cursor: pointer;
//   white-space: nowrap;

//   font-size: 13px;

//   span {
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     padding: 2px 3px;

//     color: #333;
//     border-radius: 3px;
//     background-color: #f99;

//     font-size: 13px;
//   }
// }

.bot-btn /deep/ button {
  margin: 0 20px;
}

.bot-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px 0;
  margin-left: -6%;
}

.location-info {
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.marg-l {
  width: 100%;
}
</style>
