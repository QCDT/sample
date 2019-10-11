<template>
    <div>
        <!-- 扫描按钮-->
        <cardfile @reception= 'refData'></cardfile>
        <div class="receiveTop">
            <img src="@/assets/img/saomiao.gif" @click="sampleReceive">
            <p><span>接收录入扫描</span></p>
            <p class="notice">
                <i class="el-icon-warning-outline"></i>
                <span>请将样本放置在读写器上，然后点击上方按钮开始扫描</span>
            </p>
        </div>
        <div class="receiveCenter">
            <div class="receiveNum"><span>扫描总数:</span><span>{{scanNum}}</span></div>
            <div class='record' @click="ShowHistoryReceiveList">
                <img src="@/assets/img/sample-receive.png">
                <span>接收记录</span>
            </div>
        </div>
        <div class="receiveContent">
            <div class="receiveL"> <!-- 左侧样本数据展示层 -->
                <el-table
                    ref="multipleTable"
                    :data="sampleData"
                    tooltip-effect="dark"
                    style="width:100%"
                    height="220"
                    :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                    :cell-style="{padding:'0px',textAlign: 'center'}"
                    :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff', color:'white'}"
                    border
                    >
                    <el-table-column
                    type="index"
                    width="70"
                    label="序号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="sampleName"
                    label="样本名称"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="receiveR"> <!-- 右侧表单详情 -->
                <div class="formTitle"><em>表单详情</em></div>
                <div>
                    <em>表单名称:</em>
                    <input type="text" v-model="formName">
                </div>
                <div>
                    <em>采血地:</em>
                    <input type="text" v-model="bloodPlace" maxlength="15">
                </div>
                <div>
                    <em>接收地:</em>
                    <input type="text" v-model="receptionPlace" maxlength="15">
                </div>
                <div>
                    <em>配送人:</em>
                    <input type="text" v-model="deliveryMan" maxlength="15">
                </div>
                <div>
                    <em>接收人:</em>
                    <input type="text" disabled='true' v-model="receivePerson" maxlength="15">
                    <img src="@/assets/img/change.png" @click="validateReceivePerson">
                </div>
                <div>
                    <em>接收时间</em>
                    <el-date-picker
                        v-model="dataValue"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div>
                    <em>配送条件</em>
                    <el-checkbox-group v-model="checkList" class="checkboxGroup">
                        <el-checkbox label="常温"></el-checkbox>
                        <el-checkbox label="冰上"></el-checkbox>
                        <el-checkbox label="避光"></el-checkbox>
                        <el-checkbox :label="condition" style="width:30%">
                            <input type="text" class="receiveCondition" v-model="condition" maxlength="15">
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
                <div>
                    <em>血样类型</em>
                    <input type="text" v-model="bloodType" maxlength="15">
                </div>
            </div>
        </div>    <!--确认按钮-->
        <div class="receiveBtnWrap">
            <button class="receiveBtn" @click="$router.go(-1)">返回</button>
            <button class="receiveBtn btn" @click="submitForm">确认</button>
        </div>
          <!-- 验证登录-->
        <ChangeUser :dialogLogin='dialogLogin' btnText="验证" @close='close' @userName='changeUserName'></ChangeUser>
        <!--历史接收记录-->
        <el-dialog
            title="历史接收记录"
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
                <span class="recordTime">接收时间</span>
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
                        @selection-change="selectExportFrom"
                        @row-click="showSampleItem"
                        style="width: 60%; float:left"
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
                        class="DataTable"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="formName"
                        label="表单名称"
                        class="DataTable"
                        show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                        prop="recipients"
                        label="接收人"
                        class="DataTable"
                        width="80"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="enteringData"
                        label="录入日期"
                        class="DataTable"
                        width="180"
                        show-overflow-tooltip
                        >
                        </el-table-column>
                </el-table>
                <el-table
                        ref="multipleTable"
                        :data="sampleDataItem"
                        tooltip-effect="dark"
                        style="width: 35%; float:right"
                        height="192"
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
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogRecords = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="dialogRecords = false" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import  ChangeUser from '@/components/ChangeUser'
import cardfile from "@/components/cardfile"
import goBack from '@/components/tmp/zhanglan/go-1'
export default {
    components: {
        ChangeUser,
        cardfile,
        goBack
    },
    data () {
        return {
            elref: '',
            scanNum: 0, // 扫描到样本总数
            formName: '', // 表单名称
            bloodPlace: '', // 采血地
            receptionPlace: '', // 接收地
            deliveryMan: '', // 配送人
            dataValue: '', //接收时间
            bloodType: '全血',// 血样类型
            checkList:[],// 配送条件集合
            condition: '', // 其它配送条件
            receivePerson: '', // 接收人
            formNum: 0, // 查询到接收记录数量
            choiceTime: '', // 接收记录时间选择
            recordsformName: '', //接收记录中表单名称
            recordsSampleName: '',// 接收记录中样本名称
            exportList: [], // 导出excel数据集合
            rfidCodeList: [], // 扫描到的rfid数据
            sampleDataIdList: [], // 扫描到样本id集合
            dialogLogin: false, // 验证登录层
            dialogRecords: false,// 接收记录层
            sampleData:[ // 样本列表

            ],
            sampleDataForm:[ // 接收记录中表单列表
                // {
                //     id: '1',
                //     formName: 1,
                //     recipients: 1,
                //     enteringData: 1
                // },
                // {
                //     id: '2',
                //     formName: 1,
                //     recipients: 1,
                //     enteringData: 1
                // },
                // {
                //     id: '3',
                //     formName: 1,
                //     recipients: 1,
                //     enteringData: 1
                // }
            ],
            sampleDataItem:[ // 接收记录中样本列表
                // {
                //     sampleName: '',
                //     sampleType:'',
                //     patientNub: '',
                // }
            ]
        }
    },
    created () {
      this.$axios({ //.............表单详情初始化
        method:'get',
        url:'sampleGuide/sampleReceive/initialReceive'
      })
      .then(({data})=>{
          this.bloodPlace = data.data.bloodCollectingPlace
          this.receptionPlace = data.data.receivingPlace
          this.deliveryMan = data.data.transportPersonName
      })
    },
    watch:{
      checkList(){
        console.log(this.checkList)
      },
    //   condition(){
    //       console.log(this.condition)
    //       if(this.condition){
    //           this.checkList.push(this.condition)
    //       }else{
    //           let index = this.checkList.indexOf(this.condition)
    //           this.checkList = this.checkList.splice(index,1)
    //       }
    //   },
      choiceTime(){
          console.log(this.choiceTime)
          if(this.choiceTime == null){
              this.choiceTime = ''
          }
      }
    },
    methods:{
        // customCondition () {
        //     if(this.condition == ''){
        //         return;
        //     }
        //     this.checkList.push(this.condition)
        // },
        refData(value){
            this.elref = value
        },
        changeUserName(userName){
            this.receivePerson = userName
        },
        close(value){
            this.dialogLogin = false
        },
        validateReceivePerson () { // 登录层显示
            this.dialogLogin = true
        },
        ShowHistoryReceiveList () {
            this.dialogRecords = true // 接收记录层显示
        },
        showSampleItem(row){ // 接收记录中样本表单中样本内容
            this.sampleDataItem = []
            this.$axios({
                method: 'post',
                url: 'sampleGuide/sampleReceive/findRfidSampleByReceiveTableId',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                data:({
                    tableId: row.id
                })
            })
            .then(({data})=>{
                console.log(data)
                data.data.forEach((item)=>{
                    this.sampleDataItem.push({ // 某个样本表单中样本内容
                        sampleName: item.name,
                        sampleType: item.sampleType,
                        patientNub: item.sampleSubject
                    })
                })
            })
        },
        sampleReceive(){ // 扫描按钮点击事件
            this.rfidCodeList = []
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
                    this.rfidCodeList[j] = sTagID
            }
            // console.log(this.rfidCodeList)
            this.$axios({
                method: 'post',
                url: 'sampleGuide/sampleReceive/findRfidSampleByRfidCode',
                data:({
                    rfidCodeList : this.rfidCodeList
                })
            })
            .then(({data})=>{
                console.log(data)
                if(data.data.checknull == 0 && data.data.existing == null){
                    this.scanNum = data.data.rfidSampleList.length
                    this.formName = data.data.newReceiveTable.tableName
                    this.dataValue = this.formatDateTime(new Date())
                    data.data.rfidSampleList.forEach((item)=>{
                        this.sampleDataIdList.push(item.id)
                        this.sampleData.push({
                            id: item.id,
                            sampleName: item.name
                        })
                    })
                }else if(data.data.checknull){
                    this.$alert(`存在${data.data.checknull}个空样本，请重新确认接收样本！`,'提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                }else if(data.data.existing instanceof Array){
                    let addedSample = []
                    data.data.existing.forEach((item)=>{
                        addedSample.push(item.name)
                    })
                    addedSample.join('')
                    this.$alert(`${addedSample}样本已添加，请重新确认接收样本！`,'提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                }
            })
        },
        submitForm() {
            if(this.formName == ''){
                this.$alert(`表单名称不能为空!`,'提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
            }else if(this.bloodPlace == ''){
                this.$alert(`采血地不能为空!`,'提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
            }else if(this.receptionPlace == ''){
                this.$alert(`接收地不能为空!`,'提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
            }else if(this.deliveryMan == ''){
                this.$alert(`配送人不能为空!`,'提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
            }else if(this.receivePerson == ''){
                this.$alert(`接收人不能为空!`,'提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
            }else if(this.dataValue == ''){
                this.$alert(`接收时间不能为空!`,'提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
            }else if(this.checkList == ''){
                this.$alert(`配送条件不能为空!`,'提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
            }else if(this.bloodType == ''){
                this.$alert(`血样类型不能为空!`,'提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
            }else{
                console.log(this.formName)
                this.$axios({
                    method: 'post',
                    url: 'sampleGuide/sampleReceive/insertSampleReceive',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    data:({
                        tableName: this.formName,
                        bloodCollectingPlace: this.bloodPlace,
                        receivingPlace: this.receptionPlace,
                        transportPersonName: this.deliveryMan,
                        receivePersonName: this.receivePerson,
                        receiveTime:this.dataValue,
                        transportCondition: this.checkList.join(),
                        bloodSource: this.bloodType,
                        sampleCount: this.scanNum,
                        sampleIdList: this.sampleDataIdList,
                    })
                })
                .then(({data})=>{
                    console.log(data)
                    if(data.code == 200){
                        this.$message({
                            message: '接收成功!',
                            type: 'success'
                        });
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        },
        searchReception () { // 搜索接受记录
           console.log(this.choiceTime)
           this.sampleDataForm = []
           this.$axios({
                method: 'post',
                url: 'sampleGuide/sampleReceive/findReceiveTable',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                data:({
                    tablename: this.recordsformName,
                    sampleName: this.recordsSampleName,
                    beforeTime: this.choiceTime[0],
                    afterTime: this.choiceTime[1]
                })
           })
           .then(({data})=>{
               console.log(data)
               this.formNum = data.data.length
               data.data.forEach((item)=>{
                this.sampleDataForm.push({ // 样本表单内容渲染
                    id:item.id,
                    formName: item.tableName,
                    recipients: item.receivePersonName,
                    enteringData: item.receiveTime
                })
               })
           })
        },

        selectExportFrom(selection){
            this.exportList = []
            selection.forEach((item)=>{
                this.exportList.push(item.id)
            })
        },
        exportSampleFormExcel(){
            console.log(this.exportList)
            if(this.exportList.length == 0){
                this.$message({
                    message: '请先选择需要导出的数据',
                    type: 'warning'
                })
            }
            this.$axios({
                method: 'post',
                url: 'sampleGuide/sampleReceive/exportExcelSelect',
                responseType: 'blod',
                headers: {
                    'Access-Control-Expose-Headers': 'filename'
                },
                data:({
                    idList: this.exportList
                })
            })
            .then((data)=>{
                console.log(data)
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
        },
        exportSampleFormPDF(){
            this.$axios({
                method: 'post',
                url: 'sampleGuide/sampleReceive/exportExcelSelect',
                responseType: 'blob',
                // headers: {
                //     'Content-Type': 'application/json; charset=UTF-8'
                // },
                data:({
                    idList: this.exportList
                })
            })
            .then((res)=>{
                console.log(res)
            })
        },
        formatDateTime(date) {
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h=h < 10 ? ('0' + h) : h;
            let minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            let second=date.getSeconds();
            second=second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        }
    }
}
</script>
<style lang="less">
.receiveTop{
    text-align: center;
    margin-top: 20px;
    img{
        width: 96px;
        height: 96px;
        cursor: pointer;
    }
    p{
        color: #00c9ff;
        margin-top: 10px;
    }
    .notice{
        font-weight: bold;
        margin-top: 3px;
    }
}
.formNum{
    width: 60%;
}
.receiveCenter{
    width: 85%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 10px;
    .receiveNum{
        span{
            margin-right: 5px;
        }
    }
    .record{
        text-align: center;
        cursor: pointer;
        img{
            width: 24px;
            height: 24px;
        }
        span{
            display: block;
        }
    }
}
.receiveContent{
    width: 85%;
    margin: 0 auto;
    display: flex;
    align-items: top;
    .receiveL{
        // float: left;
        width: 55%;
    }
    .receiveR{
        margin-left: 8%;
        float: left;
        width: 40%;
        div{
           line-height: 25px;
           .checkboxGroup{
               display: inline-block;
               width: 79%;
           }
           .customCondition{
               margin-right: 7px;
           }
           img{
               width: 20px;
               height: 20px;
               vertical-align: middle;
               margin-right: 6px;
               cursor: pointer;
           }
        }
        .formTitle{
            text-align: center;
            margin-top: 0;
        }
        em{
            display: inline-block;
            width: 90px;
        }
        input{
            border:none;
            border-bottom: 1px solid #ddd;
            border-radius: 0;
            width:60%;
        }
        .el-checkbox{
            margin-right: 10px;
        }
        .el-input__inner{
            width: 100%;
        }
        .el-input__inner{
            height: 20px;
            line-height: 20px;
        }
        .el-input__icon{
            line-height: 20px;
        }
    }
}
.receiveBtnWrap{
    text-align: center;
    margin-top: 15px;
    .receiveBtn{
        width: 120px;
        border:1px solid #00c9ff;
        color: #00c9ff;
        height: 25px;
        background-color: #fff;
        border-radius: 5px;
        font-size: 18px;
    }
  .btn{
    margin-left: 20px;
  }
  .receiveBtn:hover{
    background-color: #00c9ff;
    color: #fff;
  }
}
</style>
