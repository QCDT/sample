<template>
  <div class="printerWrap">
      <div class="printerTitle">
          <span>打印机设置</span>
      </div>
      <div class="printerContent">
        <div class="printerLeft">
            <p>
                <span class="choiceType">选择样本盒或样本</span>
                <el-select v-model="printValue"  size="mini" class="selectBox">
                    <el-option
                    v-for="item in printType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <div>
                <p><span class="choiceType">选择打印内容</span></p>
                <div  v-show="printValue == 'sample'">
                   <el-checkbox-group 
                      v-model="printListA"
                      :max="3">
                      <el-checkbox v-for="(item,index) in printContentA" :key='index' :label="item.value" class="choiceContent">{{item.label}}</el-checkbox>
                   </el-checkbox-group>
                  <!-- <el-checkbox  v-model="item.checked" >{{item.title}}</el-checkbox> -->
                </div>
                <div v-show="printValue == 'sampleBox'">
                  <el-checkbox-group 
                      v-model="printListB"
                      :max="3">
                      <el-checkbox v-for="(item,index) in printContentB" :key='index' :label="item.value" class="choiceContent">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="btns">
                   <el-button type="primary" size="mini" @click="savePrint">保存</el-button>
                    <el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
                </div>
            </div>
        </div>
        <div class="printerRight">
            <span><img src="@/assets/img/printer.jpg"/></span>
            <div class="preview" v-show="printValue === 'sample'">
              <p v-for="item in printA" :key="item.label"><span >{{item.label}}</span></p>
            </div>
            <div class="preview" v-show="printValue === 'sampleBox'">
              <p v-for="item in printB" :key="item.label"><span>{{item.label}}</span></p>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      setSampleId: '',
      setSampleBoxId:'',
      printListA:[],
      printListB: [],
      printA:[],
      printB:[],
      printValue: 'sample',// 选择打印样本盒或样本
      printType: [
        {
          value: 'sample',
          label: '样本'
        },
        {
          value: 'sampleBox',
          label: '样本盒'
        }
      ],
      printContentA: [
        {
          label:'样本名称',
          value: 'sample_name'
        },
        {
          label:'录入人名称',
          value: 'sample_userName'
        },
        {
          label:'冰箱名称',
          value: 'sample_refrigerator'
        },
        {
          label:'录入时间',
          value: 'sample_inputTime'
        },
        {
          label:'采样时间',
          value: 'sample_samplingTime'
        },
        {
          label:'过期时间',
          value: 'sample_expireTime'
        },        
        {
          label:'样本来源',
          value: 'sample_sampleSource'
        },
        {
          label:'样本类别',
          value: 'sample_sampleCategory'
        },
        {
          label:'样本位置',
          value: 'sample_location'
        }
      ],
      printContentB: [
        {
          label:'样本盒名称',
          value: 'sampleBox_name'
        },
        {
          label:'录入人名称',
          value: 'sampleBox_userName'
        },
        {
          label:'冰箱名称',
          value: 'sampleBox_refrigerator'
        },
        {
          label:'录入时间',
          value: 'sampleBox_inputTime'
        },
        {
          label:'样本盒位置',
          value: 'sampleBox_location'
        }     
      ]
    }
  },
  watch:{
    printListA:function(val,oldval){
      this.printA = []
      this.printContentA.forEach((item)=>{
        this.printListA.forEach((option)=>{
          if(item.value == option){
            this.printA.push(item)
          }
        })
      })
      // console.log(this.printA)
    },
    printListB:function(val,oldval){
      this.printB = []
      this.printContentB.forEach((item)=>{
        this.printListB.forEach((option)=>{
          if(item.value == option){
            this.printB.push(item)
          }
        })
      })
      // console.log(this.printB)
    },
  },
  created(){
    this.$axios({
      method: 'post',
      url: 'sampleGuide/printerSetting/findPrinterSettingByUserId',
      data:({
        id: 1
      })
    })
    .then(({data})=>{
      console.log(data)
      this.setSampleId =data.data[0].id ? data.data[0].id : ''
      this.setSampleBoxId =data.data[1].id ? data.data[1].id : ''
      this.printListA = [data.data[0].firstLine, data.data[0].secondLine, data.data[0].thirdLine]
      this.printListB = [data.data[1].firstLine, data.data[1].secondLine, data.data[1].thirdLine]
    })
    .catch((error)=>{
        console.log(error)
    })
  },
  methods:{
    savePrint(){
        console.log(this.printListA[0],this.printListB[0])
        if(this.printListA.length === 0 && this.printListB.length === 0){
          return
        }
        if(this.printValue == 'sample'){
          this.$axios({
            method:'post',
            url: 'sampleGuide/printerSetting/addOrUpdatePrinterSettingByUser',
            data:({
                id: this.setSampleId,
                category: this.printValue,
                firstLine: this.printListA[0],
                secondLine: this.printListA[1] ? this.printListA[1] : "",
                thirdLine: this.printListA[2] ? this.printListA[2] : ""
            })
          })
          .then(({data})=>{
            this.$message({
              message: '保存成功!',
              type: 'success'
            });
              console.log(data)
          })
          .catch((error)=>{
              console.log(error)
          })
        }else{
          this.$axios({
            method:'post',
            url: 'sampleGuide/printerSetting/addOrUpdatePrinterSettingByUser',
            data:({
                id: this.setSampleId,
                category: this.printValue,
                firstLine: this.printListB[0],
                secondLine: this.printListB[1] ? this.printListA[1] : "",
                thirdLine: this.printListB[2] ? this.printListA[2] : ""
            })
          })
          .then(({data})=>{
            this.$message({
              message: '保存成功!',
              type: 'success'
            });
              console.log(data)
          })
          .catch((error)=>{
              console.log(error)
          })
        }
    }
  }
}
</script>
<style lang="less" scoped>
.printerWrap{
  width: 100%;
  background: white;
}
.printerTitle{
    font-size: 18px;
    margin:20px 0;
    text-align: center;
}
.printerContent{
    width: 58%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    .btns{
      text-align: center;
      margin-top: 50px;
    
      button{
        margin-right: 10px;
        width: 100px;
        background: #00c9ff;
        border: 1px solid #00c9ff;
      }
    }
    .printerLeft{
        margin-top: 60px;
        margin-right:20px;
        p{
            margin-top:10px;
            .printContent{
                width:130px;
            }
        }
        .btn{
            margin-top:20px;
        }
        .choiceType{
            font-size: 14PX;
            margin-right: 15px;
        }
        .choiceContent{
          display: inline-block;
          width: 25%;
          margin-top: 15px;
        }
        .selectBox{
          width:170px;
        }
    }
    .printerRight{
        position: relative;
        img{
            width: 300px;
            height: 350px;
        }
        .preview{
          position: absolute;
          left: 41%;
          top: 65%;
          p{
            margin-bottom: 10px;
          }
        }
    }
}
</style>

