<template>
  <!-- 归还 -->
  <div class="guihuan-wrap">
    <el-form ref="ruleForm" :model="ruleForm"  label-width="120px" label-position="left"  :rules="rules">
      <el-form-item label="归还表单名称" prop="formName" required>
        <el-input v-model="ruleForm.formName" disabled></el-input>
      </el-form-item>
        <el-form-item label="归还人" prop="name" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
            type="textarea"
            v-model="ruleForm.desc"
            maxlength="1000"
            show-word-limit
            placeholder="请输入内容"
            :rows="4">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">归还</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
    <div class="GiveBackRecord" @click="showRecord">
      <p><img src="@/assets/img/sample-receive.png"></p>
      <p><span>归还记录</span></p>
    </div>
    <!--归还记录-->
    <el-dialog
        title="历史归还记录"
        :visible.sync="dialogRecords"
        width="80%"
        center>
        <div class="recordTitle">
            <div>
            <span class="recordType">表单名称:</span>
            <el-input v-model="recordsformName" placeholder="请输入内容" size="mini"></el-input>
            <span class="recordType">样本名称:</span>
            <el-input v-model="recordsSampleName" placeholder="请输入内容" size="mini"></el-input>
            </div>
            <div>
            <span class="recordTime">归还时间</span>
            <el-date-picker
                v-model="choiceTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                size="mini"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary"  size="mini" @click="searchReception">搜索</el-button>
            </div>
        </div>
        <div class="formNum">
            <div><span>表单数量:</span><span>{{formNum}}</span></div>
            <div>
            <img src="@/assets/img/receive-excel.png" @click="exportSampleFormExcel">
            <img src="@/assets/img/receivePDF.png" @click="exportSampleFormPDF">
            </div>
        </div>
        <div class="formContent">
            <el-table
                    ref="multipleTable"
                    :data="sampleDataForm"
                    tooltip-effect="dark"
                    @selection-change='selectExportFrom'
                    @row-click="showSampleItem"
                    style="width: 50%; float:left"
                    height="220"
                    :row-style="{height:'32px',textAlign: 'center',padding:'0px',cursor:'pointer'}"
                    :cell-style="{padding:'0px',textAlign: 'center'}"
                    :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
                    border
                    >
                    <el-table-column
                        type="selection"
                        width="55"
                    >
                    </el-table-column>
                    <el-table-column
                    type="index"
                    label="序号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="formName"
                    label="表单名称"
                    show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                    prop="recipients"
                    label="归还人"
                    width="80"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="enteringData"
                    label="归还日期"
                    width="180"
                    show-overflow-tooltip
                    >
                    </el-table-column>
            </el-table>
            <el-table
                    ref="multipleTable"
                    :data="sampleDataItem"
                    tooltip-effect="dark"
                    style="width: 45%; float:right"
                    max-height="220"
                    :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                    :cell-style="{padding:'0px',textAlign: 'center'}"
                    :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
                    border
                    >
                    <el-table-column
                    type="index"
                    label="序号"
                    class="DataTable"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="sampleName"
                    label="样本名称"
                    class="DataTable"
                    show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                    prop="sampleType"
                    label="样本类别"
                    class="DataTable"
                    width="80"
                    show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                    prop="patientNub"
                    label="受试者编号"
                    class="DataTable"
                    show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                    prop="standingTime"
                    label="静置时间"
                    class="DataTable"
                    show-overflow-tooltip
                    >
                    </el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogRecords = false" size="mini">返回</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import masking from '@/components/tmp/zhanglan/maskTran'
export default {
  props: {},
  inject:['reload'],
  components: { tmpButton, masking },
  data () {
    let verificationName = (rule, value,callback)=>{
      if(value === ''){
        callback(new Error("请输入归还人姓名"))
      }else{
        let reg = /^[\u4e00-\u9fa5]{2,4}$/
        if(!reg.test(value)){
           callback(new Error('姓名格式不正确'))
        }
        callback();
      }
    }
    return {
      dialogRecords: false,
      formName: '',
      recordsformName: '',// 表单名称
      recordsSampleName: '',// 样本名称
      choiceTime: '',// 盘点时间
      formNum: 0,
      exportData:[],
      sampleDataItem:[],
      sampleDataForm:[

      ],
      ruleForm:{
        formName: '',
        desc: '',
        name:''
      },
      rules:{
        name:[
          {validator:verificationName,trigger:'blur'}
        ],
      }
    }
  },
  created(){
    this.$axios({
      method:'get',
      url:'sampleGuide/scan/getOrderName',
    })
      .then(({data})=>{
        console.log(data);
        this.ruleForm.formName = data.data
      })
  },
  methods: {
    submitForm(ruleForm){
       this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            if(this.$store.state.returnBackCodeing.length ==0){
              this.$alert('请先选择需要归还的样本', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })
            }
            let returnCoding = this.$store.state.returnBackCodeing.map((item)=>{
              return item.coding
            })
            this.$axios({
              method: 'post',
              url: 'sampleGuide/scan/createReturnOrder',
              data:({
                returnTableName: this.ruleForm.formName,
                returnPerson: this.ruleForm.name,
                remark: this.ruleForm.desc,
                rfidCodeList: returnCoding
              })
            })
              .then(({data})=>{
                console.log(data)
                if(data.code == 200){
                  this.$alert('归还成功', '提示', {
                    confirmButtonText: '确定',
                    type: 'success'
                  })
                  this.reload()
                }else{
                  this.$alert('归还失败', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                  })
                }
              })
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    selectExportFrom(selection){
        this.exportData = selection
        // console.log(this.exportData )
    },
    showRecord(){
      this.dialogRecords = true
    },
    searchReception(){ //历史纪录
      this.sampleDataForm = []
      this.$axios({
        method: 'post',
        url: 'sampleGuide/scan/findHistoryReturn',
        data:({
          orderName: this.recordsformName,
          sampleName: this.recordsSampleName,
          returnTimeStart: this.choiceTime[0],
          returnTimeEnd: this.choiceTime[1]
        })
      })
        .then(({data})=>{
          // console.log(data)
          this.formNum = data.data.length
          data.data.forEach((item)=>{
            this.sampleDataForm.push({ // 样本表单内容渲染
              id:item.id,
              formName: item.returnTableName,
              recipients: item.returnPerson,
              enteringData: item.returnTime
            })
          })
        })
    },
    showSampleItem(row){ // 归还记录中样本表单中样本内容
      this.sampleDataItem = []
      this.$axios({
        method: 'post',
        url: 'sampleGuide/scan/findReturnSampleByOrderId',
        data:({
          id: row.id
        })
      })
        .then(({data})=>{
          console.log(data)
          data.data.forEach((item)=>{
            this.sampleDataItem.push({ // 某个样本表单中样本内容
              sampleName: item.name,
              sampleType: item.sampleCategoryDictName,
              patientNub: item.sampleSubject,
              standingTime: item.standingTime
            })
          })
        })
    },
    exportSampleFormExcel(){
      // console.log(this.exportData)
      if(this.exportData.length == 0){
        this.$alert('请选择需要导出的表单', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }else {
        let newExportArr = this.exportData.map((item)=>{
          return item.id
        })
        //导出归还订单Excel
          this.$axios({
            method:'post',
            url:'sampleGuide/scan/exportReturnExcel',
            responseType: 'blob',
            headers: {
            'Access-Control-Expose-Headers': 'filename'
            },
            data:({
              returnTableIdList: newExportArr
            })

          })
          .then((data)=>{
            console.log(data);
            let fileName = data.headers.filename;
            let blob = new Blob([data.data], {type: 'application/vnd.ms-excel;charset=UTF-8'});
            if(window.navigator.msSaveBlob){
              window.navigator.msSaveBlob(blob,fileName);
            }else{
              let a = document.createElement('a');
              let href = window.URL.createObjectURL(blob); // 创建链接对象
              a.href =  href;
              a.download = fileName;   // 自定义文件名
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(href);  //移除链接对象
              document.body.removeChild(a);
          }
        })
      }
    },
    exportSampleFormPDF(){
      if(this.exportData.length == 0){
        this.$alert('请选择需要导出的表单', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }else {
        let newExportArr = this.exportData.map((item)=>{
          return item.id
        })
        //导出归还订单pdf
          this.$axios({
            method:'post',
            url:'sampleGuide/scan/exportReturnPDF',
            responseType: 'blob',
            headers: {
            'Access-Control-Expose-Headers': 'filename',
            'Connection':'keep-alive',
            'Token':'token'
            },
            data:({
              returnTableIdList: newExportArr
            })
          })
          .then((data)=>{
            console.log(data);
            // let fileName = data.headers.filename;
          //   let blob = new Blob([data.data], {type: 'application/pdf;charset=UTF-8'});
          //   if(window.navigator.msSaveBlob){
          //     window.navigator.msSaveBlob(blob);
          //   }else{
          //     // var blob = new Blob([data], {type: 'application/vnd.ms-excel;charset=UTF-8'});
          //     let a = document.createElement('a');
          //     let href = window.URL.createObjectURL(blob); // 创建链接对象
          //     a.href =  href;
          //     a.download = '';   // 自定义文件名
          //     document.body.appendChild(a);
          //     a.click();
          //     window.URL.revokeObjectURL(href);  //移除链接对象
          //     document.body.removeChild(a);
          // }
        })
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.guihuan-wrap {
   width: 50%;
   margin: 0 auto;
   margin-top: 20px;
   background: #edf0f0;
   padding: 7% 25% ;
   position: relative;
   .GiveBackRecord{
     position: absolute;
     right: 13%;
     top: 20%;
     text-align: center;
     cursor: pointer;
     img{
       width: 32px;
       height: 32px;
     }
   }
}

</style>
