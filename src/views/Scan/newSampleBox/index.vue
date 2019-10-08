<template>
  <!-- 新建/修改 样本盒:扫描页面的表单里的 新建，修改按钮 -->
  <div class="change-wrap-1">
    <cardfile  @reception= 'refData'></cardfile>
    <h1 class="top-title" v-if="title">{{title}}</h1>
    <div class="change-wrap">
      <!-- 左边 -->
      <el-form :model="ruleForm" label-position='left' :rules="rules" ref="formName" label-width="100px" :inline-message='inlineMsg' :status-icon='inlineMsg' class="fromInline">
        <div class="left-box">
            <el-form-item label="RFID编号" prop="boxRfid">
              <el-input v-model="boxRfid" disabled></el-input>
              <img src="@/assets/img/saomiao.gif" @click="replaceRfid" v-show="title == '修改样本盒'">
            </el-form-item>
            <el-form-item label="样本盒名称" prop="name" >
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <div class="input-item">
              <h1>位置信息</h1>
            </div>
            <div class="input-item">
                  <span>冰箱</span>
                  <el-select size="mini" :disabled="title=='修改样本盒'" v-model="labValue" class="input-option" placeholder="请选择" @change="showlabRow">
                  <el-option
                      v-for="item in labListOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                  </el-select>
                  <span>层数</span>
                  <el-select size="mini" :disabled="title=='修改样本盒'" v-model="labRowValue" placeholder="请选择" @change="showDrawer">
                  <el-option
                      v-for="item in labRow"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                  </el-select>
                  <span>抽屉</span>
                  <el-select size="mini" :disabled="title=='修改样本盒'" v-model="labDrawerValue" @change="showSampleBox" placeholder="请选择">
                  <el-option
                      v-for="item in labDrawer"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                  </el-select>
                  <span>样本盒</span>
                  <el-select size="mini" :disabled="title=='修改样本盒'" v-model="sampleBox" placeholder="请选择">
                  <el-option
                      v-for="item in sampleBoxOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                  </el-select>
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
        <!-- 右边 -->
        <div class="right-box">
          <div class="rightstyle"> 
              <h1 class="location-info">
                样本盒规格
              </h1>
            <div class="input-item">
                <span>行</span>
                <el-select size="mini" v-model="rowValue" placeholder="请选择" class="input-option">
                  <el-option
                      v-for="item in 10"
                      :key="item"
                      :label="item"
                      :value="item"
                  ></el-option>
                </el-select>
                <span>列</span>
                <el-select size="mini" v-model="colValue" placeholder="请选择" class="input-option">
                <el-option
                    v-for="item in 10"
                    :key="item"
                    :label="item"
                    :value="item"
                ></el-option>
                </el-select>
                <span>显示模式</span>
                <el-select size="mini" v-model="showModel" placeholder="请选择">
                <el-option
                    v-for="item in showModelOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
                </el-select>
            </div>
          </div>
          <div class="row">
            <table class="table">
              <tr class="row" v-for="(index) in rowValue" :key="index">
                <td
                  v-for="(ind) in colValue"
                  :key="ind"
                >{{showTable(index,ind)}}</td>
              </tr>
            </table>
          </div>
        </div>
      </el-form>
    </div>
    <div class="bot-btn">
      <tmpButton @click="save">确认</tmpButton>
      <tmpButton @click="$emit('goBack')">返回</tmpButton>
    </div>
  </div>
</template>
<script>
import cardfile from "@/components/cardfile";
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default { 
  props: { title: String, boxRfid:String , sampleBoxId:{type:Number,default:-1}},
  components: {tmpButton,cardfile},
  inject:['reload'],
  data () {
    let sampleBoxName = (rule,value,callback)=>{
      if(value===''){
        callback(new Error('请输入表单名称'));
      }else{
        if(this.title == '新建样本盒'){
          this.$axios({
            method:'post',
            url: '/sampleGuide/set/selectSampleBoxName',
            data: ({
              name: this.ruleForm.name
            })
          })
          .then(({data})=>{
            // console.log(data.data)
            if(data.data === 0){
              callback(new Error('该样本盒名称已存在！'));
            }else{
              callback()
            }
          })
        }else{
          this.$axios({
            method:'post',
            url:'/sampleGuide/set/isCanBeUsedName',
            data:({
              id:this.sampleBoxId,
              name: this.ruleForm.name
            })
          })
          .then(({data})=>{
            if(data.data == 0){
              callback(new Error('该样本名称已存在！'));
            }else{
              callback()
            }
            console.log(data)
          })
        }
      }
    }
    let sampleBoxRfid = (rule,value,callback)=>{
      this.$axios({
        method:'post',
        url:'/sampleGuide/set/isCanBeUsedRfidCode',
        data:({
          id: this.sampleBoxId,
          rfidCode:this.boxRfid
        })
      })
      .then(({data})=>{
        console.log(data)
        if(data.data == 1){
          callback()
        }else if(data.data == 0){
          callback(new Error("该RFID已被占用！"))
        }
      })
    }
    return {
      elref:'',
      showModel: 1, // 显示模式设置
      rowValue:'',// 样本盒行数
      colValue:'',// 样本盒列数
      labValue:'',// 冰箱id值
      labRowValue:'',//冰箱层数id值
      labDrawerValue:'',// 冰箱抽屉id值
      sampleBox:'',//样本盒位置id
      reboxRfid: '',
      input: '',
      mark: '',
      inlineMsg: true,// 行内显示验证信息
      ruleForm:{
        name:'',
      },
      labListOption:[ ],
      labRow:[ ],
      labDrawer:[],
      sampleBoxOption:[],
      showModelOption:[
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
      value: '',
      rules: {
          boxRfid:[
            { validator: sampleBoxRfid, trigger: 'change' }
          ],
          name: [
            { validator: sampleBoxName, trigger: 'blur' }
          ]
      }
    }
  },
  
  created(){
    this.$axios({ // ........冰箱名称渲染
      method: 'get',
      url:'/sampleGuide/set/selectRefrigeratorName'
    })
    .then(({data})=>{
      console.log(data)
      data.data.forEach((item)=>{
        this.labListOption.push({
          value:item.id,
          label: item.name
        })
      })
    })
    if (this.title == '修改样本盒') {
      this.$axios({
        method:'post',
        url:'/sampleGuide/set/selectSampleBoxDetailInfo',
        data:({
          id: this.sampleBoxId
        })
      })
      .then(({data})=>{
        this.ruleForm.name = data.data[0].name
        this.showModel = data.data[0].sampleBoxStru.structureSpec, // 显示模式设置
        this.rowValue = data.data[0].sampleBoxStru.structureRow,// 样本盒行数
        this.colValue = data.data[0].sampleBoxStru.structureCol,// 样本盒列数
        this.labValue = data.data[0].sampleBoxStru.refrigeratorStruId,// 冰箱id值
        this.labRowValue = data.data[0].sampleBoxStru.tierStru.row,//冰箱层数id值
        this.labDrawerValue = data.data[0].sampleBoxStru.drawerStru.number,// 冰箱抽屉id值
        this.sampleBox = data.data[0].sampleBoxStru.row,//样本盒位置id
        this.mark = data.data[0].remarks
        //sampleBoxStru
        console.log(data)
      })
    }
  },
  methods: {
    refData(value){
      this.elref = value
    },
    save () {
        if(this.ruleForm.name==''|| this.rowValue == '' || this.colValue == '' || this.labRowValue =='' || this.labValue == '' || this.labDrawerValue =='' || this.sampleBox =='' ){
          this.$alert('请完善该页面信息', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        }else{
        if(this.title == '新建样本盒'){
          this.$axios({
              method:'post',
              url: 'sampleGuide/set/insertRfidSampleBox',
              data:({
                name: this.ruleForm.name,
                rfidCode:this.boxRfid,
                refrigeratorStruId :this.labValue,
                tierStruId: this.labRowValue,
                drawerStruId: this.labDrawerValue,
                row: this.sampleBox,
                structureRow:this.rowValue,
                structureCol: this.colValue,
                structureSpec:this.showModel,
                remarks: this.mark
            })
          })
          .then(({data})=>{
              console.log(data)
              this.$message({
                message: '新建样本盒成功！',
                type: 'success'
              });
              this.reload()
          })
        }else{
          this.$axios({
            method:'post',
            url:'sampleGuide/set/checkCanBeUpdateSampleBox',
            data:({
              id: this.sampleBoxId
            })
          })
          .then(({data})=>{
            console.log(data)
            if(data.data == 1){
              this.$axios({
                method:'post',
                url: '/sampleGuide/set/updateRfidSampleBoxAndStru',
                data:({
                    id: this.sampleBoxId,
                    name: this.ruleForm.name,
                    rfidCode:this.boxRfid,
                    // refrigeratorStruId :this.labValue,
                    // tierStruId: this.labRowValue,
                    // drawerStruId: this.labDrawerValue,
                    // row: this.sampleBox,
                    structureRow:this.rowValue,
                    structureCol: this.colValue,
                    structureSpec:this.showModel,
                    remarks: this.mark
                })
              })
              .then(({data})=>{
                console.log(data)
                this.$message({
                  message: '修改样本盒成功！',
                  type: 'success'
                });
                this.reload()
              })
            }else{
                this.$message({
                  message: '样本盒中存在样本，不可修改！',
                  type: 'warning'
                });
            }
          })
        }
      }
    },
    replaceRfid(){
      this.elref.RDR_Close();
      let devicetypeValue = this.$cookies.get('readerType')
      let OpentypeValue = this.$cookies.get('portType')
      let comPortValue = this.$cookies.get('comPortNo')
      let comBaudRateValue = this.$cookies.get('comBaudRate')
      let comFrameStructureValue = this.$cookies.get('comFrameStructure')
      let netIpAddress = this.$cookies.get('netIpAddress')
      let netPort = this.$cookies.get('netPortNo')
      console.log(devicetypeValue,OpentypeValue,comPortValue,comBaudRateValue,comFrameStructureValue,netIpAddress,netPort)
      let n = this.$store.state.OnOpen(this.elref , devicetypeValue,OpentypeValue,comPortValue,comBaudRateValue,comFrameStructureValue,netIpAddress,netPort)
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
        alert(recordCnt)
        if(recordCnt == 1){
            this.$emit('changeBoxRfid',sTagID)
          // this.boxRfid = sTagID
        }else{
          this.$alert('样本盒只能绑定一个！', '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
    },
    showlabRow(){ //切换冰箱加载该冰箱层数
      this.labRow = []
      this.labRowValue = ''
      this.labDrawerValue = ''
      this.labDrawer = []
      this.sampleBoxOption = []
      this.sampleBox = ''
      this.$axios({
        method: 'post',
        url:'sampleGuide/set/selectTier',
        data:({
          refrigeratorStruId: this.labValue
        })
      })
      .then(({data})=>{
        console.log(data)
        data.data.forEach((item)=>{
          this.labRow.push({
            value: item.id,
            label:item.row
          })
        })
      })
    },
    showDrawer(){   //层数切换时加载相应的抽屉
      this.labDrawerValue = ''
      this.labDrawer = []
      this.sampleBoxOption = []
      this.sampleBox = ''
      this.$axios({
        method: 'post',
        url:'/sampleGuide/guest/selectDrawerStruByTierStru',
        data:({
          tierStruId:{
            id:this.labRowValue
	        }
        })
      })
      .then(({data})=>{
          console.log(data)
          data.data.forEach((item)=>{
            this.labDrawer.push({
              value:item.id,
              label:item.number
            })
          })
      })
    },
    showSampleBox(){ //抽屉切换时加载相应可选的样本盒位置
      this.sampleBoxOption = []
      this.sampleBox = ''
      this.$axios({
        method:'post',
        url: 'sampleGuide/set/selectSampleBoxStru',
        data:({
          drawerStruId:this.labDrawerValue
        })
      })
      .then(({data})=>{
        console.log(data)
        data.data.forEach((item)=>{
          this.sampleBoxOption.push({
            value: item.row,
            label:item.row
          })
        })
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
    }
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
.row{
  margin-top: 20px;
}
.fromInline {
  display: flex;
  justify-content: space-around;
}

.left-box {
  width: 45%;
  img{
    width: 32px;
    height: 32px;
    vertical-align: top;
    margin-left: 15px;
    margin-top: 5px;
    cursor: pointer;
  }
  .input-option{
    width: 50%;
  }
  .input-item{
    margin-left: 0px;
    /deep/.el-input{
      width: 100%;
    }
  }
  /deep/.el-input{
    width:60%;
  }  
}

.right-box {
  width: 35%;
}

.input-item {
  display: flex;
  align-items: center;
  margin-top: 10px;
  span {
    padding: 0 10px;
    height: 100%;
    white-space: nowrap;
  }
  // .input-option{
  //   width:30%
  // }
}

.mark {
  padding-top: 30px;
  // margin-left: 10px;
  h1 {
    margin-bottom: 12px;
  }
}

.map {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  //   width: 60px;

  width: 4rem;
  height: 150px;

  cursor: pointer;
  white-space: nowrap;

  font-size: 13px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 2px 3px;

    color: #333;
    border-radius: 3px;
    background-color: #f99;

    font-size: 13px;
  }
}

.bot-btn /deep/ button {
  margin: 0 20px;
}

.bot-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
}

.location-info {
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 500;
}
.table {
  border-spacing: 0;
  border: 2px solid #ccc;
  border-collapse: collapse;
  width: 80%;
  margin: 0 auto;
  td {
    padding: 5px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 12px;
  }
}
</style>
